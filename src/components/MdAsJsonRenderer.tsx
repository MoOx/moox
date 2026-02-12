import { Fragment, ReactElement, ReactNode, createElement } from "react";
import {
  A,
  BlockQuote,
  Br,
  Code,
  CodeBlock,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Hr,
  Image,
  Li,
  P,
  Pre,
  TextNode,
  Ul,
} from "./HtmlElements";

type HtmlProps = {
  allowfullscreen?: string;
  class?: string;
  className?: string;
  datetime?: string;
  for?: string;
  frameborder?: string;
  frameBorder?: string;
  href?: string;
  id?: string;
  name?: string;
  src?: string;
};

type MdAsJsonType =
  | { type: "String"; value: string }
  | {
      type: "Element";
      tag: string;
      props: HtmlProps | null;
      children: MdAsJsonType[];
    }
  | { type: "Empty" };

interface MdJsonNode {
  tag: string;
  props: HtmlProps | null;
  children?: MdJsonNode[];
}

const jsonTreeToTs = (jsChild: string | MdJsonNode): MdAsJsonType => {
  if (typeof jsChild === "string") {
    return { type: "String", value: jsChild };
  }

  if (typeof jsChild === "object" && jsChild !== null) {
    const {
      class: className,
      frameborder: frameBorder,
      ...rest
    } = jsChild.props ?? {};
    return {
      type: "Element",
      tag: jsChild.tag,
      props: {
        className,
        frameBorder,
        ...rest,
      },
      children: jsChild.children?.map(jsonTreeToTs) || [],
    };
  }

  return { type: "Empty" };
};

const cleanupNewlines = (s: string): string => s.replace(/\n/g, " ");

const optionalCleanString = (
  s: string,
  keepNewlines: boolean,
): string | null => {
  const sc = keepNewlines ? s : cleanupNewlines(s);
  return sc === "" || (sc === " " && s !== sc) ? null : sc;
};

const inlineBreakIfParentIsInline = (
  parentTag: string,
): ReactElement | null => {
  switch (parentTag) {
    case "li":
      return <Br />;
    default:
      return null;
  }
};

const renderChild = (
  parentTag: string,
  index: number,
  child: MdAsJsonType,
  keepNewlines: boolean = false,
): ReactNode => {
  // console.log("renderChild", parentTag, index, child);
  const key = index.toString();

  const renderChildren = (
    parentTag: string,
    children: MdAsJsonType[],
    keepNewlines: boolean,
  ) =>
    children.length > 0
      ? children.map((child, i) =>
          renderChild(parentTag, i, child, keepNewlines),
        )
      : null;

  switch (child.type) {
    case "String": {
      const string = child.value;
      switch (parentTag) {
        case "ol":
        case "ul":
          return null;
        case "li": {
          const cleaned = optionalCleanString(string, keepNewlines);
          return cleaned ? <TextNode key={key}>{cleaned}</TextNode> : null;
        }
        default: {
          return optionalCleanString(string, keepNewlines);
        }
      }
    }

    case "Element": {
      const { tag, props, children } = child;

      switch (tag) {
        case "a":
          return (
            <A key={key} href={props?.href} {...props}>
              {renderChildren(tag, children, keepNewlines)}
            </A>
          );
        case "h1":
          return (
            <H1 key={key} id={props?.id} {...props}>
              {renderChildren(tag, children, keepNewlines)}
            </H1>
          );
        case "h2":
          return (
            <H2 key={key} id={props?.id} {...props}>
              {renderChildren(tag, children, keepNewlines)}
            </H2>
          );
        case "h3":
          return (
            <H3 key={key} id={props?.id} {...props}>
              {renderChildren(tag, children, keepNewlines)}
            </H3>
          );
        case "h4":
          return (
            <H4 key={key} id={props?.id} {...props}>
              {renderChildren(tag, children, keepNewlines)}
            </H4>
          );
        case "h5":
          return (
            <H5 key={key} id={props?.id} {...props}>
              {renderChildren(tag, children, keepNewlines)}
            </H5>
          );
        case "h6":
          return (
            <H6 key={key} id={props?.id} {...props}>
              {renderChildren(tag, children, keepNewlines)}
            </H6>
          );
        case "p":
          return <P key={key}>{renderChildren(tag, children, keepNewlines)}</P>;
        case "img":
          return (
            <Image key={key} src={props?.src} className={props?.class} alt="" />
          );
        case "ol":
        case "ul":
          return (
            <Fragment key={key}>
              {inlineBreakIfParentIsInline(parentTag)}
              <Ul>{renderChildren(tag, children, keepNewlines)}</Ul>
            </Fragment>
          );
        case "li":
          return (
            <Li key={key}>{renderChildren(tag, children, keepNewlines)}</Li>
          );
        case "blockquote":
          return (
            <BlockQuote key={key}>
              {renderChildren(tag, children, keepNewlines)}
            </BlockQuote>
          );
        case "pre":
          return <Pre key={key}>{renderChildren(tag, children, true)}</Pre>;
        case "code":
          return parentTag === "pre" ? (
            <CodeBlock key={key}>
              {renderChildren(tag, children, keepNewlines)}
            </CodeBlock>
          ) : (
            <Code key={key}>{renderChildren(tag, children, keepNewlines)}</Code>
          );
        case "br":
          return <Br key={key} />;
        case "hr":
          return <Hr key={key} />;
        default:
          return createElement(
            tag,
            props,
            renderChildren(tag, children, keepNewlines),
          );
      }
    }

    case "Empty":
      return null;
  }
};

export default function MdAsJsonRenderer({ body }: { body: MdJsonNode }) {
  const tree = jsonTreeToTs(body);
  return renderChild("", 0, tree);
}
