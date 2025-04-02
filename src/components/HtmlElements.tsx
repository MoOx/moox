import * as React from "react";
import { Platform, StyleSheet, Text, TextProps, View } from "react-native";
import { match } from "ts-pattern";

import { useTheme } from "@/app/styles";
import { Size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import SpacedView from "@/react-multiversal/SpacedView";

const styles = StyleSheet.create({
  blockQuote: {
    borderLeftColor: "#9ca0a3",
    borderLeftWidth: 3,
  },
  blockQuoteText: {
    color: "#515355",
  },
  codeBlock: {
    backgroundColor: "rgba(128,128,128,0.05)",
    borderWidth: 1,
    borderColor: "rgba(128,128,128,0.1)",
    borderRadius: 2,
    whiteSpace: "pre",
    overflow: "auto",
    maxWidth: "100%",
  },
  codeBlockText: {
    whiteSpace: "pre",
    fontFamily:
      "SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace",
  },
  codeText: {
    backgroundColor: "rgba(128,128,128,0.05)",
    borderWidth: 1,
    borderColor: "rgba(128,128,128,0.1)",
    borderRadius: 2,
  },
  hr: {
    height: 4,
    backgroundColor: "#eee",
  },
  liWrapper: {
    flexDirection: "row",
  },
  liBullet: {
    alignSelf: "flex-start",
  },
});

export const A = ({
  href,
  style,
  children,
}: {
  href?: string;
  style?: any;
  children?: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <LinkText
      href={href ?? ""}
      underlineOnFocus={true}
      style={[theme.styles.textMainDark, style]}
    >
      {children}
    </LinkText>
  );
};

type HeadingProps = {
  id?: string;
  style?: any;
  textStyle?: any;
  children?: React.ReactNode;
  level?: number;
};
export const Heading = ({
  id,
  style,
  textStyle,
  children,
  level = 1,
}: HeadingProps) => {
  const theme = useTheme();
  return (
    <SpacedView
      id={id}
      role="heading"
      aria-level={level}
      vertical={
        match(level)
          .with(1, () => "xl")
          .with(2, () => "l")
          .with(3, () => "m")
          .with(4, () => "s")
          .with(5, () => "xs")
          .otherwise(() => "xxs") as Size
      }
      style={style}
    >
      <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text, textStyle]}>
        {children}
      </Text>
    </SpacedView>
  );
};

export const H1 = (props: HeadingProps) => <Heading {...props} level={1} />;
export const H2 = (props: HeadingProps) => <Heading {...props} level={2} />;
export const H3 = (props: HeadingProps) => <Heading {...props} level={3} />;
export const H4 = (props: HeadingProps) => <Heading {...props} level={4} />;
export const H5 = (props: HeadingProps) => <Heading {...props} level={5} />;
export const H6 = (props: HeadingProps) => <Heading {...props} level={6} />;

export const P = ({
  style,
  textStyle,
  children,
}: {
  style?: any;
  textStyle?: any;
  children?: React.ReactNode;
}) => (
  <SpacedView vertical="s" style={style}>
    <TextNode role="paragraph" style={textStyle}>
      {children}
    </TextNode>
  </SpacedView>
);

export const Image = ({
  src,
  className,
  alt,
}: {
  src?: string;
  className?: string;
  alt?: string;
}) => {
  if (Platform.OS === "web") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src ?? ""}
        className={className}
        alt={alt ?? ""}
        style={{ maxWidth: "100%" }}
      />
    );
  }
  return null;
};

export const Ul = ({
  style,
  children,
}: {
  style?: any;
  children?: React.ReactNode;
}) => (
  <SpacedView role="list" vertical="l" style={style}>
    {children}
  </SpacedView>
);

export const Li = ({
  style,
  bullet = "•",
  children,
}: {
  style?: any;
  bullet?: string;
  children?: React.ReactNode;
}) => (
  <View role="listitem" style={styles.liWrapper}>
    <SpacedView horizontal="s">
      <TextNode style={styles.liBullet}>{bullet}</TextNode>
    </SpacedView>
    <TextNode style={style}>{children}</TextNode>
  </View>
);

export const BlockQuote = ({
  style,
  textStyle,
  children,
}: {
  style?: any;
  textStyle?: any;
  children?: React.ReactNode;
}) => (
  <SpacedView
    role="blockquote"
    horizontal="l"
    style={[styles.blockQuote, style]}
  >
    <Text style={[styles.blockQuoteText, textStyle]}>{children}</Text>
  </SpacedView>
);

export const Pre = ({
  style,
  children,
}: {
  style?: any;
  children?: React.ReactNode;
}) => (
  <SpacedView vertical="m" style={style}>
    <pre>{children}</pre>
  </SpacedView>
);

export const CodeBlock = ({
  style,
  children,
}: {
  style?: any;
  children?: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <SpacedView horizontal="m" vertical="m" style={[styles.codeBlock, style]}>
      <Text role="code" style={[styles.codeBlockText, theme.styles.text]}>
        {children}
      </Text>
    </SpacedView>
  );
};

export const Code = ({
  style,
  children,
}: {
  style?: any;
  children?: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Text role="code" style={[styles.codeText, theme.styles.text, style]}>
      {children}
    </Text>
  );
};

export const Br = () => <Text>{"\n"}</Text>;

export const Hr = () => (
  <SpacedView vertical="l">
    <View style={styles.hr} />
  </SpacedView>
);

export const TextNode = ({
  children,
  style,
  role,
}: {
  children: React.ReactNode;
  style?: any;
  role?: TextProps["role"];
}) => {
  const theme = useTheme();
  return (
    <Text
      role={role}
      style={[
        fontStyles.ios.body,
        { lineHeight: 26 },
        theme.styles.textDark,
        style,
      ]}
    >
      {children}
    </Text>
  );
};
