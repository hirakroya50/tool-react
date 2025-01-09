import { useCallback, useState } from "react";
import axios from "axios";

type Post = {
  id: number;
  name: string;
  updatedAt: string;
};

interface ApiResponse {
  data: Post[];
}

export const usePosts = () => {
  const [newPostName, setNewPostName] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_PUBLIC_SERVERLESS_BACKEND;

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse>(`${API_URL}`);
      console.log(response.data.data);
      setPosts(response?.data?.data);
    } catch (err) {
      setError("Failed to fetch posts.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new post
  const createPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}`, {
        postname: newPostName,
      });
      setPosts((prev) => [...prev, response.data.post]);
      setNewPostName("");
    } catch (err) {
      console.log(err);
      setError("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  // Update a post by ID
  const updatePost = async (id: number, updatedName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}?id=${id}`, {
        postname: updatedName,
      });
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? response.data.data : post))
      );
    } catch (err) {
      setError("Failed to update post.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a post by ID
  const deletePost = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}?id=${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError("Failed to delete post.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deletePost,
    updatePost,
    fetchPosts,
    createPost,
    loading,
    error,
    posts,
    setNewPostName,
    newPostName,
  };
};
