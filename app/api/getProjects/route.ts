import { Project } from "@/typings";
import { NextResponse, NextRequest } from "next/server";
import { groq } from "next-sanity";
import { sanityClient } from "@/sanity";

const query = groq`
    *[_type == "project"] {
      ...,
      technologies[]->
    }
`;

type Data = {
  projects: Project[];
};

export async function GET() {
  const projects: Project[] = await sanityClient.fetch(query);

  return NextResponse.json({ projects }, { status: 200 });
}
