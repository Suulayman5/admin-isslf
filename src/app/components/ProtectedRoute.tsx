"use client";

import { useRouter } from 'next/navigation'; // Use 'next/navigation' for app directory
import { useAuth } from '../lib/authContext';
import React, { useEffect } from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
