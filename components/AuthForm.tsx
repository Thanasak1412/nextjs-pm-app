"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Input from "./Input";
import { signIn, register } from "../lib/api";

const contents = {
  register: {
    linkUrl: "/signin",
    linkText: "Already have an account",
    header: "Create a new account",
    subheader: "Just a few things to get started",
    buttonText: "Register",
  },
  signIn: {
    linkUrl: "/register",
    linkText: "Don't have an account?",
    header: "Welcome back",
    subheader: "Enter your credential to access your account",
    buttonText: "Sign In",
  },
};

type InitialFormInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

const initialFormInput: InitialFormInput = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

type Props = {
  mode: "signIn" | "register";
};

export default function AuthForm({ mode }: Readonly<Props>) {
  const [formInput, setFormInput] = useState(initialFormInput);

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      if (mode === "signIn") {
        await signIn(formInput);
      } else {
        await register(formInput);
      }

      setFormInput(initialFormInput);
      router.replace("/home");
    },
    [formInput, mode, router]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const content = contents[mode];

  return (
    <Card>
      <div className="w-full py-10">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="pt-10 w-full">
          {mode === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  required
                  placeholder="First Name"
                  name="firstName"
                  value={formInput.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  placeholder="Last Name"
                  name="lastName"
                  value={formInput.lastName}
                  onChange={handleChange}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formInput.email}
              onChange={handleChange}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              name="password"
              value={formInput.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
