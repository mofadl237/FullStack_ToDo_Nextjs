"use server";
import { ITodo } from "@/interface";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoList = async () => {
  return await prisma.todo.findMany({
    orderBy: [{ completed: "desc" }, { createdAt: "desc" }],
  });
  //Handler Error
};
export const createTodoList = async (
  { title, body, completed }: ITodo,
  path: string
) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
    },
  });
  revalidatePath(path);
};
export const updateTodoList = async (todo: ITodo) => {
  await prisma.todo.update({
    where: { id: todo.id },
    data: {
      title: todo.title,
      body: todo.body,
      completed: todo.completed,
    },
  });
revalidatePath('/');

};
export const deleteTodoList = async ({
  id,
  path,
}: {
  id: string | undefined;
  path: string;
}) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath(path);
};
