'use client';

import { useState } from 'react';
import { User } from '../types/user';
import UpdateUserModal from './UpdateUserModal';
import Button from './Button';

interface UserTableProps {
  users: User[];
  onUpdateUser: (id: number, updatedUser: Omit<User, 'id'>) => void;
  onDeleteUser: (id: number) => void;
}

export default function UserTable({ users, onUpdateUser, onDeleteUser }: UserTableProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (updatedUser: Omit<User, 'id'>) => {
    if (selectedUser) {
      onUpdateUser(selectedUser.id, updatedUser);
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                {user.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b">
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateClick(user)}>
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDeleteUser(user.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateModalOpen && selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedUser(null);
          }}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  );
} 