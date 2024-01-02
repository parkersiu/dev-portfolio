import { Social } from "@/typings";
import { NextResponse, NextRequest } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
    *[_type == "social"]
`;

type Data = {
  socials: Social[];
};

export async function GET() {
  const socials: Social[] = await sanityClient.fetch(query);

  return NextResponse.json({ socials }, { status: 200 });
}
