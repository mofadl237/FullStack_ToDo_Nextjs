import { getTodoList } from "@/actions/todoAction";
import {  ModelAddTodo } from "@/components/ModelAddTodo";
import { TableTodo } from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {
  const {userId} = await auth();
  const todos = await getTodoList(String(userId));
  
  return (
    <main className=" container mx-auto space-y-3  ">
    
      
      
      <div className=" my-5 px-5">
        <ModelAddTodo
          userId={String(userId)}
        
         
          
        />
         <TableTodo todos={todos}/>
      </div>
    </main>
  );
}
