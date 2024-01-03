import { PageInfo } from "@/typings";

export const fetchPageInfo = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SANITY_BASE_URL_CUSTOM}/api/getPageInfo`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const pageInfo: PageInfo = data.pageInfo;

  return pageInfo;
};
