import fs from "fs";
import path from "path";

export type ContentItem = {
  slug: string;
  title: string;
  date?: string;
  body?: any;
};

export type ResumeItem = ContentItem & {
  company: string;
  dateStart: string;
  dateEnd?: string;
  wip?: boolean;
  description?: string;
  hashtags: string[];
  image?: string;
  links?: Array<{
    title: string;
    url: string;
  }>;
  url?: string;
};

export type BlogPost = ContentItem & {
  lang?: string;
};

export type Talk = ContentItem & {
  conference?: string;
  lang?: string;
  slides?: string;
  slidesEmbed?: string;
  video?: string;
  videoEmbed?: string;
};

export type ContentType = "blog" | "resume" | "talks";

export type Content<T> = T & {
  slug: string;
  date?: string;
};

export const getOne = <T,>(
  filename: string,
  contentType: ContentType,
): Content<T> | null => {
  const fullPath = path.join(process.cwd(), "content", contentType, filename);

  if (fs.existsSync(fullPath)) {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return {
      slug: contentType + "/" + filename.replace(/\.json$/, ""),
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      ...(JSON.parse(fileContents) as T),
    };
  } else {
    return null;
  }
};

export const getAll = <T,>(contentType: ContentType): Content<T>[] => {
  const dirPath = path.join(process.cwd(), "content", contentType);
  const filenames = fs.readdirSync(dirPath);

  return filenames
    .filter((file) => file.endsWith(".json"))
    .reduce((acc: Content<T>[], filename) => {
      const content = getOne<T>(filename, contentType);
      if (content) {
        acc.push(content);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
};
