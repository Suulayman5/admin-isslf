import { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

interface Blog {
  id: string;
  title: string;
  content: string;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogCollection = collection(db, "blogs");
        const blogSnapshot = await getDocs(blogCollection);
        setBlogs(blogSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Blog)));
      } catch (error) {
        alert("Error fetching blogs: " + (error as Error).message);
      }
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

  const handleEdit = async (id: string, updatedData: { title: string, content: string }) => {
    try {
      const blogRef = doc(db, "blogs", id);
      await updateDoc(blogRef, updatedData);

      setBlogs(blogs.map((blog) =>
        blog.id === id ? { ...blog, ...updatedData } : blog
      ));

      // Reset edit state
      setEditingId(null);
      setNewTitle("");
      setNewContent("");
    } catch (error) {
      alert("Error updating blog: " + (error as Error).message);
    }
  };

  const handleEditClick = (blog: Blog) => {
    setEditingId(blog.id);
    setNewTitle(blog.title);
    setNewContent(blog.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewTitle("");
    setNewContent("");
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      handleEdit(editingId, { title: newTitle, content: newContent });
    }
  };

  return (
    <ul className="space-y-4">
      {blogs.map((blog) => (
        <li key={blog.id} className="p-4 border rounded">
          {editingId === blog.id ? (
            // Edit Form for the blog post
            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2 border rounded text-black"
                required
              />
              <div className="space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-white bg-gray-500 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p>{blog.content}</p>
              <div className="space-x-4">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded mt-2"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BlogList;

