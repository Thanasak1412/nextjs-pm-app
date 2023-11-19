import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

// component
import Greeting from "@/components/Greeting";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import ProjectCard from "@/components/ProjectCard";
import TasksCard from "@/components/TasksCard";
// lib
import { delay } from "@/lib/async";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";

const getProjects = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return projects;
};

const Page = async () => {
  const projects = await getProjects();

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-min w-full flex flex-col items-stretch justify-center px-6">
        <div className="flex basis-full">
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-expect-error */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap gap-4 mt-3">
          {projects.map((project) => (
            <div
              className="basis-[calc(32.5%)]"
              key={`${project.id}-${project.ownerId}`}
            >
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="w-full flex flex-2 grow mt-6">
          <div className="w-full mt-6 mb-2">
            {/* @ts-expect-error Server Component */}
            <TasksCard title="Learning Task" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
