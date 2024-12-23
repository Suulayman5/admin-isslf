"use client"

import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";

interface Blog {
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogCollection);
      setBlogs(blogSnapshot.docs.map((doc) => doc.data() as Blog));
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <ul className="space-y-4">
        {blogs.map((blog, index) => (
          <li key={index} className="p-4 border rounded">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
