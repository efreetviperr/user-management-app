"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import UserForm, { User } from "@/app/components/UserForm";
import UserTable from "@/app/components/UserTable";


const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data.slice(0, 5).map((u: any) => {
    return ({
      id: u.id,
      name: u.name,
      email: u.email,
    });
  });
};

export default function Home() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

 
  const addUser = (user: Omit<User, "id">) => {
    setUsers(prev => [...prev, {
      ...user, id: prev.length ? Math.max(...prev.map(u => u.id)) +1:1},
    ]);
    setShowAdd(false);
  };

  const updateUser = (user: Omit<User, "id">) => {
    if (!editUser) return;
    setUsers(prev => prev.map(u => (u.id === editUser.id ? { ...u, ...user } : u)));
    setEditUser(null);
  };

  const removeUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">User Management</h1>
      <button className="mb-4 bg-blue-900 text-white px-4 py-2 rounded" onClick={() => setShowAdd(true)}>Add User</button>

      <UserTable users={users} onEdit={setEditUser} onRemove={removeUser} />

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-gray-500 p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-semibold mb-2">Register User</h2>
            <UserForm onSubmit={addUser} onCancel={() => setShowAdd(false)} />
          </div>
        </div>
      )}

      {editUser  && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-gray-700 p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-semibold mb-2">Update User</h2>
            <UserForm
              initial={editUser || undefined}
              onSubmit={updateUser}
              onCancel={() => setEditUser(null)}
            />
          </div>
        </div>
      )}
    </div>
  )

}