// import { usePosts } from "@/hooks/serverless/usePosts";

import { usePosts } from "@/hooks/serverless/usePosts";
import { useEffect } from "react";

// import { useEffect } from "react";
const Serverless = () => {
  const {
    fetchPosts,
    posts,
    error,
    loading,
    createPost,
    deletePost,
    newPostName,
    setNewPostName,
    updatePost,
  } = usePosts();

  useEffect(() => {
    fetchPosts(); // Await the promise here
  }, [fetchPosts]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">Post Manager</h1>
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Create New Post */}
      <div className="mb-6 rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">Create Post</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newPostName}
            onChange={(e) => setNewPostName(e.target.value)}
            placeholder="Post name"
            className="flex-1 rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createPost}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>

      {/* Display Posts */}

      <div className="h-[calc(100vh-15rem)] overflow-auto rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Total Posts: {posts?.length}{" "}
        </h2>
        {posts.length === 0 && (
          <p className="text-gray-500">No posts available.</p>
        )}
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-200 py-4">
            <p>
              <strong>ID:</strong> {post.id}
            </p>
            <p>
              <strong>Name:</strong> {post.name}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(post.updatedAt).toLocaleString()}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => updatePost(Number(post.id), newPostName)}
                className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => deletePost(Number(post.id))}
                className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Serverless;
