import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch((err) => console.error("Error :: ", err));
  }, []);

  return (
    <div className="container flex flex-wrap">
      {posts?.map((post) => (
        <div key={post.$id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default AllPosts;
