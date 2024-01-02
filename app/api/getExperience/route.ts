import { Experience } from "@/typings";
import { NextResponse, NextRequest } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
    *[_type == "experience"] {
      ...,
      technologies[]->
    }
`;

type Data = {
  experiences: Experience[];
};

export async function GET() {
  const experiences: Experience[] = await sanityClient.fetch(query);

  return NextResponse.json({ experiences }, { status: 200 });
}
