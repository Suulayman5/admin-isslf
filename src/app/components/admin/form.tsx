import { useState, FormEvent } from "react";
import { db } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "blogs"), { title, content, createdAt: new Date() });
      setTitle("");
      setContent("");
      alert("Blog post added successfully!");
    } catch (error) {
      alert("Error adding blog post: " + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded text-black"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded text-black"
        required
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
        Add Blog
      </button>
    </form>
  );
};

export default BlogForm;
