import { Project } from "@/typings";

export const fetchProjectss = async () => {
  const res = await fetch(
    `${process.env.SANITY_STUDIO_BASE_URL}/api/getProjects`
  );

  const data = await res.json();
  const projects: Project[] = data.projects;

  console.log("fetching:", projects);
  return projects;
};
