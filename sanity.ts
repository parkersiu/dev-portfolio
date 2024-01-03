import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config: any = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID_CUSTOM,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_CUSTOM,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION || "2023-05-03", // https://www.sanity.io/docs/api-versioning
  useCdn: false, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};

export const sanityClient = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
