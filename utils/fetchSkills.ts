import { Skill } from "@/typings";

export const fetchSkills = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SANITY_BASE_URL_CUSTOM}/api/getSkills`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const skills: Skill[] = data.skills;

  return skills;
};
