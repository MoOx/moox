/**
 * # Menu behaviour
 *
 * The spec this file implements. It is the contract, not a description of the
 * code: when the two disagree, the code is wrong.
 *
 * There are two layouts, chosen once per menu by `(hover: hover)` - not by
 * width. A pointer is what makes a second panel beside the first usable at
 * all, and a fingertip is what makes the roomier spacing necessary.
 *
 * ## Both layouts
 *
 * - The panel is anchored, never centered, and never a full-screen sheet. It
 *   goes through the portal, is `position: fixed`, and is pushed back inside
 *   the window rather than allowed to overflow it.
 * - Its height is capped to the room actually available, and the content
 *   scrolls inside; it never grows past the window.
 * - Opening is a reveal: the panel is clipped to the footprint of whatever
 *   summoned it, rounded like it, and that clip opens to the full panel over
 *   420 ms on `cubic-bezier(0.32, 0.72, 0, 1)`. The content follows - blur
 *   10px -> 0, opacity 0 -> 1, scale 0.96 -> 1 - over 70% of that, delayed by
 *   15%, so the shape leads and the content settles into it. `clip-path` is
 *   what makes this affordable: it never reflows, so labels do not rewrap
 *   mid-animation.
 * - The panel's shadow is painted beside it, by a layer following the same
 *   shape, and never by the panel itself: a clip cuts off everything painted
 *   outside the border box, so a panel clipped for its reveal cannot cast a
 *   shadow at all - not during the reveal, and not once it has arrived.
 * - The panel grows with that clip rather than only inside it: 0.9 -> 1 on an
 *   `easeOutBack`, scaled out of the middle of the footprint it is revealed
 *   from, so it arrives about 2% too big and settles. Scaling from anywhere
 *   else would drag the clip off the trigger as it grows. It starts 60 ms in
 *   and runs 480 ms, past the reveal: under a clip that is still nearly shut,
 *   a tenth of the panel's size is a couple of pixels and there is nothing to
 *   see - the overshoot has to land once the panel is uncovered.
 * - The panel's own opacity takes the first third of the way in, and the whole
 *   way out; its shadow layer follows it exactly. The bezel is painted by the
 *   panel, not by the shape clipped inside it, so it would otherwise be there
 *   whole before the panel has opened at all - and whole until the frame it is
 *   taken away on, the clip being nearly shut long before the exit ends.
 * - Closing is the same move backwards, at 260 ms, and this time the content
 *   and the shape land together: a content that clears first leaves an empty
 *   box folding shut. The panel keeps its size on the way out and folds
 *   through the clip alone - shrinking as well would read as two exits.
 * - Exactly one item is highlighted at a time, and only under a pointer.
 * - Every way out - trigger, click outside, Escape, page scroll, choosing an
 *   item - goes through the same staged close, so all of them are animated.
 *   Scrolling *inside* the panel does not close it.
 * - The material (glass, blur, bezel) is not decided here: the caller passes a
 *   `dataSet` and the page's stylesheet does the rest.
 *
 * ## With a pointer
 *
 * - Submenus open *beside* their row, on the side with room.
 * - Hovering is enough to walk them: an item with a submenu opens after 140 ms
 *   of rest, which keeps a submenu from flying open on a passing sweep.
 * - Replacing or closing an open submenu is immediate - *unless* the pointer
 *   is inside the safe triangle, the wedge from where it was a few frames ago
 *   to the two corners of the open submenu's near edge. Inside it, the pointer
 *   is on its way to the submenu however many rows it crosses, so the crossed
 *   rows are ignored whole: no highlight, no switch. A 400 ms ceiling catches
 *   a pointer that aims and then stops halfway.
 * - A pointer that has left every panel closes the open submenu after 250 ms.
 *   Crossing from one panel into the next is itself a leave followed by an
 *   enter - the gap between two panels is outside both - so a delay is what
 *   tells a crossing apart from a departure, and entering any panel of the
 *   chain calls it off. The menu itself stays open: it was opened by a click,
 *   and only a click, Escape or a choice takes it away.
 * - A submenu the pointer went *into* is not closed by leaving, however long
 *   the pointer stays away: it is where walking the menu got to, and only
 *   opening another one replaces it. Only a submenu opened in passing, and
 *   never reached, is cleared on the way out - that one is in the way.
 * - The row whose submenu is open stays lit, but only while nothing else is
 *   under the pointer.
 * - Chevrons point sideways, where the submenu is.
 *
 * ## Without a pointer
 *
 * Modelled on the iOS context menu, which is a stack of panels rather than a
 * drill-down: the panel you came from stays visible behind the one you opened.
 *
 * - Every spacing goes one step up the scale. Type sizes do not change.
 * - Tapping a row opens its submenu *over* this panel, its top-left corner on
 *   that row - measured before this panel moves, since it shrinks in the same
 *   commit and would otherwise be measured after it had already shifted.
 * - The row becomes the submenu's header: same label, in place, separated from
 *   the content by a rule, and its chevron turns to point down (220 ms).
 *   Pressing the header folds the submenu back.
 * - The panel underneath is set back: scaled to 0.96 and washed out over
 *   280 ms. Washed, not faded - opacity over a colored page shows the page
 *   through the panel, which reads as a rendering fault rather than as depth.
 *   On light surfaces the wash holds white and lifts black (see `washOut`); on
 *   dark ones it is the mirror image, plain `brightness()`.
 * - That setting-back is undone the moment the submenu is *dismissed*, not
 *   when it has finished leaving, so both move together. It is also dropped
 *   while the whole menu is closing, or the panel would leave still washed.
 * - Nothing is highlighted: a tap already opened something, and lighting the
 *   row it came from only competes with what appeared over it.
 *
 * ## When several panels leave at once
 *
 * Only the root folds back into the trigger; nested panels fade. Two shapes
 * folding into two different places at the same time reads as a glitch. A
 * submenu dismissed *on its own* is the only thing moving, so it folds back.
 */

import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import InPlaceOrModal, {
  exitDuration,
  motion,
  timing,
  washOut,
} from "@/react-multiversal/InPlaceOrModal";
import LinkView from "@/react-multiversal/LinkView";
import { PositionName, preferHorizontal } from "@/react-multiversal/positions.utils";
import { supportsHover } from "@/react-multiversal/supports";
import { alpha, colors, useTheme } from "@/styles";
import SVGChevronRight from "@/svgs/components/SVGChevronRight";
import { ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

export type InPlaceOrModalMenuItem = {
  id: string;
  /** A plain node, or a function of the current text color for icon + label. */
  label: ReactNode | ((color: string) => ReactNode);
  /** Section title: rendered as a heading, not selectable, not interactive. */
  heading?: boolean;
  /** Makes the item a real link - middle-click and "open in a new tab" work. */
  href?: string;
  /** Return `false` to keep the menu open, e.g. for a setting being flipped. */
  onPress?: () => void | boolean;
  items?: InPlaceOrModalMenuItem[];
};

/** Corner radius of a row - also where a submenu's reveal starts from. */
const itemRadius = 10;

/**
 * The panel's own shadow. It goes to `InPlaceOrModal` as a prop rather than into
 * the stylesheet below because the panel cannot paint it: the reveal clips the
 * panel, and a clip cuts off everything that lands outside the border box. The
 * panel gets its shadow from a layer that follows the same shape uncut.
 */
const menuShadow = `0 ${size("xs")}px ${size("m")}px rgba(0,0,0,0.25)`;

/** Submenus open sideways, and from the side that has room. */
const defaultSubmenuPreferredPositions: PositionName[] = [
  "right-auto",
  "left-auto",
  ...preferHorizontal,
];

type Point = { x: number; y: number };

const sign = (a: Point, b: Point, c: Point) =>
  (a.x - c.x) * (b.y - c.y) - (b.x - c.x) * (a.y - c.y);

const isInTriangle = (point: Point, a: Point, b: Point, c: Point) => {
  const d1 = sign(point, a, b);
  const d2 = sign(point, b, c);
  const d3 = sign(point, c, a);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};

/**
 * The "safe triangle": from where the pointer was a few frames ago, to the two
 * corners of the submenu edge facing it. A pointer still inside that triangle
 * is on its way to the submenu, however many items it crosses doing so; a
 * pointer outside it has changed its mind, and the menu may react at once.
 *
 * This is why moving diagonally onto a submenu does not lose it, while moving
 * straight down the parent menu switches immediately - no delay involved.
 */
const isHeadingTo = (submenu: DOMRect, from: Point, to: Point) => {
  const edgeX = submenu.left >= to.x ? submenu.left : submenu.right;
  return (
    isInTriangle(to, from, { x: edgeX, y: submenu.top }, { x: edgeX, y: submenu.bottom }) &&
    // A pointer that has not moved tells us nothing; treat it as undecided
    // rather than as aiming, or a resting pointer would freeze the menu.
    (from.x !== to.x || from.y !== to.y)
  );
};

const styles = StyleSheet.create({
  menu: {
    // No `maxHeight` here: `InPlaceOrModal` caps it to the room it found.
    flexShrink: 1,
    minWidth: 200,
    paddingVertical: size("xxs"),
    borderRadius: 16,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: alpha(colors.black, 0.15),
    // No `boxShadow` here, and none from the glass either: the panel is clipped
    // for as long as it exists, so anything it paints outside its border box is
    // cut off. `menuShadow` above is the panel's shadow, and it is painted by a
    // layer of its own. Inset shadows - the glass bezel - are unaffected.
  },
  scroll: {
    flexShrink: 1,
    overflowY: "auto",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: size("xxs"),
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: size("xs"),
    paddingHorizontal: size("xs"),
    paddingVertical: size("xxs"),
    borderRadius: itemRadius,
  },
  itemLabel: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: size("xs"),
  },
  heading: {
    paddingHorizontal: size("s"),
    paddingTop: size("xs"),
    paddingBottom: size("xxs"),
  },
  // The row a covering submenu grew out of, kept as its title.
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: alpha(colors.black, 0.12),
    borderStyle: "solid",
    marginBottom: size("xxs"),
    paddingBottom: size("xxs"),
  },
});

/**
 * Same menu, one step up the spacing scale - for touch, where the target is a
 * fingertip rather than a cursor. Type sizes are deliberately untouched: only
 * the room around them grows.
 */
const touchStyles = StyleSheet.create({
  menu: { ...StyleSheet.flatten(styles.menu), paddingVertical: size("xs") },
  scroll: StyleSheet.flatten(styles.scroll),
  row: { ...StyleSheet.flatten(styles.row), paddingHorizontal: size("xs") },
  item: {
    ...StyleSheet.flatten(styles.item),
    gap: size("s"),
    paddingHorizontal: size("s"),
    paddingVertical: size("xs"),
  },
  itemLabel: { ...StyleSheet.flatten(styles.itemLabel), gap: size("s") },
  heading: {
    ...StyleSheet.flatten(styles.heading),
    paddingHorizontal: size("m"),
    paddingTop: size("s"),
    paddingBottom: size("xs"),
  },
  header: {
    ...StyleSheet.flatten(styles.header),
    marginBottom: size("xs"),
    paddingBottom: size("xs"),
  },
});

const Checkmark = ({ color }: { color: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24">
    <Path fill={color} d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </Svg>
);

function MenuItem({
  parentId,
  item,
  selectedItemIds,
  onExit,
  isHighlighted,
  onHover,
  isOpen,
  isClosing,
  openNow,
  submenuPreferredPositions,
  onSubmenuPointerEnter,
  onSubmenuPointerLeave,
  onCloseSubmenu,
  isTouch,
  isHeader,
  menuStyle,
  menuDataSet,
  parentMenuRef,
  submenuRef,
  isExiting,
}: {
  parentId: string;
  item: InPlaceOrModalMenuItem;
  selectedItemIds?: string[];
  onExit: () => void;
  isHighlighted: boolean;
  onHover: (id: string, hasSubmenu: boolean) => void;
  isOpen: boolean;
  /** Dismissed, but still on screen while it plays its exit. */
  isClosing: boolean;
  openNow: (id: string | null) => void;
  /** The submenu was reached, or left again - the parent decides what it means. */
  onSubmenuPointerEnter: () => void;
  onSubmenuPointerLeave: () => void;
  onCloseSubmenu: () => void;
  /**
   * No pointer: submenus lie over this panel rather than beside it, and every
   * row is given more room, because the target is a fingertip.
   */
  isTouch: boolean;
  /** This row is the title of the panel it opened, and closes it again. */
  isHeader: boolean;
  submenuPreferredPositions: PositionName[];
  menuStyle?: StyleProp<ViewStyle>;
  menuDataSet?: Record<string, string>;
  parentMenuRef: RefObject<HTMLElement | null>;
  submenuRef: RefObject<HTMLElement | null>;
  isExiting: boolean;
}) {
  const theme = useTheme();
  // Spacing is the only thing touch changes here - never the type scale.
  const s = isTouch ? touchStyles : styles;
  const rowRef = useRef<HTMLElement | null>(null);
  const setRowNode = useCallback((node: View | null) => {
    rowRef.current = node as unknown as HTMLElement | null;
  }, []);
  // Where this row sat when it was pressed. Opening a covering submenu dims and
  // shrinks this panel in the same commit, so by the time the submenu measures
  // the row it has already moved - it has to be told where the row *was*.
  const openedFromRect = useRef<DOMRect | null>(null);

  // Walking the menu is enough to walk its submenus; when that opens one, and
  // how fast, is the menu's call - only it knows where the pointer came from.
  const handlePointerEnter = useCallback(() => {
    onHover(item.id, item.items !== undefined);
  }, [onHover, item.id, item.items]);

  const handlePress = useCallback(() => {
    if (item.items) {
      if (isTouch) openedFromRect.current = rowRef.current?.getBoundingClientRect() ?? null;
      // Hover already opened it under a pointer, so a click must not toggle it
      // shut; without a pointer this is the only way in and out.
      openNow(isOpen && !supportsHover() ? null : item.id);
      return;
    }
    // An item may ask to stay open - a setting you flip and check right away.
    const shouldStayOpen = item.onPress?.() === false;
    if (!shouldStayOpen) onExit();
  }, [item, isOpen, isTouch, onExit, openNow]);

  if (item.heading) {
    return (
      <View style={s.heading}>
        <Text style={[fontStyles.ios.caption2, theme.styles.textLight1, { fontWeight: "700" }]}>
          {typeof item.label === "function"
            ? item.label(theme.dynamicColors.textLight1)
            : item.label}
        </Text>
      </View>
    );
  }

  // Strictly what the menu says is lit: exactly one item at a time, never the
  // one whose submenu is open on top of the one under the pointer.
  const isSelected = selectedItemIds?.includes(item.id) ?? false;
  const color = isHighlighted ? colors.white : theme.dynamicColors.text;

  const content = (
    <>
      <View style={s.itemLabel}>
        {typeof item.label === "function" ? item.label(color) : item.label}
      </View>
      {!isSelected ? null : <Checkmark color={color} />}
      {!item.items && !isHeader ? null : (
        <SVGChevronRight
          width={10}
          height={10}
          fill={color}
          // Sideways for a submenu that opens beside; turned down for one that
          // opens over this row, where it reads as "this expands below".
          style={{
            opacity: 0.6,
            transform: [{ rotate: isHeader || (isTouch && isOpen) ? "90deg" : "0deg" }],
            transitionProperty: "transform",
            transitionDuration: `${motion.chevronDuration}ms`,
            transitionTimingFunction: motion.easing,
          }}
        />
      )}
    </>
  );

  const itemStyle = [
    s.item,
    {
      backgroundColor: isHighlighted ? theme.dynamicColors.backMain : "transparent",
    },
  ];

  return (
    <View
      ref={setRowNode}
      style={[s.row, isHeader ? s.header : undefined]}
      onPointerEnter={handlePointerEnter}
    >
      {item.href !== undefined ? (
        // The `<a>` itself has to fill the row, or the highlight and the
        // checkmark stop where the label ends instead of at the menu edge.
        <LinkView
          href={item.href}
          onPress={handlePress}
          containerStyle={{ flex: 1 }}
          style={itemStyle}
        >
          {content}
        </LinkView>
      ) : (
        <Pressable onPress={handlePress} style={itemStyle}>
          {content}
        </Pressable>
      )}
      {!((isOpen || isClosing) && item.items) ? null : (
        <InPlaceOrModalMenu
          id={`${parentId}-${item.id}`}
          items={item.items}
          selectedItemIds={selectedItemIds}
          onExit={onExit}
          preferredPositions={submenuPreferredPositions}
          submenuPreferredPositions={submenuPreferredPositions}
          coverAnchor={isTouch}
          // Covering submenus take the parent's own place, so that once the
          // parent shrinks behind them they sit just above and slightly left
          // of it - not adrift from the row that was tapped.
          anchorRef={rowRef}
          anchorRect={isTouch ? openedFromRect.current : undefined}
          // Grows out of the row with the row's own corners, not with a pill
          // radius guessed from the clip.
          revealRadius={itemRadius}
          headerItem={isTouch ? item : undefined}
          onBack={onCloseSubmenu}
          menuStyle={menuStyle}
          dataSet={menuDataSet}
          // Both menus live in the portal, so neither contains the other in the
          // DOM and each would read a click in the other as a click outside:
          // the submenu is told about its parent here, and the parent is told
          // about the submenu through `submenuRef`.
          skipRefs={[parentMenuRef]}
          contentRef={submenuRef}
          isExiting={isExiting || isClosing}
          // One shape folding back into the trigger is a closing menu; two
          // folding into two different places at once is noise. On its own,
          // though, a submenu is the only thing moving - so it folds back.
          exitAnimation={isClosing ? "reveal" : "fade"}
          // Reaching the submenu proves the aimed move succeeded, and that
          // leaving the parent panel was a crossing rather than a departure:
          // whatever the parent had queued - a submenu to open in place of this
          // one, or this one's own dismissal - is called off. Leaving it arms
          // that dismissal again. Both are handed to the parent rather than
          // dealt with here, and the parent passes them up in turn: a pointer
          // inside a third panel has not left the first one either.
          onPointerEnter={onSubmenuPointerEnter}
          onPointerLeave={onSubmenuPointerLeave}
        />
      )}
    </View>
  );
}

/**
 * A menu shown by `InPlaceOrModal`, hanging off its trigger.
 *
 * Items are flat by default, with `heading` items acting as section titles; an
 * item carrying `items` opens a submenu, anchored on itself. Anything with an
 * `href` renders as a real link, so the menu is not a dead end for a
 * middle-click - but it is not how the site is meant to be crawled either.
 *
 * The highlight is held here rather than per item on purpose: `pointerleave`
 * is not reliable enough to be the only thing that turns one off - miss one
 * event and the item stays lit forever. With a single id, lighting an item
 * necessarily unlights the previous one, and leaving the panel clears it.
 */
export default function InPlaceOrModalMenu({
  id,
  anchorRef,
  items,
  selectedItemIds,
  onExit,
  preferredPositions,
  submenuPreferredPositions = defaultSubmenuPreferredPositions,
  menuStyle,
  dataSet,
  skipRefs,
  contentRef,
  onPointerEnter,
  onPointerLeave,
  isExiting = false,
  exitAnimation,
  coverAnchor = false,
  anchorRect,
  revealRadius,
  headerItem,
  onBack,
}: {
  id: string;
  anchorRef: RefObject<HTMLElement | null>;
  items: InPlaceOrModalMenuItem[];
  /** Ids shown with a checkmark - the current value of a setting. */
  selectedItemIds?: string[];
  onExit: () => void;
  preferredPositions?: PositionName[];
  submenuPreferredPositions?: PositionName[];
  menuStyle?: StyleProp<ViewStyle>;
  /** Passed to the panel - this is how the caller opts into its material. */
  dataSet?: Record<string, string>;
  skipRefs?: RefObject<HTMLElement | null>[];
  /** Filled with the menu element, for a parent menu that has to skip it. */
  contentRef?: RefObject<HTMLElement | null>;
  /**
   * The pointer came into this panel, or left it. A parent menu listens to both
   * of a submenu's: the two panels are siblings in the portal, so a pointer
   * walking from one into the other leaves the first as far as the DOM is
   * concerned, and only the second one's `enter` says otherwise.
   */
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  /** Set by a parent menu that is closing, so nested panels leave together. */
  isExiting?: boolean;
  exitAnimation?: "reveal" | "fade";
  coverAnchor?: boolean;
  anchorRect?: DOMRect | null;
  revealRadius?: number;
  /**
   * Submenus laid over their parent: the row that opened it becomes the panel's
   * own header, the way iOS turns the tapped row into the title of what it
   * opened - so the panel says where it came from without a "back" label.
   */
  headerItem?: InPlaceOrModalMenuItem;
  onBack?: () => void;
}) {
  const theme = useTheme();
  // Read once: a device does not grow a pointer mid-menu, and re-reading it per
  // render would make the layout depend on when React happened to ask.
  const [hasPointer] = useState(() => supportsHover());
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  // Whether the pointer ever walked into the submenu that is open, rather than
  // only opening it on the way past. That is the difference between a panel
  // that is in the way and one that is where the walk got to, and it is the
  // only thing leaving the menu has to know - see `handlePanelPointerLeave`.
  const hasVisitedSubmenu = useRef(false);
  // Which submenu is open is the one thing that unsets it: a panel that
  // replaces another is not the one that was walked into.
  const setOpenSubmenu = useCallback((nextId: string | null) => {
    hasVisitedSubmenu.current = false;
    setOpenItemId(nextId);
  }, []);

  const ownMenuRef = useRef<HTMLElement | null>(null);
  const menuRef = contentRef ?? ownMenuRef;
  // Only one submenu is open at a time, so one ref is enough to let the click
  // handler here know that a click landed in it rather than outside the menu.
  const submenuRef = useRef<HTMLElement | null>(null);

  const pendingOpen = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cancelPendingOpen = useCallback(() => {
    clearTimeout(pendingOpen.current);
    pendingOpen.current = undefined;
  }, []);
  useEffect(() => cancelPendingOpen, [cancelPendingOpen]);

  // The open submenu's dismissal, waiting to see whether the pointer that left
  // is coming back into one of the panels.
  const pendingClose = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cancelPendingClose = useCallback(() => {
    clearTimeout(pendingClose.current);
    pendingClose.current = undefined;
  }, []);
  useEffect(() => cancelPendingClose, [cancelPendingClose]);

  // A menu on its way out takes its submenus with it, so nothing queued for a
  // pointer still has anything to decide: an open landing here would raise a
  // panel over one that is leaving, and a dismissal would swap a nested panel's
  // fade for a fold halfway through its exit.
  useEffect(() => {
    if (!isExiting) return;
    cancelPendingOpen();
    cancelPendingClose();
  }, [isExiting, cancelPendingOpen, cancelPendingClose]);

  // A submenu being dismissed outlives its own state for the length of its
  // exit: closing one deliberately - pressing its header - is a move worth
  // seeing, where being replaced by the next one is not.
  const [closingItemId, setClosingItemId] = useState<string | null>(null);
  const closingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(closingTimer.current), []);
  const openNow = useCallback(
    (nextId: string | null) => {
      cancelPendingOpen();
      if (nextId === null && openItemId !== null) {
        setClosingItemId(openItemId);
        clearTimeout(closingTimer.current);
        closingTimer.current = setTimeout(() => setClosingItemId(null), exitDuration);
      }
      setOpenSubmenu(nextId);
    },
    [openItemId, cancelPendingOpen, setOpenSubmenu],
  );

  const closeSubmenu = useCallback(() => openNow(null), [openNow]);

  // Without a pointer there is no room to hover into a second panel beside the
  // first, so submenus lie over their parent instead - and every row gets more
  // room, since the target is a fingertip.
  const isTouch = !hasPointer;
  const shownItems: InPlaceOrModalMenuItem[] =
    headerItem === undefined
      ? items
      : [
          {
            ...headerItem,
            id: `${id}-header`,
            // No `items`: pressing the header folds this panel back into the
            // one it came from, it does not open anything. Returning `false`
            // is what says "closed the submenu, not the whole menu".
            items: undefined,
            onPress: () => {
              onBack?.();
              return false;
            },
          },
          ...items,
        ];

  // Where the pointer has been, so an item can be told from what direction it
  // was reached - the trail is what the safe triangle is built on.
  const pointerTrail = useRef<Point[]>([]);
  const handlePointerMove = useCallback((point: Point) => {
    const trail = pointerTrail.current;
    trail.push(point);
    if (trail.length > timing.pointerTrailLength) trail.shift();
  }, []);

  const handleHover = useCallback(
    (itemId: string, hasSubmenu: boolean) => {
      // Touch has no hover to show: a tap opens something, and lighting the
      // row it came from only competes with what just appeared over it.
      if (!hasPointer) return;
      const nextId = hasSubmenu ? itemId : null;
      cancelPendingOpen();
      if (nextId === openItemId) {
        setHighlightedItemId(itemId);
        return;
      }
      const submenu = submenuRef.current?.getBoundingClientRect();
      const trail = pointerTrail.current;
      const from = trail[0];
      const to = trail[trail.length - 1];
      const isAiming =
        openItemId !== null &&
        submenu !== undefined &&
        from !== undefined &&
        to !== undefined &&
        isHeadingTo(submenu, from, to);

      if (isAiming) {
        // Crossed on the way to the open submenu: the item is passed over, not
        // visited. Highlighting it here - even briefly - would announce a
        // switch that is not going to happen, so the item is ignored whole and
        // the highlight stays where the pointer is actually going. The timeout
        // is only for a pointer that aims and then stops halfway.
        pendingOpen.current = setTimeout(() => {
          setOpenSubmenu(nextId);
          setHighlightedItemId(itemId);
        }, timing.submenuAimTimeout);
        return;
      }

      setHighlightedItemId(itemId);
      // Nothing open yet: a short rest keeps a submenu from flying open just
      // because the pointer swept past. Something open, and the pointer is not
      // headed for it: it has moved on, so react at once.
      if (openItemId === null) {
        pendingOpen.current = setTimeout(() => setOpenSubmenu(nextId), timing.submenuOpenDelay);
      } else {
        setOpenSubmenu(nextId);
      }
    },
    [hasPointer, openItemId, cancelPendingOpen, setOpenSubmenu],
  );

  const handlePanelPointerEnter = useCallback(() => {
    // Back inside the menu - from a submenu, from the gap between two panels,
    // or from outside altogether. Nothing that was queued for a pointer on its
    // way somewhere else is still owed, in either direction. Passed up as well,
    // so that a parent waiting to dismiss the panel this one hangs from hears
    // that the pointer is still walking the menu.
    cancelPendingOpen();
    cancelPendingClose();
    onPointerEnter?.();
  }, [cancelPendingOpen, cancelPendingClose, onPointerEnter]);

  const handleSubmenuPointerEnter = useCallback(() => {
    // Reached, so this panel is no longer something the pointer opened on its
    // way past. Set before passing the event on, and set here rather than in
    // the panel's own handler, which the pointer coming back into *this* menu
    // calls too. Coming up from a panel further down counts: there is no way
    // into one that does not go through this one.
    hasVisitedSubmenu.current = true;
    handlePanelPointerEnter();
  }, [handlePanelPointerEnter]);

  const handlePanelPointerLeave = useCallback(() => {
    setHighlightedItemId(null);
    pointerTrail.current = [];
    // Whatever was queued was queued for a pointer inside the panel, resting on
    // a row or aiming across it. It is not there any more, so neither is owed.
    cancelPendingOpen();
    // The pointer may only be crossing into this panel's own submenu, which is
    // a sibling in the portal rather than a child: that crossing is this very
    // event, followed by an `enter` on the submenu - and it is that `enter`,
    // wherever in the chain it lands, that calls the dismissal off. A pointer
    // that has really gone never sends one, and the submenu closes.
    //
    // Unless it was walked into: a submenu the pointer only ever opened in
    // passing is in the way and is cleared, while one it went into is where the
    // walk got to and is left alone - opening another is what replaces it.
    if (hasPointer && openItemId !== null && !hasVisitedSubmenu.current) {
      clearTimeout(pendingClose.current);
      pendingClose.current = setTimeout(closeSubmenu, timing.submenuCloseDelay);
    }
    onPointerLeave?.();
  }, [hasPointer, openItemId, cancelPendingOpen, closeSubmenu, onPointerLeave]);

  return items.length === 0 ? null : (
    <InPlaceOrModal
      id={id}
      anchorRef={anchorRef}
      preferredPositions={preferredPositions}
      onExit={onExit}
      isExiting={isExiting}
      exitAnimation={exitAnimation}
      coverAnchor={coverAnchor}
      anchorRect={anchorRect}
      revealRadius={revealRadius}
      // Set back while its own submenu covers it - handled by the panel, whose
      // single `transitionProperty` has to cover the dim and the reveal at once.
      // Dropped as soon as the submenu is dismissed rather than when it has
      // finished leaving, so the panel comes back forward *while* the submenu
      // folds away. Held until then and it would snap back afterwards, which
      // reads as no animation at all. Also dropped when the whole menu is on
      // its way out, or the panel would leave still washed out.
      isDimmed={isTouch && openItemId !== null && !isExiting}
      shadow={menuShadow}
      // Light surfaces hold their white and lift their black; dark ones do the
      // mirror image, which is plain brightness.
      dimFilter={theme.mode === "dark" ? "brightness(0.85)" : washOut(0.15)}
      skipRefs={[...(skipRefs ?? []), submenuRef]}
      contentRef={menuRef}
      dataSet={dataSet}
      onPointerEnter={handlePanelPointerEnter}
      onPointerLeave={handlePanelPointerLeave}
      onPointerMove={handlePointerMove}
      style={[
        (isTouch ? touchStyles : styles).menu,
        dataSet ? undefined : theme.styles.backAlt,
        menuStyle,
      ]}
    >
      {/* Deliberately not `role="menu"`: that role promises arrow-key
          navigation, and this is a list of ordinary links and buttons. */}
      <View style={(isTouch ? touchStyles : styles).scroll}>
        {shownItems.map((item, index) => (
          <MenuItem
            key={item.id}
            parentId={id}
            item={item}
            isHeader={headerItem !== undefined && index === 0}
            selectedItemIds={selectedItemIds}
            onExit={onExit}
            // The open submenu's item stays lit only while nothing else is
            // under the pointer, so two items are never lit at once.
            isHighlighted={
              hasPointer &&
              (highlightedItemId === item.id ||
                (highlightedItemId === null && openItemId === item.id))
            }
            onHover={handleHover}
            isOpen={openItemId === item.id}
            isClosing={closingItemId === item.id}
            openNow={openNow}
            onSubmenuPointerEnter={handleSubmenuPointerEnter}
            onSubmenuPointerLeave={handlePanelPointerLeave}
            onCloseSubmenu={closeSubmenu}
            isTouch={isTouch}
            submenuPreferredPositions={submenuPreferredPositions}
            menuStyle={menuStyle}
            menuDataSet={dataSet}
            parentMenuRef={menuRef}
            submenuRef={submenuRef}
            isExiting={isExiting}
          />
        ))}
      </View>
    </InPlaceOrModal>
  );
}
