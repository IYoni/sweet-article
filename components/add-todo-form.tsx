"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 shadow-sm">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
        autoFocus
        aria-label="Add a new todo"
      />
      <Button type="submit" className="px-5 shadow-md" aria-label="Add todo">
        Add
      </Button>
    </form>
  );
}
