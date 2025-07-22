import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2Icon } from "lucide-react";
import type { Todo } from "@/components/todo-list";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li
      className={`flex items-center gap-4 bg-white/80 px-3 py-2 rounded-lg shadow-inner transition
        border border-indigo-100 duration-200 hover:border-indigo-500 group`}
    >
      <Checkbox size="lg" checked={todo.completed} onCheckedChange={onToggle} aria-label="Toggle complete" />
      <span
        className={`flex-1 text-lg ${
          todo.completed
            ? "line-through text-gray-300 select-none"
            : "text-gray-800"
        } pl-1 transition-colors duration-150`}
      >
        {todo.text}
      </span>
      <Button
        type="button"
        onClick={onDelete}
        variant="ghost"
        size="icon"
        className="text-indigo-400 hover:text-rose-500 hover:bg-transparent focus-visible:ring-rose-400 transition"
        aria-label="Delete todo"
      >
        <Trash2Icon size={20} />
      </Button>
    </li>
  );
}
