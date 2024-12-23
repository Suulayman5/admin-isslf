"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for Next.js 13+ app directory
import BlogForm from "../components/admin/form";
import BlogList from "../components/admin/list";

const Admin: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <BlogForm />
      <h2 className="text-xl font-bold mt-8 mb-4">All Blogs</h2>
      <BlogList />
    </div>
  );
};

export default Admin;
