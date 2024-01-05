"use client";

import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const ContactForm = () => {
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const { toast } = useToast();

  const onContactFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        setDisabled(res.message.length > 0);
        if (res.status === "success")
          toast({
            title: "Success!",
            description: "Your message was sent.",
            className: "bg-gray-400",
          });
        if (res.status === "error")
          toast({
            title: "Uh oh! Something went wrong",
            description: "There was a problem with your request",
            variant: "destructive",
          });
      });
  };

  return (
    <div>
      <form
        className="flex flex-col space-y-2 w-fit mx-auto"
        onSubmit={onContactFormSubmit}
      >
        <div className="">
          <label htmlFor="name" className="cursor-pointer sr-only">
            Name
          </label>
          <input
            type="text"
            className="contactInput mr-1"
            name="name"
            id="name"
            placeholder="Name"
            required
            disabled={disabled}
          />

          <label htmlFor="email" className="cursor-pointer sr-only">
            Email
          </label>
          <input
            type="email"
            className="contactInput ml-1"
            name="email"
            id="email"
            placeholder="Email"
            required
            disabled={disabled}
          />
        </div>

        <label htmlFor="subject" className="cursor-pointer hidden">
          Subject
        </label>
        <input
          type="text"
          className="contactInput"
          name="subject"
          id="subject"
          placeholder="Subject"
          required
          disabled={disabled}
        />

        <label htmlFor="message" className="cursor-pointer hidden">
          Message
        </label>
        <textarea
          rows={3}
          className="contactInput"
          name="message"
          id="message"
          placeholder="Message"
          required
          disabled={disabled}
        />

        <button
          type="submit"
          /* className={`btn btn-block !mt-4 ${
            disabled ? "btn-disabled" : "btn-primary"
          }`} */
          /* className="bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg" */
          className={`py-5 px-10 rounded-md text-white font-bold text-lg ${
            disabled ? "bg-gray-500" : "bg-[#F7AB0A]"
          }`}
          disabled={disabled}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
