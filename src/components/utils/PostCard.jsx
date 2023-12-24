import React from "react";
import service from "../../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={`${service.getFilePreview(featuredImage)}`} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
