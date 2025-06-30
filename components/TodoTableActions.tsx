"use client";

import { deleteTodoList } from "@/actions/todoAction";
import { Button } from "./ui/button";
import { Loader, Trash } from "lucide-react";
import { useState } from "react";
import { ModelEditTodo } from "./ModelEditTodo";
import { ITodo } from "@/interface";
interface IProps{
  todo:ITodo;
}

const TodoTableActions = ( {todo} :  IProps) => {
  //1- state
    const [loading, setIsLoading] =useState(false);
    //2- Handler
  return (
    <>
      <ModelEditTodo todo={todo}/>
      <Button
        className="cursor-pointer"
        variant={"destructive"}
        onClick={async () => {
            setIsLoading(true);
          await deleteTodoList({id: todo.id , path:"/"});
          setIsLoading(false);
        }}
      >
       { loading ?  <Loader/> : <Trash />}
      </Button>

      
    </>
  );
};

export default TodoTableActions;
