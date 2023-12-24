import React, { useEffect, useState } from "react";
import { PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";

function EditPost() {
  const [post, setPosts] = useState([]);
  // const [slug, setSlug] = useState()
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPosts(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div>
      <PostForm post={post} />
    </div>
  ) : null;
}

export default EditPost;
