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
  DialogTrigger,
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
import { createTodoList } from "@/actions/todoAction"


import {  useState } from "react";
import { formAddSchema } from "@/validation"
import { Checkbox } from "./ui/checkbox"
import { Plus } from "lucide-react"

interface IProps{
   userId:string  ;
}



export function ModelAddTodo({userId}:IProps) {
  //1- state
  const [open, setOpen] = useState(false)
  //2- handler

  const form = useForm<z.infer<typeof formAddSchema>>({
      resolver: zodResolver(formAddSchema),
      defaultValues: {
       title:'',
       body:'',
        completed:false,
      },
    })
  
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formAddSchema>) {
      //when add error handler const {}= await createTodoList(values);
      await createTodoList(values,userId);
      form.reset()
      setOpen(false);
    }

  //3-render
  return (
    <Dialog open={open} onOpenChange={setOpen} >
     
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer "> <Plus /> New Todo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add ToDo </DialogTitle>
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

            <Button type="submit">Add</Button>
             
          </DialogFooter>
      </form>
      </Form>
        </DialogContent>
    </Dialog>
  )
}
