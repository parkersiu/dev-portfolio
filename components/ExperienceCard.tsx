"use client";

import { urlFor } from "@/sanity";
import { Experience } from "@/typings";
import { motion } from "framer-motion";

type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-5 flex-shrink-0 w-screen md:w-[600px] xl:w-[900px] snap-start md:snap-center bg-[#292929] opacity-100 md:opacity-40 md:hover:opacity-100 px-5 py-10 md:my-5 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-16 h-16 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src={experience.companyImage && urlFor(experience?.companyImage).url()}
        alt="Company logo"
      />

      <div className="px-0 md:px-10 text-center">
        <h4 className="text-4xl font-light">{experience?.jobTitle}</h4>
        <p className="font-bold text-2xl mt-1">{experience?.company}</p>
        <div className="flex space-x-2 my-2 justify-center">
          {experience.technologies &&
            experience.technologies.map((technology) => (
              <img
                key={technology._id}
                className="h-5 w-5 md:h-10 md:w-10 rounded-full"
                src={urlFor(technology?.image).url()}
                alt={technology.title}
              />
            ))}
        </div>
        <p className="uppercase py-5 text-gray-300">
          {new Date(experience.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "Present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="list-disc text-left space-y-2 md:space-y-4 px-5 text-md max-h-96 overflow-y-scroll md:overflow-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
          {experience.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
