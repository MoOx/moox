import { StyleProp, ViewStyle } from "react-native";

import SVGAppStoreNpm from "@/svgs/components/SVGAppStoreNpm";
import SVGLine3Horizontal from "@/svgs/components/SVGLine3Horizontal";
import SVGMenuBlog from "@/svgs/components/SVGMenuBlog";
import SVGMenuContact from "@/svgs/components/SVGMenuContact";
import SVGMenuContactFill from "@/svgs/components/SVGMenuContactFill";
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

export const footerAnchor = "links";

export const visualUrl = (url: string) => {
  return url.replace(/^(?:https?:\/\/(www\.)?)/i, "");
};
export const sendStringAsMailString = (
  send: string,
  visual: boolean = false
) => {
  return visual ? send.replace("/", " @ ") : send.replace("/", "@");
};

export const socials = {
  ind: "33",
  call: "678135439",
  send: "hello/moox.io",
  github: "https://github.com/MoOx",
  linkedin: "https://www.linkedin.com/in/MaxThirouin",
  x: "https://x.com/MoOx",
  bsky: "https://bsky.app/profile/moox.io",
  dribbble: "https://dribbble.com/MoOx",
  npm: "https://www.npmjs.com/~moox",
  putaindecode: "https://putaindecode.io",
  youtube: "https://www.youtube.com/channel/UCn_edMm2hg7k58E4eQGU7pA",
};

type LinkWithIcon = {
  href: string;
  alt?: string;
  icon: React.FC<LinksIconProps>;
  isActive?: (currentLink: string, link: string) => boolean;
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
    href: "/",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuHomeFill
          style={style}
          width={size}
          height={size}
          fill={color}
        />
      ) : (
        <SVGMenuHome style={style} width={size} height={size} fill={color} />
      ),
    isActive: (currentLink: string, link: string) => currentLink === link,
  },
  Resume: {
    href: "/resume",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuResumeFill
          style={style}
          width={size}
          height={size}
          fill={color}
        />
      ) : (
        <SVGMenuResume style={style} width={size} height={size} fill={color} />
      ),
    isActive: (currentLink: string, link: string) => currentLink === link,
  },
  Contact: {
    href: "/contact",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuContactFill
          style={style}
          width={size}
          height={size}
          fill={color}
        />
      ) : (
        <SVGMenuContact style={style} width={size} height={size} fill={color} />
      ),
    isActive: (currentLink: string, link: string) => currentLink === link,
  },
  More: {
    href: "#" + footerAnchor,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGLine3Horizontal
        style={style}
        width={size}
        height={size}
        fill={color}
      />
    ),
    isActive: (currentLink: string, link: string) => currentLink === link,
  },
};

export const internalLinks2: LinksWithIcon = {
  Blog: {
    href: "/blog",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGMenuBlog style={style} width={size} height={size} fill={color} />
    ),
  },
  Talks: {
    href: "/talks",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGMenuTalk style={style} fill={color} width={size} height={size} />
    ),
    alt: "",
  },
};

export const allInternalLinks = { ...internalLinks, ...internalLinks2 };

export const socialLinks: LinksWithIcon = {
  LinkedIn: {
    alt: "@Max on LinkedIn",
    href: socials.linkedin,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialLinkedin
        style={style}
        fill={color}
        width={size}
        height={size}
      />
    ),
  },
  GitHub: {
    alt: "@MoOx on GitHub",
    href: socials.github,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialGithub style={style} fill={color} width={size} height={size} />
    ),
  },
  BlueSky: {
    alt: "@moox.io on bsky.app",
    href: socials.bsky,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialBsky style={style} fill={color} width={size} height={size} />
    ),
  },
  X: {
    alt: "@MoOx on X",
    href: socials.x,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialX style={style} fill={color} width={size} height={size} />
    ),
  },
};
export const socialLinks2 = {
  Dribbble: {
    alt: "@MoOx on Dribbble",
    href: socials.dribbble,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialDribbble
        style={style}
        fill={color}
        width={size}
        height={size}
      />
    ),
  },
  /*
  "Youtube": {
    alt: "@MoOx on Youtube",
    href: socials.youtube,
    icon: ({ style, size, color }: LinksIconProps) =>
      <SVGSocialYoutube style={style} fill={color} width={size} height={size} />,
  },
 */
};

export const moreLinks: LinksWithIcon = {
  npm: {
    alt: "@MoOx on npm",
    href: "https://www.npmjs.com/~moox",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGAppStoreNpm style={style} fill={color} width={size} height={size} />
    ),
  },
};
export const moreLinks2: LinksWithIcon = {
  "putaindecode!": {
    href: "https://putaindecode.io",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGPutaindecode style={style} fill={color} width={size} height={size} />
    ),
  },
};

export const menuBarLinks: LinksWithIcon = {
  ...internalLinks,
  // LinkedIn: {
  //   alt: "@Maxime on LinkedIn",
  //   href: socials.linkedin,
  //   icon: ({ style, size, color }: LinksIconProps) => (
  //     <SVGContact style={style} fill={color} width={size} height={size} />
  //   ),
  // },
};
