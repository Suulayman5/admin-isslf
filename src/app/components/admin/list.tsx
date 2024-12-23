import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

interface Blog {
  id: string;
  title: string;
  content: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogCollection);
      setBlogs(blogSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Blog)));
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      alert("Error deleting blog: " + (error as Error).message);
    }
  };

  return (
    <ul className="space-y-4">
      {blogs.map((blog) => (
        <li key={blog.id} className="p-4 border rounded">
          <h3 className="text-xl font-bold">{blog.title}</h3>
          <p>{blog.content}</p>
          <button
            onClick={() => handleDelete(blog.id)}
            className="px-4 py-2 text-white bg-red-500 rounded mt-2"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BlogList;
