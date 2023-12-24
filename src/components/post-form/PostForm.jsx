import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { Input, Select, RTE } from "../index";
import { useForm } from "react-hook-form";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        const file = await appwriteService.uploadFile(data?.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
    });

    return () => subscription.unsubscribe(); //for memory management to optimize the subscription
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="">
        <Input
          label="Title: "
          placeholder="title"
          className=""
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          placeholder="slug"
          className=""
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label={"Content: "}
          name={"content"}
          control={control}
          defaultValue={getValues("conten")}
        />
      </div>
      <div className="">
        <Input
          label="Featured Image: "
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
          })}
        />
        {post && (
          <div className="">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label={"Status"}
          {...register("status", {
            required: true,
          })}
        />
        <button className="btn btn-accent" type="submit">
          {post ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
