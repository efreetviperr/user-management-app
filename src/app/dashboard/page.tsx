'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import UserTable from '../components/UserTable';
import AddUserForm from '../components/AddUserForm';
import Header from '../components/Header';
import { User } from '../types/user';


const initialUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    phone: '123-456-7890',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    phone: '098-765-4321',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    username: 'bobjohnson',
    phone: '555-123-4567',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    username: 'alicebrown',
    phone: '777-888-9999',
  },
];


const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data.slice(0, 5);
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [nextId, setNextId] = useState(5);

  
  const { data: apiUsers, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  
  useEffect(() => {
    if (apiUsers && apiUsers.length > 0) {
      setUsers(apiUsers);
      setNextId(Math.max(...apiUsers.map(u => u.id)) + 1);
    }
  }, [apiUsers]);

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: nextId,
    };
    setUsers(prev => [...prev, newUser]);
    setNextId(prev => prev + 1);
    toast.success('User added successfully!');
  };

  const handleUpdateUser = (id: number, updatedUser: Omit<User, 'id'>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...updatedUser, id } : user
    ));
    toast.success('User updated successfully!');
  };

  const handleDeleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.success('User deleted successfully!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading users</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management Dashboard</h1>
            <p className="text-gray-600">Manage your users with full CRUD operations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add User Form */}
            <div className="lg:col-span-1">
              <AddUserForm onSubmit={handleAddUser} />
            </div>

            {/* User Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Users</h2>
                <UserTable 
                  users={users} 
                  onUpdateUser={handleUpdateUser} 
                  onDeleteUser={handleDeleteUser} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 