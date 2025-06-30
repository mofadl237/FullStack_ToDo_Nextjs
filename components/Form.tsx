"use client"

import { Button } from "@/components/ui/button"
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
import { formAddSchema } from "@/validation"

// const formSchema = z.object({
//   title: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   body: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })



export function FormComponent() {
const form = useForm<z.infer<typeof formAddSchema>>({
    resolver: zodResolver(formAddSchema),
    defaultValues: {
     title:'',
     body:''

    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formAddSchema>) {
    createTodoList(values)
    console.log("Data ===> ",values)
  }


  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                This is your public display name.
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
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="complete"
          render={({ field }) => (
            <FormItem>
             
              <FormControl>
                <Input type="checkbox" {...field} />
              </FormControl>
               <FormLabel>Complete</FormLabel>
              
            </FormItem>
          )}
        /> */}
        <Button type="submit">Submit</Button>
        <Button  variant={'ghost'} className="ms-3 cursor-pointer">cancel</Button>
      </form>
    </Form>
  )
}