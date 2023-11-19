import clsx from "clsx";
import { FC } from "react";

import { Prisma, TASK_STATUS } from "@prisma/client";

// components
import Card from "./Card";

const projectWithTask = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    tasks: true,
  },
});

type ProjectWithTask = Prisma.ProjectGetPayload<typeof projectWithTask>;

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    weekday: "long",
    month: "short",
    year: "numeric",
  });
};

const ProjectCard: FC<{ project: ProjectWithTask }> = ({ project }) => {
  const completedCount = project.tasks.filter(
    (task) => task.status === TASK_STATUS.COMPLETED
  ).length;
  const taskProgress = Math.ceil((completedCount / project.tasks.length) * 100);

  return (
    <Card className="transition-all ease-in-out duration-200 !px-6 !py-8 hover:scale-105">
      <span className="text-sx text-gray-300">
        {formatDate(project.createdAt)}
      </span>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.tasks.length}</span>
      </div>
      <div className="text-gray-400">
        {completedCount}/{project.tasks.length} completed
      </div>
      <>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-violet-600 rounded-full"
            )}
            style={{ width: `${taskProgress}%` }}
          />
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">
            {taskProgress}%
          </span>
        </div>
      </>
    </Card>
  );
};

export default ProjectCard;
