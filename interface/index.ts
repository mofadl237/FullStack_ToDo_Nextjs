export interface ITodo{
    id ?:string |undefined;
    title:string;
    body ?:string|undefined |null;
    completed:boolean;
    createdAt?:Date |undefined;
    user_id ?:string|undefined;
}