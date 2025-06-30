import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ITodo } from "@/interface";
import { Badge } from "@/components/ui/badge"
import TodoTableActions from "./TodoTableActions";


interface IProps{
    todos:ITodo[];
}

export function TableTodo({todos}:IProps) {
  return (
    <Table>
      <TableCaption>Todo </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Completed</TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.length && todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.completed ? <Badge variant="default">Completed</Badge> : <Badge variant="destructive">In Progress</Badge>}</TableCell>
            <TableCell>{todo.createdAt?.toLocaleString()}</TableCell>
            <TableCell className="flex space-x-2 item-center justify-end ">
                <TodoTableActions todo={todo}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{todos.length ? todos.length : 'you Do nt Any Todo Yet !!'}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
