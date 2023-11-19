import { cookies } from "next/headers";

import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { User } from "@prisma/client";

import Button from "./Button";
import Card from "./Card";

const getUser = async () => {
  await delay(4000);
  return (await getUserFromCookie(cookies())) as User;
};

export default async function Greeting() {
  const user = await getUser();

  return (
    <Card className="w-full py-4">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user.firstName}
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today&apos;s Schedule</Button>
      </div>
    </Card>
  );
}
