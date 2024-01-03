import { Experience } from "@/typings";

export const fetchExperiences = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SANITY_BASE_URL_CUSTOM}/api/getExperiences`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const experiences: Experience[] = data.experiences;

  return experiences;
};
