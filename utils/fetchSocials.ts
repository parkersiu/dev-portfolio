import { Social } from "@/typings";

export const fetchSocials = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SANITY_BASE_URL_CUSTOM}/api/getSocials`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const socials: Social[] = data.socials;

  return socials;
};
