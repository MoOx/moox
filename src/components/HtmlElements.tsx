import { Size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import Box from "@/react-multiversal/Box";
import { useTheme } from "@/styles";
import { ReactNode } from "react";
import { Platform, StyleSheet, Text, TextProps, View } from "react-native";
import { match } from "ts-pattern";

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
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace",
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
  children?: ReactNode;
}) => {
  const theme = useTheme();
  return (
    <LinkText href={href ?? ""} underlineOnFocus={true} style={[theme.styles.textMainDark, style]}>
      {children}
    </LinkText>
  );
};

type HeadingProps = {
  id?: string;
  style?: any;
  textStyle?: any;
  children?: ReactNode;
  level?: number;
};
export const Heading = ({ id, style, textStyle, children, level = 1 }: HeadingProps) => {
  const theme = useTheme();
  return (
    <Box
      id={id}
      role="heading"
      aria-level={level}
      py={
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
      <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text, textStyle]}>{children}</Text>
    </Box>
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
  children?: ReactNode;
}) => (
  <Box py="s" style={style}>
    <TextNode role="paragraph" style={textStyle}>
      {children}
    </TextNode>
  </Box>
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
      <img src={src ?? ""} className={className} alt={alt ?? ""} style={{ maxWidth: "100%" }} />
    );
  }
  return null;
};

export const Ul = ({ style, children }: { style?: any; children?: ReactNode }) => (
  <Box role="list" py="l" style={style}>
    {children}
  </Box>
);

export const Li = ({
  style,
  bullet = "•",
  children,
}: {
  style?: any;
  bullet?: string;
  children?: ReactNode;
}) => (
  <View role="listitem" style={styles.liWrapper}>
    <Box px="s">
      <TextNode style={styles.liBullet}>{bullet}</TextNode>
    </Box>
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
  children?: ReactNode;
}) => (
  <Box role="blockquote" px="l" style={[styles.blockQuote, style]}>
    <Text style={[styles.blockQuoteText, textStyle]}>{children}</Text>
  </Box>
);

export const Pre = ({ style, children }: { style?: any; children?: ReactNode }) => (
  <Box py="m" style={style}>
    <pre>{children}</pre>
  </Box>
);

export const CodeBlock = ({ style, children }: { style?: any; children?: ReactNode }) => {
  const theme = useTheme();
  return (
    <Box p="m" style={[styles.codeBlock, style]}>
      <Text role="code" style={[styles.codeBlockText, theme.styles.text]}>
        {children}
      </Text>
    </Box>
  );
};

export const Code = ({ style, children }: { style?: any; children?: ReactNode }) => {
  const theme = useTheme();
  return (
    <Text role="code" style={[styles.codeText, theme.styles.text, style]}>
      {children}
    </Text>
  );
};

export const Br = () => <Text>{"\n"}</Text>;

export const Hr = () => (
  <Box py="l">
    <View style={styles.hr} />
  </Box>
);

export const TextNode = ({
  children,
  style,
  role,
}: {
  children: ReactNode;
  style?: any;
  role?: TextProps["role"];
}) => {
  const theme = useTheme();
  return (
    <Text
      role={role}
      style={[fontStyles.ios.body, { lineHeight: 26 }, theme.styles.textDark, style]}
    >
      {children}
    </Text>
  );
};
