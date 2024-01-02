import { PageInfo } from "@/typings";
import { NextResponse, NextRequest } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
    *[_type == "pageInfo"][0]
`;

type Data = {
  pageInfo: PageInfo;
};

export async function GET() {
  const pageInfo: PageInfo = await sanityClient.fetch(query);

  return NextResponse.json({ pageInfo }, { status: 200 });
}
