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

export type ContentTypeMap = {
  blog: BlogPost;
  resume: ResumeItem;
  talks: Talk;
};

function sortByDate<T extends ContentItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

async function readJson<T>(urlPath: string): Promise<T> {
  if (typeof window === "undefined") {
    // SSR/prerender: read from filesystem
    const fs = await import("node:fs");
    const path = await import("node:path");
    // During prerender, built files are in dist/client/
    // During dev, files are in public/
    const candidates = [
      path.join(process.cwd(), "dist", "client", urlPath),
      path.join(process.cwd(), "public", urlPath),
    ];
    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
      }
    }
    throw new Error(`Content not found: ${urlPath}`);
  }
  // Client: fetch from static files
  const res = await fetch(urlPath);
  if (!res.ok) throw new Error(`Failed to fetch ${urlPath}: ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchAll<T extends ContentType>(opts: {
  data: T;
}): Promise<ContentTypeMap[T][]> {
  const items = await readJson<ContentTypeMap[T][]>(
    `/content/${opts.data}.json`,
  );
  return sortByDate(items);
}

export async function fetchOne<T extends ContentType>(opts: {
  data: { filename: string; contentType: T };
}): Promise<ContentTypeMap[T] | null> {
  try {
    const data = await readJson<ContentTypeMap[T]>(
      `/content/${opts.data.contentType}/${opts.data.filename}`,
    );
    const slug =
      opts.data.contentType + "/" + opts.data.filename.replace(/\.json$/, "");
    return { ...data, slug } as ContentTypeMap[T];
  } catch {
    return null;
  }
}
