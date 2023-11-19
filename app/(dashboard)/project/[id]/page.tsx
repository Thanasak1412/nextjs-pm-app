import { cookies } from "next/headers";

import TasksCard from "@/components/TasksCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";

async function getProject(id: string) {
  const user = await getUserFromCookie(cookies());

  return await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
}

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const project = await getProject(params.id);

  return (
    <div className="w-full h-full overflow-y-auto pr-6">
      {/* @ts-expect-error Server Component */}
      <TasksCard tasks={project?.tasks} title={project?.name} />
    </div>
  );
};

export default Page;
