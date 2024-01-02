import { Skill } from "@/typings";
import { NextResponse, NextRequest } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
    *[_type == "skill"]
`;

type Data = {
  skills: Skill[];
};

export async function GET() {
  const skills: Skill[] = await sanityClient.fetch(query);

  return NextResponse.json({ skills }, { status: 200 });
}
