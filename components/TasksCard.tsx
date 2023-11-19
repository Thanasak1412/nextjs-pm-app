import { cookies } from "next/headers";

import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Task, TASK_STATUS } from "@prisma/client";

import Button from "./Button";
import Card from "./Card";

type Props = {
  tasks?: Task[];
  title?: string;
};

async function getTasks() {
  const user = await getUserFromCookie(cookies());

  return await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        deleted: true,
        status: TASK_STATUS.COMPLETED,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });
}

export default async function TasksCard({ tasks, title }: Props) {
  const data = tasks || (await getTasks());

  return (
    <Card className="py-5">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div className="py-2" key={`${task.id}-${task.ownerId}`}>
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
}
