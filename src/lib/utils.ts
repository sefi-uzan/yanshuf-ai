import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import DOMPurify from "dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}/${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}/${path}`;
}

export function sanitizeAndStyleHTML(htmlContent: string[]) {
  const content: string[] = htmlContent.map((message) => {
    const sanitizedContent = DOMPurify.sanitize(message);
    const parser = new DOMParser();

    const doc = parser.parseFromString(sanitizedContent, "text/html");

    const paragraphs = doc.querySelectorAll("li");

    paragraphs.forEach((p) => {
      p.style.marginBottom = "1rem";
    });
    return doc.body.innerHTML;
  });

  return content;
}

export function constructMetadata({
  title = "Yanshuf.ai - Your personal AI assistant",
  description = "Yanshuf.ai is a bespoke AI assistant service",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yanshuf-ai",
    },
    icons,
    metadataBase: new URL("https://yanshuf-ai.vercel.app/"),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}