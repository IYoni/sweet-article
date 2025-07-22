"use client";
import React, { useState, useEffect } from "react";
import { TodoList } from "@/components/todo-list";
import { AddTodoForm } from "@/components/add-todo-form";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("todos-app");
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  // Save todos to localStorage when changed
  useEffect(() => {
    localStorage.setItem("todos-app", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  };
  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-indigo-50 to-indigo-200 flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-lg mx-auto rounded-xl shadow-2xl bg-white/80 backdrop-blur-lg pt-8 pb-7 px-6 relative border border-indigo-200">
        <h1 className="text-3xl font-extrabold text-indigo-700 text-center mb-8 drop-shadow-xl select-none ">📝 To-Do App</h1>
        <AddTodoForm onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleComplete} onDelete={deleteTodo} />
        <div className="pt-6 text-xs text-gray-400 text-center select-none tracking-wider">No account or database required 🎉</div>
      </div>
    </div>
  );
}
