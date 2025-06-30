import { getTodoList } from "@/actions/todoAction";
import { ModeToggle } from "@/components/DarkMode";
import {  ModelAddTodo } from "@/components/ModelAddTodo";
import { TableTodo } from "@/components/TodoTable";

import { Plus } from "lucide-react";

export default async function Home() {
  const todos = await getTodoList();
  return (
    <main className="container mx-auto space-y-3">
    
      <ModeToggle  />
      
      <div className="my-5 ms-7 ">
        <ModelAddTodo

        
          textHead="Add New ToDo"
          textButton={
            <>
              <Plus /> New ToDo
            </>
          }
          
        />
         <TableTodo todos={todos}/>
      </div>
    </main>
  );
}
