"use client";

import * as React from "react";
import { StyleSheet, Text } from "react-native";

import {
  A,
  BlockQuote,
  Br,
  Code,
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
  Ul,
} from "@/components/HtmlElements";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import SpacedView from "@/react-multiversal/SpacedView";

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
  },
  componentName: {
    fontFamily: "monospace",
    color: "#666",
  },
});

export default function DesignSystem() {
  return (
    <WebsiteWrapper>
      <Container>
        <SpacedView gap="m">
          <H1>Design System</H1>
          <P>
            This page showcases all available HTML components and their
            variations.
          </P>

          <H2>Typography</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<H1 />"}</Text>
            <H1>Heading Level 1</H1>
          </SpacedView>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<H2 />"}</Text>
            <H2>Heading Level 2</H2>
          </SpacedView>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<H3 />"}</Text>
            <H3>Heading Level 3</H3>
          </SpacedView>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<H4 />"}</Text>
            <H4>Heading Level 4</H4>
          </SpacedView>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<H5 />"}</Text>
            <H5>Heading Level 5</H5>
          </SpacedView>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<H6 />"}</Text>
            <H6>Heading Level 6</H6>
          </SpacedView>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<P />"}</Text>
            <P>
              This is a paragraph component. It can contain multiple lines of
              text and will maintain proper spacing. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </P>
          </SpacedView>

          <H2>Links</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<A />"}</Text>
            <P>
              This is a paragraph with a{" "}
              <A href="https://example.com">link to example.com</A> in it.
            </P>
          </SpacedView>

          <H2>Lists</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<Ul /> and <Li />"}</Text>
            <Ul>
              <Li>First item in the list</Li>
              <Li>Second item in the list</Li>
              <Li>
                Third item with a <A href="#">link</A>
              </Li>
              <Li bullet="→">Custom bullet point</Li>
            </Ul>
          </SpacedView>

          <H2>Quotes</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<BlockQuote />"}</Text>
            <BlockQuote>
              This is a blockquote. It can contain multiple lines and will be
              styled appropriately with a left border and different typography.
            </BlockQuote>
          </SpacedView>

          <H2>Code</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<Code />"}</Text>
            <Code>{`function example() {
  return "This is a code block";
}`}</Code>
          </SpacedView>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<Pre />"}</Text>
            <Pre>
              <Code>
                {`function example() {
  return "This is a code block";
}`}
              </Code>
            </Pre>
          </SpacedView>

          <H2>Images</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<Image />"}</Text>
            <Image src="/favicon-32x32.png" alt="Example image" />
          </SpacedView>

          <H2>Horizontal Rule</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<Hr />"}</Text>
            <P>Content above the horizontal rule</P>
            <Hr />
            <P>Content below the horizontal rule</P>
          </SpacedView>

          <H2>Line Break</H2>

          <SpacedView style={styles.section}>
            <Text style={styles.componentName}>{"<Br />"}</Text>
            <P>
              Line 1<Br />
              Line 2<Br />
              Line 3
            </P>
          </SpacedView>
        </SpacedView>
      </Container>
    </WebsiteWrapper>
  );
}
