import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) setPosts(posts.document);
    });
  }, []);

  if (posts.length === 0)
    return (
      <div className="text-2xl w-full h-[80vh] flex justify-center items-center">
        {" "}
        Login To read Posts
      </div>
    );

  return (
    <div className="w-full">
      {posts.map((post) => (
        <div className="" key={post.$id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default Home;
