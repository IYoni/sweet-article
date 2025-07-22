import React from "react";
import { TodoItem } from "@/components/todo-item";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0)
    return (
      <div className="text-center text-indigo-300 font-medium text-lg pb-8 select-none mt-3">
        Nothing here yet... 💤
      </div>
    );
  return (
    <ul className="flex flex-col gap-3 pb-5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </ul>
  );
}
