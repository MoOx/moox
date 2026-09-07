import { Portal } from "@/react-multiversal/Portal";
import {
  calculateOptimalPosition,
  isPartiallyInViewport,
  PositionName,
} from "@/react-multiversal/positions.utils";
import { useClickOutside } from "@/react-multiversal/useClickOutside";
import { ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";

/**
 * Below the anchor, aligned to whichever edge keeps it on screen; above it when
 * there is no room below. `*-auto` picks the alignment from where the anchor
 * sits in the window, which is what a menu bar wants - a trigger in the bottom
 * right opens up and to the right.
 */
const defaultPreferredPositions: PositionName[] = ["bottom-auto", "top-auto"];

/**
 * ## Motion
 *
 * Every animated value of the menu, in one place, and one multiplier to stretch
 * them all when a transition has to be watched frame by frame.
 *
 * !! `motionScale` is a debugging aid. Ship it at 1. !!
 */
export const motionScale = 1;
const slow = (milliseconds: number) => milliseconds * motionScale;

export const motion = {
  /**
   * Apple's easing for material that grows: fast to start, long settle, no
   * overshoot. The panel reads as unfolding rather than as popping in.
   */
  easing: "cubic-bezier(0.32, 0.72, 0, 1)",
  /**
   * The mirror curve, for content on the way out: slow to start, so the labels
   * hold while the shape closes over them. Sharing the growing curve here is
   * what makes a content look like it left before its own panel - it spends
   * most of its opacity in the first third.
   */
  exitContentEasing: "cubic-bezier(0.5, 0, 1, 1)",
  /**
   * `easeOutBack`: it passes its target and comes back. That is what makes the
   * panel arrive a touch too big and settle, rather than stop dead on its own
   * size. How far past its size it goes is the product of two things - how far
   * it travels (`1 - openScale`) and how much this curve overshoots, set by its
   * second control point. The canonical 1.56 overshoots by about a tenth, which
   * over a 0.1 travel is a single percent: two pixels, invisible. At 1.9 it is
   * about a fifth, so 0.9 -> 1 peaks near 1.02.
   */
  bounceEasing: "cubic-bezier(0.34, 1.9, 0.64, 1)",

  /** The clip opening from the trigger's footprint to the whole panel. */
  revealDuration: slow(420),
  /** The content sharpening inside it - shorter, and started late on purpose. */
  revealContentDuration: slow(294),
  revealContentDelay: slow(63),
  /**
   * Closing: the same move backwards and shorter - an entrance is worth
   * watching, an exit is in the way of whatever was asked for next. Content and
   * shape share this one so they land together.
   */
  exitDuration: slow(260),
  /**
   * The share of the *reveal* the panel's own opacity takes: the first third.
   * A fraction rather than a duration, so it follows the move it rides - and it
   * is already scaled through that one, which is why `slow()` must not touch it.
   *
   * It is the bezel: painted by the panel and not by the shape clipped inside
   * it, it would otherwise be there whole from the first frame, around a panel
   * that has not opened yet. The shadow layer rides the same fade, being the
   * one other thing drawn at full size from the start.
   *
   * The exit does not use it: a fade held to the end of a closing panel is a
   * fade nobody sees, since `easing` has the shape 90% folded a third of the way
   * through. It takes the whole exit instead.
   */
  fadeRatio: 2 / 3,
  /**
   * The share of the exit a dissolve takes instead - a panel leaving beside
   * another one, where the fade *is* the animation rather than the end of one.
   * Deliberately not `fadeRatio`: that one is the sliver of a move a shape is
   * playing at the same time, and a third of the exit is far too little when
   * there is nothing else to watch.
   */
  dissolveRatio: 0.6,
  /**
   * The bounce, held back and then run past the reveal. The clip is what makes
   * the panel visible at all, and it starts nearly shut: a scale playing under
   * it happens on a sliver, where a tenth of the panel's size is a couple of
   * pixels. Started once the clip has opened most of the way, and landing after
   * it, the overshoot happens on a panel there is something to see of.
   */
  bounceDelay: slow(60),
  bounceDuration: slow(480),
  /** A panel being set back behind, or coming back forward. */
  dimDuration: slow(280),
  /** A chevron turning to point at where its submenu opened. */
  chevronDuration: slow(220),

  /** How far back a covered panel goes, and how blurred the content starts. */
  dimScale: 0.96,
  contentScale: 0.96,
  contentBlur: 10,
  /** The size the panel grows from - and, through `bounceEasing`, past. */
  openScale: 0.9,
} as const;

/**
 * Interaction delays - how long the menu waits before *deciding* something.
 * Deliberately not scaled with `motionScale`: slowing these down does not slow
 * an animation, it makes the menu feel broken.
 */
export const timing = {
  /** Rest needed on a row before its submenu opens, with nothing open yet. */
  submenuOpenDelay: 140,
  /** Ceiling for a pointer aimed at an open submenu that never arrives. */
  submenuAimTimeout: 400,
  /**
   * Grace given to a pointer that has left every panel before the open submenu
   * is dismissed. It is not hesitation: a submenu is a sibling of its parent in
   * the portal, so crossing into it is a leave followed by an enter, with the
   * gap between the two panels spent outside both. The delay is what tells that
   * crossing apart from a departure.
   */
  submenuCloseDelay: 250,
  /** Pointer samples kept to tell where the pointer is coming from (~80ms). */
  pointerTrailLength: 5,
} as const;

/**
 * Wash a surface out without moving its white point: white stays white, black
 * lifts to `blackLevel`. `brightness()` alone cannot do it - it multiplies, so
 * it drags white down with everything else - and `contrast()` alone pulls both
 * ends toward grey. Composed, they are the affine ramp we want:
 *
 *   contrast(c) -> (in - 0.5) * c + 0.5      brightness(k) -> in * k
 *   out = in * ck + (0.5 - 0.5c) * k
 *
 * Solving for out(0) = blackLevel and out(1) = 1 gives the pair below. Use it
 * on light surfaces; on dark ones the move is the mirror image - hold black and
 * bring white down - which is plain `brightness()`.
 */
export const washOut = (blackLevel: number) => {
  const contrast = (1 - blackLevel) / (1 + blackLevel);
  return `contrast(${contrast}) brightness(${2 / (1 + contrast)})`;
};

/** Kept as a named export: `WebsiteMenu` waits this long before unmounting. */
export const exitDuration = motion.exitDuration;

const styles = StyleSheet.create({
  // Rendered but not yet placed: it has to be in the document to be measured,
  // and measuring it at (0,0) visible would flash it in the corner first.
  unplaced: {
    position: "fixed",
    top: 0,
    left: 0,
    opacity: 0,
  },
  // The anchor scrolled out of the window: the panel has nothing left to point
  // at, so it is parked off-screen rather than left floating on its own.
  anchorGone: {
    position: "fixed",
    top: -10000,
    opacity: 0,
  },
  // The panel itself, inside the wrapper that carries the placement: it has to
  // be allowed to shrink for the wrapper's `maxHeight` to reach the scroller.
  panel: {
    flexShrink: 1,
    minHeight: 0,
  },
  // The panel's shadow, painted beside the panel rather than by it. Nothing can
  // paint past a clip of its own - `clip-path` cuts what `filter` and
  // `box-shadow` put outside the border box - so the shadow of a panel that is
  // revealed through a clip has to come from an element that is not clipped.
  //
  // It is laid out rather than clipped, which costs nothing: it is empty and out
  // of flow, so there is no text for a changing geometry to rewrap, and that is
  // the only thing `clip-path` buys the panel. It fills the wrapper, so it is
  // pushed in by the panel's own offset - see the reveal's `offset`.
  shadow: {
    position: "absolute",
    pointerEvents: "none",
  },
  content: {
    flexShrink: 1,
    // Without this a flex child refuses to shrink past its content, and the
    // panel's `maxHeight` never reaches the scroller inside.
    minHeight: 0,
  },
});

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

/**
 * The two ends of the reveal, as numbers rather than as a `clip-path` string:
 * the clip is one of two things drawn from them, the shadow layer's own
 * geometry being the other, and the two have to describe the same shape.
 */
type RevealBox = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  radius: number;
};

const insetPath = ({ top, right, bottom, left, radius }: RevealBox) =>
  `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius}px)`;

/** What the shadow layer animates to follow the clip, in `styles.shadow`. */
const shadowShapeProperties = ["top", "right", "bottom", "left", "border-radius"];

/**
 * Shows its content anchored to another element: at the trigger when there is
 * room, pushed back inside the window when there is not.
 *
 * It goes through the `Portal`, so the content escapes any `overflow` or
 * stacking context its trigger happens to live in, and it is `position: fixed`
 * at coordinates recomputed from the anchor.
 *
 * Opening is animated as a reveal out of the trigger: the panel is clipped down
 * to the trigger's own footprint, rounded like it, then that clip opens to the
 * full panel while the content sharpens from a blur. `clip-path` is what makes
 * this affordable - it never reflows the text the way animating width or
 * height would, so the labels do not rewrap mid-animation.
 *
 * The caller owns the open state: mount this to open, and close on `onExit`.
 */
export default function InPlaceOrModal({
  id,
  anchorRef,
  preferredPositions = defaultPreferredPositions,
  viewportMargin = 8,
  coverAnchor = false,
  revealFromRef,
  anchorRect: frozenAnchorRect,
  revealRadius,
  isDimmed = false,
  shadow,
  dimFilter = washOut(0.05),
  exitAnimation = "reveal",
  closeOnScroll = true,
  isExiting = false,
  style,
  inPlaceStyle,
  dataSet,
  onExit,
  skipRefs,
  contentRef: externalContentRef,
  onPositionChange,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  children,
}: {
  /** Portal key - unique per open overlay. */
  id: string;
  /** The element the content is anchored to, and revealed out of. */
  anchorRef: RefObject<HTMLElement | null>;
  /** Positions to try, in order, before falling back to the best-scoring one. */
  preferredPositions?: PositionName[];
  /** Gap kept between the content and the edge of the window. */
  viewportMargin?: number;
  /**
   * Lay the panel over its anchor, top-left corners aligned, instead of beside
   * it - what a submenu does where there is no room for two panels side by
   * side: the anchor row is replaced in place by the panel that grows from it.
   */
  coverAnchor?: boolean;
  /**
   * Where the reveal grows from, when that is not the anchor. A submenu laid
   * over its parent is *positioned* on the parent panel but should *grow* out
   * of the row that opened it - two different elements, two different jobs.
   */
  revealFromRef?: RefObject<HTMLElement | null>;
  /**
   * Where the anchor was, instead of where it is. A panel that dims and shrinks
   * the surface it came from would otherwise measure that surface *after* it
   * moved, and open a few pixels off from the row that was actually pressed.
   */
  anchorRect?: DOMRect | null;
  /**
   * Corner radius the reveal starts from - the radius of the thing it grows
   * out of. Guessed from the clip's own shape when not given, which rounds it
   * like a pill and rarely matches the trigger it is supposed to come from.
   */
  revealRadius?: number;
  /**
   * Set back behind something on top of it. A filter rather than opacity: a
   * translucent panel over a colored page shows the page through it, which
   * reads as a rendering fault rather than as depth.
   */
  isDimmed?: boolean;
  /**
   * The panel's shadow, as a `box-shadow` value. It comes through here rather
   * than through `style` because it cannot be painted by the panel at all: the
   * reveal clips the panel, and a clip cuts off everything painted outside the
   * border box, shadows included. Given here, it goes to a layer of its own
   * that follows the reveal's shape instead of being cut by it.
   */
  shadow?: string;
  /** What "set back" looks like - see `washOut`, and mind the color scheme. */
  dimFilter?: string;
  /**
   * How it leaves. `reveal` plays the opening backwards; `fade` just dissolves,
   * for a panel closing at the same time as the one it hangs from - two shapes
   * folding into two different places at once reads as a glitch.
   */
  exitAnimation?: "reveal" | "fade";
  /** Scrolling the page dismisses it, rather than dragging it along. */
  closeOnScroll?: boolean;
  /**
   * Play the reveal backwards. The caller owns the timing: it sets this, waits
   * `exitDuration`, then unmounts - the panel cannot remove itself.
   */
  isExiting?: boolean;
  style?: StyleProp<ViewStyle>;
  inPlaceStyle?: StyleProp<ViewStyle>;
  /** Passed through to the panel - this is how it opts into the glass. */
  dataSet?: Record<string, string>;
  /** Asked to close: by a click outside, by Escape, or by a scroll. */
  onExit: () => void;
  /** Elements whose clicks must not count as "outside" - besides the anchor. */
  skipRefs?: RefObject<HTMLElement | null>[];
  /**
   * Filled with the element holding the content, for a caller that has to know
   * what "inside" means - an overlay opened from here, for one: it lives in the
   * portal too, so a click in it is outside of every DOM ancestor it has.
   */
  contentRef?: RefObject<HTMLElement | null>;
  /** Which position was used, so a caller can point an arrow the right way. */
  onPositionChange?: (position: PositionName | undefined) => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  /** Raw pointer position, for a caller tracking where the pointer is headed. */
  onPointerMove?: (position: { x: number; y: number }) => void;
  children: ReactNode;
}) {
  // Only used to re-run the placement; the measurements themselves read the
  // window directly, which cannot lag behind a resize the way a hook can.
  const windowDimensions = useWindowDimensions();

  const contentRef = useRef<HTMLElement | null>(null);
  const [contentElement, setContentElement] = useState<HTMLElement | null>(null);
  const setContentNode = useCallback(
    (node: View | null) => {
      const element = node as unknown as HTMLElement | null;
      contentRef.current = element;
      if (externalContentRef) externalContentRef.current = element;
      setContentElement(element);
    },
    [externalContentRef],
  );

  // The panel inside the wrapper. Kept apart because the two carry different
  // things: the wrapper is placed and grown, the panel is clipped, and it is
  // the panel that has the radius the reveal has to end on.
  const panelRef = useRef<HTMLElement | null>(null);
  const setPanelNode = useCallback((node: View | null) => {
    panelRef.current = node as unknown as HTMLElement | null;
  }, []);

  useClickOutside(contentRef, onExit, true, [anchorRef, ...(skipRefs ?? [])]);

  const [placement, setPlacement] = useState<StyleProp<ViewStyle>>(styles.unplaced);
  const hasMeasuredReveal = useRef(false);
  // The two ends of the reveal: the trigger's footprint expressed in the
  // panel's own coordinates, and the panel itself.
  const [reveal, setReveal] = useState<{
    from: RevealBox;
    to: RevealBox;
    /** Where the panel sits inside the wrapper - a margin, when it has one. */
    offset: { top: number; right: number; bottom: number; left: number };
    /** The trigger's own centre, in the wrapper's coordinates. */
    origin: string;
  } | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const place = useCallback(
    (element: HTMLElement) => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      const anchorRect = frozenAnchorRect ?? anchor.getBoundingClientRect();
      const referenceItem = {
        x: anchorRect.left,
        y: anchorRect.top,
        width: anchorRect.width,
        height: anchorRect.height,
      };
      if (!isPartiallyInViewport(referenceItem, windowSize)) {
        setPlacement(styles.anchorGone);
        onPositionChange?.(undefined);
        return;
      }
      // Content taller than the room above or below the anchor would make every
      // vertical position fail, and the best-scoring fallback is then a side
      // one - a panel that covers what sits next to its trigger instead of
      // hanging under it. Cap it to the room actually available and let the
      // content scroll: what the caller asked for is "below if you can".
      const maxHeight = coverAnchor
        ? windowSize.height - viewportMargin * 2
        : Math.max(
            windowSize.height - (referenceItem.y + referenceItem.height) - viewportMargin,
            referenceItem.y - viewportMargin,
          );
      const maxWidth = windowSize.width - viewportMargin * 2;
      // The size that has to fit on screen is the border box, padding included.
      // `offsetWidth`/`offsetHeight` rather than the rect: the panel sits at
      // `openScale` until it is revealed, and a rect reports what is *painted*,
      // so the panel would be placed - and its reveal measured - from a size
      // short by exactly that scale.
      const size = {
        width: Math.min(element.offsetWidth, maxWidth),
        height: Math.min(element.offsetHeight, maxHeight),
      };
      const optimal = coverAnchor
        ? {
            // Pinned to the anchor, then pushed back inside the window - which
            // is what makes a panel opened near the bottom ride up as it grows.
            x: clamp(
              referenceItem.x,
              viewportMargin,
              windowSize.width - size.width - viewportMargin,
            ),
            // Top-left corners aligned: the panel opens exactly where the row
            // that summoned it was, so its header lands on the pressed row
            // rather than a few lines away from it.
            y: clamp(
              referenceItem.y,
              viewportMargin,
              windowSize.height - size.height - viewportMargin,
            ),
            usedPosition: "bottom-left" as PositionName,
          }
        : calculateOptimalPosition({
            window: windowSize,
            referenceItem,
            itemToPlace: size,
            preferredPositions,
          });
      setPlacement({
        position: "fixed",
        top: optimal.y,
        left: optimal.x,
        maxHeight,
        maxWidth,
        opacity: 1,
      });
      onPositionChange?.(optimal.usedPosition);

      // The reveal is measured here, from the numbers the placement just
      // produced, rather than by reading the panel back: the style carrying
      // them has not reached the DOM yet, so a rect read now still describes
      // the panel parked where it was measured.
      if (hasMeasuredReveal.current) return;
      hasMeasuredReveal.current = true;
      const revealFrom =
        (revealFromRef ?? anchorRef).current?.getBoundingClientRect() ?? anchorRect;
      const panelElement = panelRef.current;
      // The panel is not always the whole wrapper: a caller pushing it off its
      // trigger with a margin leaves that margin inside the wrapper. Everything
      // below is measured on the panel, which is what the clip applies to, and
      // the offset goes out with the reveal so that the shadow layer - which
      // fills the wrapper - can be pushed in by the same amount. Measured on the
      // wrapper instead, the two describe rectangles a margin apart, and the
      // shadow sits visibly off the panel it belongs to.
      const offset = {
        top: panelElement?.offsetTop ?? 0,
        left: panelElement?.offsetLeft ?? 0,
        right: panelElement
          ? element.offsetWidth - panelElement.offsetLeft - panelElement.offsetWidth
          : 0,
        bottom: panelElement
          ? element.offsetHeight - panelElement.offsetTop - panelElement.offsetHeight
          : 0,
      };
      const panel = {
        left: optimal.x + offset.left,
        top: optimal.y + offset.top,
        width: size.width - offset.left - offset.right,
        height: size.height - offset.top - offset.bottom,
      };
      // `inset()` takes no `inherit`, so the panel's own radius has to be read -
      // off the panel, not off the wrapper, which is the one holding no style.
      const panelRadius = panelElement
        ? parseFloat(getComputedStyle(panelElement).borderTopLeftRadius) || 0
        : 0;
      // Keep a sliver of panel visible even when the trigger sits entirely
      // outside it, so the reveal starts from a drop rather than from nothing.
      const minSize = 12;
      const left = clamp(revealFrom.left - panel.left, 0, panel.width - minSize);
      const right = clamp(
        panel.left + panel.width - revealFrom.right,
        0,
        panel.width - left - minSize,
      );
      const top = clamp(revealFrom.top - panel.top, 0, panel.height - minSize);
      const bottom = clamp(
        panel.top + panel.height - revealFrom.bottom,
        0,
        panel.height - top - minSize,
      );
      const radius =
        revealRadius ?? Math.min(panel.width - left - right, panel.height - top - bottom) / 2;
      setReveal({
        from: { top, right, bottom, left, radius },
        to: { top: 0, right: 0, bottom: 0, left: 0, radius: panelRadius },
        offset,
        // The middle of the clip the reveal starts from - which is the trigger,
        // expressed in the wrapper's coordinates, since the wrapper is what
        // scales. Scaling from there is what keeps the growing panel pinned to
        // the thing it grows out of; from the panel's own centre, the clip would
        // drift away from the trigger as the scale changes, and the reveal would
        // no longer start on it.
        origin: `${offset.left + left + (panel.width - left - right) / 2}px ${offset.top + top + (panel.height - top - bottom) / 2}px`,
      });
    },
    [
      anchorRef,
      revealFromRef,
      frozenAnchorRect,
      revealRadius,
      viewportMargin,
      coverAnchor,
      preferredPositions,
      onPositionChange,
    ],
  );

  useEffect(() => {
    if (!contentElement) return;
    place(contentElement);

    // The panel changes size when a submenu opens or a label wraps, and it
    // moves whenever the anchor does.
    const observer = new ResizeObserver(() => place(contentElement));
    observer.observe(contentElement);
    const handleResize = () => place(contentElement);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [contentElement, place, windowDimensions]);

  // Kept apart from the measuring effect on purpose: there, setting the clip
  // re-runs the effect, whose cleanup would cancel the very frame that starts
  // the animation - and the panel would sit at its initial clip forever.
  useEffect(() => {
    if (reveal === null) return;
    // Two frames, so the initial clip is painted before the change: that is
    // what the browser needs to treat it as a transition rather than as a
    // first paint. The timeout is a fallback - a hidden document never runs an
    // animation frame, and the panel must not stay invisible waiting for one.
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsRevealed(true));
    });
    const timer = setTimeout(() => setIsRevealed(true), 64);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [reveal]);

  // The bounce belongs to the opening and to nothing else. `transform` is also
  // what sets a panel back when a submenu covers it, and those two moves want
  // different durations and different curves - so the panel stops bouncing once
  // it has arrived, and `transform` goes back to being the dim's own.
  const [hasSettled, setHasSettled] = useState(false);
  useEffect(() => {
    if (!isRevealed) return;
    const timer = setTimeout(() => setHasSettled(true), motion.bounceDelay + motion.bounceDuration);
    return () => clearTimeout(timer);
  }, [isRevealed]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    // Per-instance for the same reason as the scroll handler above.
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onExit();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  useEffect(() => {
    if (!closeOnScroll) return;
    // Wrapped rather than registered directly: a menu and its submenu are
    // handed the *same* `onExit`, and `addEventListener` deduplicates by
    // (target, type, function). Registering it twice keeps one entry, and the
    // submenu unmounting removes it - leaving the parent deaf to scrolling.
    const handleScroll = () => onExit();
    // No capture: a scroll inside the panel does not reach `window`, so only
    // the page scrolling behind dismisses it.
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [closeOnScroll, onExit]);

  const isShown = isRevealed && !isExiting;
  // Parked off-screen because its anchor scrolled away: invisible whatever the
  // reveal is doing, so the fade below cannot bring it back.
  const isAnchorGone = placement === styles.anchorGone;
  const isBouncing = !hasSettled && !isDimmed && !isExiting;
  // Leaving beside another panel: it only dissolves, so its shape stays where it
  // is rather than folding back into a trigger two panels are leaving at once.
  const isDissolving = isExiting && exitAnimation === "fade";
  // The one shape the clip and the shadow layer both read, so they cannot come
  // apart: the same rectangle, once as a `clip-path` and once as a geometry.
  const shape = reveal === null ? null : isShown || isDissolving ? reveal.to : reveal.from;
  const shapeDuration = isExiting ? motion.exitDuration : motion.revealDuration;
  // Going in, a share of the reveal: a beginning, not a duration of its own.
  // Going out, the whole exit. A fade held to the end of a closing panel is a
  // fade nobody sees - this easing has the shape 90% folded a third of the way
  // through, so whatever is left to fade by then is a sliver. Over the whole
  // exit, the bezel and the shadow thin out as the shape closes on them.
  const fadeDuration = isDissolving
    ? motion.exitDuration * motion.dissolveRatio
    : isExiting
      ? motion.exitDuration
      : motion.revealDuration * motion.fadeRatio;
  const dim = isDimmed ? dimFilter : "none";
  const fade = isShown && !isAnchorGone ? 1 : 0;

  return (
    <Portal id={id}>
      <View
        ref={setContentNode}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={
          onPointerMove === undefined
            ? undefined
            : (event) =>
                onPointerMove({
                  x: event.nativeEvent.clientX,
                  y: event.nativeEvent.clientY,
                })
        }
        style={[
          placement,
          // The wrapper is placed and grown, and carries nothing else. That is
          // not tidiness: a `filter` or an `opacity` here would take the panel
          // below out of the backdrop root, and its `backdrop-filter` would stop
          // seeing the page behind it - the glass would go flat for as long as
          // the animation lasts. `transform` is the one of the three that leaves
          // a descendant's backdrop alone.
          reveal === null
            ? // Placed but not measured yet. The starting scale is set here
              // too - left out, the panel would animate *down* to it before
              // growing back out of the trigger.
              { transform: [{ scale: motion.openScale }] }
            : {
                // Two moves on one property: growing into place, and being set
                // back behind a submenu. `isRevealed` rather than `isShown`, so
                // a panel on its way out holds its size and folds through the
                // clip alone.
                transform: [
                  {
                    scale: isDimmed ? motion.dimScale : isRevealed ? 1 : motion.openScale,
                  },
                ],
                transformOrigin: reveal.origin,
                transitionProperty: "transform",
                transitionDuration: `${isBouncing ? motion.bounceDuration : motion.dimDuration}ms`,
                // Let the clip uncover the panel before it starts growing: a
                // scale under a shut clip has nothing to show.
                transitionDelay: `${isBouncing ? motion.bounceDelay : 0}ms`,
                transitionTimingFunction: isBouncing ? motion.bounceEasing : motion.easing,
              },
        ]}
      >
        {shadow === undefined || reveal === null || shape === null ? null : (
          <View
            style={[
              styles.shadow,
              {
                // The shape is the panel's, and the layer fills the wrapper: the
                // panel's own offset inside it is what puts the two back on each
                // other.
                top: reveal.offset.top + shape.top,
                right: reveal.offset.right + shape.right,
                bottom: reveal.offset.bottom + shape.bottom,
                left: reveal.offset.left + shape.left,
                borderRadius: shape.radius,
                boxShadow: shadow,
                // Same fade and same wash as the panel: it is the panel's own
                // shadow, and it only lives out here because a clip cannot let
                // it through.
                opacity: fade,
                filter: dim,
                transitionProperty: [...shadowShapeProperties, "filter", "opacity"].join(", "),
                transitionDuration: [
                  ...shadowShapeProperties.map(() => `${shapeDuration}ms`),
                  `${motion.dimDuration}ms`,
                  `${fadeDuration}ms`,
                ].join(", "),
                // No `transitionDelay`: shape, wash and fade all start together.
                transitionTimingFunction: motion.easing,
              },
            ]}
          />
        )}
        <View
          ref={setPanelNode}
          dataSet={dataSet}
          style={[
            styles.panel,
            style,
            inPlaceStyle,
            shape === null
              ? // Showing it now would flash the finished panel for a frame
                // before the reveal starts.
                { opacity: 0 }
              : // One declaration for all three: `transitionProperty` is a
                // single value, so a second style setting it would silently drop
                // the others from the transition and make them snap.
                {
                  clipPath: insetPath(shape),
                  // The panel's own opacity: its first frames going in, all of
                  // the way out. The bezel belongs to the panel rather than to
                  // the shape clipped inside it, so without this it is painted
                  // whole from the very first frame, around a panel that has not
                  // opened yet - and left whole until the very last one.
                  opacity: fade,
                  filter: dim,
                  transitionProperty: "clip-path, filter, opacity",
                  transitionDuration: [
                    `${shapeDuration}ms`,
                    `${motion.dimDuration}ms`,
                    `${fadeDuration}ms`,
                  ].join(", "),
                  transitionTimingFunction: motion.easing,
                },
          ]}
        >
          <View
            style={[
              styles.content,
              {
                opacity: isRevealed && !isExiting ? 1 : 0,
                // The content sharpens as the shape settles - the blur is what
                // sells it as one material forming rather than two things
                // moving.
                filter: isRevealed && !isExiting ? "blur(0px)" : `blur(${motion.contentBlur}px)`,
                transform: [{ scale: isRevealed && !isExiting ? 1 : motion.contentScale }],
                transitionProperty: "opacity, filter, transform",
                // On the way out the content goes first, so the shape is not
                // left closing around text that is still sharp.
                // Going in, the shape leads and the content follows. Going out
                // they have to land together: a content that clears first leaves
                // an empty box folding shut, which is what reads as broken.
                transitionDuration: `${isExiting ? motion.exitDuration : motion.revealContentDuration}ms`,
                transitionDelay: isExiting ? "0ms" : `${motion.revealContentDelay}ms`,
                // Going out, the content rides the mirror curve: it holds while
                // the shape closes over it, instead of emptying in the first
                // third and leaving a bare box to fold shut.
                transitionTimingFunction: isExiting ? motion.exitContentEasing : motion.easing,
              },
            ]}
          >
            {children}
          </View>
        </View>
      </View>
    </Portal>
  );
}
