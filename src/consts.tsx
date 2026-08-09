import type { Localized } from "@/i18n";
import SVGAppStoreNpm from "@/svgs/components/SVGAppStoreNpm";
import SVGEllipsisMessage from "@/svgs/components/SVGEllipsisMessage";
import SVGEllipsisMessageFill from "@/svgs/components/SVGEllipsisMessageFill";
import SVGMenuBlog from "@/svgs/components/SVGMenuBlog";
import SVGMenuHome from "@/svgs/components/SVGMenuHome";
import SVGMenuHomeFill from "@/svgs/components/SVGMenuHomeFill";
import SVGMenuResume from "@/svgs/components/SVGMenuResume";
import SVGMenuResumeFill from "@/svgs/components/SVGMenuResumeFill";
import SVGMenuTalk from "@/svgs/components/SVGMenuTalk";
import SVGPutaindecode from "@/svgs/components/SVGPutaindecode";
import SVGSocialBsky from "@/svgs/components/SVGSocialBsky";
import SVGSocialDribbble from "@/svgs/components/SVGSocialDribbble";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import SVGSocialX from "@/svgs/components/SVGSocialX";
import SVGTextMenu from "@/svgs/components/SVGTextMenu";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export const website = "https://moox.io";

export const footerAnchor = "links";

export const visualUrl = (url: string) => {
  return url.replace(/^(?:https?:\/\/(www\.)?)/i, "");
};
export const sendStringAsMailString = (
  send: string,
  visual: boolean = false,
) => {
  return visual ? send.replace("/", " @ ") : send.replace("/", "@");
};

export const ind = "33";
export const socials = {
  vcf: {
    value: "MaximeThirouin.vcf",
    color: "#f0506e",
    colorAlt: "#b00d2b",
  },
  text: {
    value: "678135439",
    // iMessage blue color
    color: "#007AFF",
    // iMessage green color
    colorAlt: "#1bb140",
  },
  call: {
    value: "678135439",
    // Message icon colors
    color: "#63d352",
    colorAlt: "#3a7a2e",
  },
  send: {
    value: "hello/moox.io",
    // Mail app icon colors
    color: "#3770EB",
    colorAlt: "#5DC5F8",
  },
  github: {
    value: "https://github.com/MoOx",
    color: "#8839A9",
    colorAlt: "#552E87",
  },
  linkedin: {
    value: "https://www.linkedin.com/in/MaxThirouin",
    color: "#0a66c2",
    colorAlt: "#25437C",
  },
  x: {
    value: "https://x.com/MoOx",
    color: "#666",
    colorAlt: "#000",
  },
  bsky: {
    value: "https://bsky.app/profile/moox.io",
    color: "#367BF5",
    colorAlt: "#6EB2F6",
  },
  dribbble: {
    value: "https://dribbble.com/MoOx",
    color: "#ea4c89",
    colorAlt: "#ec5e95",
  },
  npm: {
    value: "https://www.npmjs.com/~moox",
    // npm's own red, the one inside `svgs/app-store-npm.svg`. It used to be the
    // JavaScript yellow, back when the npm card wore the JavaScript logo; the
    // card now wears npm's, and a yellow ring around a red logo read as a bug.
    color: "#cb3837",
    colorAlt: "#9b2a29",
  },
  youtube: {
    value: "https://www.youtube.com/channel/UCn_edMm2hg7k58E4eQGU7pA",
    color: "#ff0033",
    colorAlt: "#fff",
  },
  putaindecode: {
    value: "https://putaindecode.io",
    color: "#E51D58",
    colorAlt: "#CC0613",
  },
  booking: {
    value: "https://cal.com/max-t/call",
    // The site's own indigo pair (`colors.indigo` → `textIndigoAlt`), so the
    // booking card reads as a moox.io surface rather than as cal.com's brand.
    color: "#4F3DFF",
    colorAlt: "#792F93",
  },
};

type LinkWithIcon = {
  href: string;
  /** Localized menu label; the record key is the English fallback. */
  label?: Localized;
  alt?: string;
  icon: (props: LinksIconProps) => ReactNode;
  isActive?: (currentLink: string | null, link: string) => boolean;
};
type LinksWithIcon = {
  [key: string]: LinkWithIcon;
};
type LinksIconProps = {
  size: number;
  color: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
};
export const internalLinks: LinksWithIcon = {
  Home: {
    label: { en: "Home", fr: "Accueil" },
    href: "/",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuHomeFill
          style={style}
          width={size}
          height={size}
          color={color}
        />
      ) : (
        <SVGMenuHome style={style} width={size} height={size} color={color} />
      ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
  Resume: {
    label: { en: "Resume", fr: "CV" },
    href: "/resume",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuResumeFill
          style={style}
          width={size}
          height={size}
          color={color}
        />
      ) : (
        <SVGMenuResume style={style} width={size} height={size} color={color} />
      ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
  Contact: {
    label: { en: "Contact", fr: "Contact" },
    href: "/contact",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGEllipsisMessageFill
          style={style}
          width={size}
          height={size}
          color={color}
        />
      ) : (
        <SVGEllipsisMessage
          style={style}
          width={size}
          height={size}
          color={color}
        />
      ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
  More: {
    label: { en: "More", fr: "Plus" },
    href: "#" + footerAnchor,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGTextMenu style={style} width={size} height={size} color={color} />
    ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
};

export const internalLinks2: LinksWithIcon = {
  Blog: {
    label: { en: "Blog", fr: "Blog" },
    href: "/blog",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGMenuBlog style={style} width={size} height={size} color={color} />
    ),
  },
  Talks: {
    label: { en: "Talks", fr: "Conférences" },
    href: "/talks",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGMenuTalk style={style} color={color} width={size} height={size} />
    ),
    alt: "",
  },
};

export const allInternalLinks = { ...internalLinks, ...internalLinks2 };

export const socialLinks: LinksWithIcon = {
  LinkedIn: {
    alt: "@Max on LinkedIn",
    href: socials.linkedin.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialLinkedin
        style={style}
        color={color}
        width={size}
        height={size}
      />
    ),
  },
  GitHub: {
    alt: "@MoOx on GitHub",
    href: socials.github.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialGithub style={style} color={color} width={size} height={size} />
    ),
  },
  BlueSky: {
    alt: "@moox.io on bsky.app",
    href: socials.bsky.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialBsky style={style} color={color} width={size} height={size} />
    ),
  },
  X: {
    alt: "@MoOx on X",
    href: socials.x.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialX style={style} color={color} width={size} height={size} />
    ),
  },
};
export const socialLinks2 = {
  Dribbble: {
    alt: "@MoOx on Dribbble",
    href: socials.dribbble.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialDribbble
        style={style}
        color={color}
        width={size}
        height={size}
      />
    ),
  },
  /*
  "Youtube": {
    alt: "@MoOx on Youtube",
    href: socials.youtube.value,
    icon: ({ style, size, color }: LinksIconProps) =>
      <SVGSocialYoutube style={style} color={color} width={size} height={size} />,
  },
 */
};

export const moreLinks: LinksWithIcon = {
  npm: {
    alt: "@MoOx on npm",
    href: socials.npm.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGAppStoreNpm style={style} color={color} width={size} height={size} />
    ),
  },
};
export const moreLinks2: LinksWithIcon = {
  "putaindecode!": {
    href: socials.putaindecode.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGPutaindecode style={style} color={color} width={size} height={size} />
    ),
  },
};

export const menuBarLinks: LinksWithIcon = {
  ...internalLinks,
  // LinkedIn: {
  //   alt: "@Maxime on LinkedIn",
  //   href: socials.linkedin.value,
  //   icon: ({ style, size, color }: LinksIconProps) => (
  //     <SVGContact style={style} color={color} width={size} height={size} />
  //   ),
  // },
};
