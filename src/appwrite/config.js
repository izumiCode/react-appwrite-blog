import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

const {
  appwriteUrl,
  appwriteProjectId,
  appwriteDatabaseId,
  appwriteCollectionId,
  appwriteBucketId,
} = conf;
class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  /**
   * @param {Object} param0 documentId
   * @param {*} param0.slug document id for the post/blog
   */
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("APPWRITE :: CONFIG CREATE POST :: ", error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("APPWRITE :: UPDATEPOST :: ", error);
      return false;
    }
  }

  async deleteDocument(slug) {
    try {
      return await this.databases.deleteDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("APPWRITE :: DELETE POST :: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("APPWRITE :: GETPOST ERROR :: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.getDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("APPWRITE :: GET ALL POSTS :: ", error);
      return false;
    }
  }

  //FILE UPLOAD SERVICES

  /**
   * @ID.unique() is the file ID for the given file
   * @param {*} file user uploaded file
   */

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.error("APPWRITE :: UPLOAD FILE :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("APPWRITE :: DELETE FILE :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(appwriteBucketId, fileId);
    } catch (error) {
      console.error("APPWRITE :: GETFILE PREVIEW :: ", error);
      return false;
    }
  }
}

const service = new Service();

export default service;
