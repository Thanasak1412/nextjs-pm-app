import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

const randomStatus = () => {
  const taskStatus = [
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.COMPLETED,
    TASK_STATUS.STARTED,
  ];

  return taskStatus[Math.floor(Math.random() * taskStatus.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: {
      email: "test@email.com",
    },
    update: {},
    create: {
      email: "test@email.com",
      password: hashPassword("password"),
      firstName: "John",
      lastName: "Doe",
      projects: {
        create: [...Array(5)].map((_, i) => ({
          name: `Project ${i}`,
          due: new Date(2023, 10, 15),
        })),
      },
    },
    include: {
      projects: true,
    },
  });

  await Promise.all(
    user.projects.map((project, i) =>
      db.task.createMany({
        data: {
          name: `Task ${i}`,
          description: `Everything that description task ${i}`,
          ownerId: user.id,
          projectId: project.id,
          status: randomStatus(),
        },
      })
    )
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
