"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});
type UserFormData = z.infer<typeof userSchema>;

export default function UserForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<User>;
  onSubmit: (user: Omit<User, "id">) => void;
  onCancel: () => void;
}) {

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initial?.name || "",
      email: initial?.email || "",
    },
  });

    React.useEffect(() => {
    reset({
      name: initial?.name || "",
      email: initial?.email || "",
    });
  }, [initial, reset]);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
    <input
        className="border rounded px-2 py-1"
        placeholder="Name"
        {...register("name")}
    />
    <input
    className="border rounded px-2 py-1"
    placeholder="Email"
    {...register("email")}
    />
    <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" className="bg-gray-600 px-3 py-2 rounded" onClick={onCancel}>Cancel</button>
    </div>
    </form>
  );
}

export type { User };
