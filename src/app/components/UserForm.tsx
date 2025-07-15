"use client";
import { useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<User>;
  onSubmit: (user: Omit<User, "id">) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ name, email});
      }}>
    <input
        className="border rounded px-2 py-1"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
    />
    <input
    className="border rounded px-2 py-1"
    placeholder="Email"
    type="email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    required
    />
    <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" className="bg-gray-600 px-3 py-2 rounded" onClick={onCancel}>Cancel</button>
    </div>
    </form>
  );
}

export type { User };