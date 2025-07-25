"use client";
import type { User } from "@/app/components/UserForm"

export default function UserTable({
    users,
    onEdit,
    onRemove,
}: {
    users: User[];
    onEdit: (user: User) => void;
    onRemove: (id: number) => void;
}) {
    return (
        <table className="min-w-h [350px] border border-gray-300 mb-8">
            <thead>
                <tr className="bg-gray-500">
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>{users.map(user => (
                <tr key={user.id} className="text-center">
                <td className="border px-2 py-1">{user.id}</td>
                <td className="border px-2 py-1">{user.name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1 flex gap-2 justify-center">
                    <button className="bg-amber-600 px-2 py-1 rounded"
                    onClick={() => onEdit(user)}>Update</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => onRemove(user.id)}>Remove</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}