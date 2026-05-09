import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

const textKeys = new Set([
  "alt",
  "button_text",
  "buy_button_text",
  "description",
  "eyebrow",
  "meta_description",
  "meta_title",
  "text",
  "title",
]);

function replaceBrandCopy(value: unknown, key = ""): unknown {
  if (typeof value === "string") {
    return textKeys.has(key)
      ? value
          .replaceAll("Nimbus Keyboards", "Vapor Keyboards")
          .replaceAll("Nimbus", "Vapor")
          .replaceAll("Vapor75", "Keyboard")
      : value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceBrandCopy(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        replaceBrandCopy(entryValue, entryKey),
      ]),
    );
  }

  return value;
}

function normalizeHomepageData<T extends { slices?: unknown }>(data: T): T {
  const normalized = replaceBrandCopy(data) as T;

  if (Array.isArray(normalized.slices)) {
    normalized.slices = normalized.slices.map((slice) => {
      if (
        slice &&
        typeof slice === "object" &&
        "slice_type" in slice &&
        slice.slice_type === "hero" &&
        "primary" in slice &&
        slice.primary &&
        typeof slice.primary === "object"
      ) {
        return {
          ...slice,
          primary: {
            ...slice.primary,
            heading: [
              {
                type: "heading1",
                text: "Built for\nEvery Keystroke",
                spans: [],
                direction: "ltr",
              },
            ],
          },
        };
      }

      return slice;
    });
  }

  return normalized;
}

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());
  const data = normalizeHomepageData(page.data);

  return <SliceZone slices={data.slices} components={components} />;
}
