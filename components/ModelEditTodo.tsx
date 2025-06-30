'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {  updateTodoList } from "@/actions/todoAction"


import { formAddSchema } from "@/validation"
import { Checkbox } from "./ui/checkbox"
import { ITodo } from "@/interface"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Pen } from "lucide-react"
import {  useState } from "react"

interface IProps{
    todo:ITodo;
}



export function ModelEditTodo({ todo}:IProps) {
  //1- state
  const [open, setOpen] = useState(false)
  //2- handler
    
  const form = useForm<z.infer<typeof formAddSchema>>({
      resolver: zodResolver(formAddSchema),
      defaultValues: {
       title:todo.title,
       body: todo?.body ?? undefined,
        completed:todo.completed,
      },
    })
  
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formAddSchema>) {
         await updateTodoList({id:todo.id,title:values.title,body:values.body as string , completed:values.completed});
         form.reset();
        setOpen(false)
    }

    
  //3-render

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
     
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer "><Pen/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit ToDo</DialogTitle>
            <DialogDescription>
              Make changes to your Todo here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
         
       <Form  {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormDescription>
                This is your Title Todo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea  {...field} />
              </FormControl>
              <FormDescription>
                This is your Description Todo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex cursor-pointer">
             
              <FormControl className=" cursor-pointer">
                <Checkbox checked={field.value} onCheckedChange={field.onChange}   />
              </FormControl>
               <FormLabel>Complete</FormLabel>
              
            </FormItem>
          )}
        /> 
        
      
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" className="cursor-pointer">Edit</Button>
             
          </DialogFooter>
      </form>
      </Form>
        </DialogContent>
    </Dialog>
  )
}
