"use client";

import { PageInfo } from "@/typings";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ContactForm } from "./ContactForm";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {
  pageInfo: PageInfo;
};

export default function ContactMe({ pageInfo }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { toast } = useToast();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: { [key: string]: string } = {};
    const elements = e.currentTarget.elements as unknown as Array<
      HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement
    >;

    Array.from(elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
    });

    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setStatus(res.status);
      });
  };

  return (
    <div className="h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
      <h3 className="absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl">
        Contact
      </h3>

      <div className="flex flex-col space-y-10">
        <h4 className="text-2xl md:text-4xl font-semibold text-center">
          Want to get in touch?{" "}
          <span className="decoration-[#F7AB0A]/50 underline">
            Let&apos;s Talk.
          </span>
        </h4>

        <div className="space-y-0 md:space-y-6">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl">{pageInfo.phoneNumber}</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl">{pageInfo.email}</p>
          </div>

          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-[#F7AB0A] h-7 w-7 animate-pulse" />
            <p className="text-lg md:text-2xl">{pageInfo.address}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
