import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/me", { withCredentials: true });
      setName(res.data.name);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
    getMyBlogs();
  }, []);

  const handleSignout = async () => {
    try {
      const res = await axios.post("/api/signout");
      toast(res.data.message);
      navigate("/");
    } catch (error: any) {
      toast(error.response?.data?.message, { position: "top-center" });
    }
  };

  const [titleValue, setTitleValue] = useState("");
  const [postValue, setPostValue] = useState("");

  const handleTitleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };
  const handlePostValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostValue(e.target.value);
  };

  const [posts, setPosts] = useState([]);

  const getMyBlogs = async () => {
    try {
      const res = await axios.get("/api/get-my-posts", {
        withCredentials: true,
      });
      setPosts(res.data.posts);
    } catch (error: any) {
      console.log(error.response?.data?.error);
      toast(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
      });
    }
  };

  const handleSaveBlog = async () => {
    try {
      const res = await axios.post(
        "/api/create-blog",
        { title: titleValue, post: postValue },
        { withCredentials: true },
      );
      toast(res.data.message, { position: "top-right" });
      setTitleValue("");
      setPostValue("");
      getMyBlogs();
    } catch (error: any) {
      toast(error.response?.data?.message, { position: "top-right" });
    }
  };

  return (
    <div className="p-5 text-white">
      <>
        <div className="head flex justify-between">
          <h1 className="font-semibold text-4xl font-mono italic text-neutral-300">
            Hey {name}...
          </h1>
          <button
            onClick={handleSignout}
            className="bg-red-950 border border-red-900 text-neutral-200 hover:border-red-950 transition-colors duration-150 cursor-pointer px-2 h-8 rounded-lg text-sm"
          >
            Sign out
          </button>
        </div>

        <div className="description mt-3 font-mono text-sm text-neutral-400">
          Write a blog here. Describe your day 😊
        </div>

        <div className="write-a-post flex flex-col items-start gap-4">
          <input
            type="text"
            name="title"
            value={titleValue}
            onChange={handleTitleValueChange}
            placeholder="Title for your Blog Post"
            className="bg-neutral-800 font-mono mt-3 text-sm outline-none rounded-md min-w-200 px-3 py-2"
          />
          <textarea
            value={postValue}
            onChange={handlePostValueChange}
            placeholder="Start writing"
            className="bg-neutral-800 font-mono text-sm outline-none rounded-md min-h-30 resize-none min-w-200 px-3 py-2"
          />
          <button
            onClick={handleSaveBlog}
            className="bg-green-950 border hover:border-green-950 text-neutral-200 border-green-800 transition-colors duration-150 px-3 py-1 rounded-lg cursor-pointer"
          >
            Save
          </button>
        </div>
      </>
      <>
        <div className="postGallery w-full">
          <div className="flex justify-center flex-wrap gap-5 p-5">
            {posts.map(
              (post: { _id: string; title: string; blog: string }, idx) => {
                return (
                  <div
                    key={post._id}
                    className="min-w-60 min-h-30 font-mono bg-neutral-700 border border-neutral-600 rounded-lg p-2"
                  >
                    <h2 className="text-[1.2rem]">{post.title}</h2>
                    <p className="text-sm text-neutral-300">{post.blog}</p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
