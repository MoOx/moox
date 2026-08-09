import { ResumeItem, ResumeItemSource } from "@/api";
import { l, Lang, langs, Localized } from "@/i18n";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import Box from "@/react-multiversal/Box";
import { alpha, useTheme } from "@/styles";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

/**
 * Dev-only affordance on the timeline cards: copies an entry as plain text
 * (title, pitch, body - blank line between each), in either language, to
 * paste into a LinkedIn experience. Never rendered in a production build, so
 * the call site guards it with `import.meta.env.DEV`.
 *
 * The timeline items are already resolved to the page's language (see
 * `fetchResume`), so both languages have to come back from the unlocalized
 * index - fetched once, on the first copy.
 */

type MdJsonNode = { tag: string; children?: (MdJsonNode | string)[] };

const isMdJsonNode = (node: unknown): node is MdJsonNode =>
  typeof node === "object" && node !== null && "tag" in node;

/** Flattens a node to one line: markdown hard-wraps, LinkedIn does not. */
const inlineText = (node: MdJsonNode | string): string =>
  typeof node === "string"
    ? node.replace(/\s+/g, " ")
    : (node.children ?? []).map(inlineText).join("");

type Block = { text: string; bullet: boolean };

const blocksOf = (node: unknown, blocks: Block[] = []): Block[] => {
  if (!isMdJsonNode(node)) return blocks;
  switch (node.tag) {
    // Containers - only their children are blocks.
    case "div":
    case "ul":
    case "ol":
    case "blockquote":
      node.children?.forEach((child) => blocksOf(child, blocks));
      break;
    case "hr":
      break;
    default: {
      const text = inlineText(node).trim();
      if (text) blocks.push({ text, bullet: node.tag === "li" });
    }
  }
  return blocks;
};

/** Markdown-as-JSON body → plain text, paragraphs apart, bullets together. */
const mdJsonToText = (body: unknown): string =>
  blocksOf(body).reduce(
    (text, block, index, all) =>
      text +
      (index === 0 ? "" : block.bullet && all[index - 1]?.bullet ? "\n" : "\n\n") +
      (block.bullet ? `- ${block.text}` : block.text),
    "",
  );

/** What lands in the clipboard: title, pitch and body, in one language. */
export const resumeEntryAsText = (item: ResumeItemSource, lang: Lang) =>
  [
    l(item.title, lang) + ".\n",
    l(item.pitch, lang),
    item.body ? mdJsonToText(l(item.body as Localized<unknown>, lang)) : undefined,
  ]
    .filter(Boolean)
    .join("\n");

let sourcesPromise: Promise<ResumeItemSource[]> | undefined;

const resumeSources = (): Promise<ResumeItemSource[]> =>
  (sourcesPromise ??= fetch("/content/resume.json").then((response) => response.json()));

export const DevCopyResumeEntry = ({ item }: { item: ResumeItem }) => {
  const theme = useTheme();
  const [copied, setCopied] = useState<Lang | undefined>();

  const copy = async (lang: Lang) => {
    const source = (await resumeSources()).find((entry) => entry.slug === item.slug);
    if (!source) {
      console.error(`DevCopyResumeEntry: no source entry for ${item.slug}`);
      return;
    }
    // The web clipboard directly: `@react-native-clipboard/clipboard` resolves
    // to its `.web` build, whose export is named, so its default import has no
    // `setString` here.
    await navigator.clipboard.writeText(resumeEntryAsText(source, lang));
    setCopied(lang);
    setTimeout(() => setCopied(undefined), 1000);
  };

  return (
    <View
      style={{
        position: "absolute",
        right: size("s"),
        bottom: size("s"),
        zIndex: 1,
        flexDirection: "row",
        gap: size("xxs"),
      }}
    >
      {langs.map((lang) => (
        <Pressable key={lang} onPress={() => copy(lang)} style={{ cursor: "pointer" }}>
          <Box
            px="xs"
            py="xxxs"
            style={{
              alignItems: "center",
              minWidth: 32,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: alpha(theme.colors.textFlashy2, 0.35),
              backgroundColor: theme.dynamicColors.back,
            }}
          >
            <Text style={[fontStyles.iosEm.caption2, { color: theme.dynamicColors.inkFlashy }]}>
              {copied === lang ? "✓" : lang.toUpperCase()}
            </Text>
          </Box>
        </Pressable>
      ))}
    </View>
  );
};
