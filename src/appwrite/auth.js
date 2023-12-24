import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, username }) {
    try {
      const userAccount = await this.account.createAccount(
        ID.unique(),
        email,
        password,
        username
      );
      if (userAccount) {
        // :CALL another method.....
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (err) {
      throw err;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("APPWRITE :: GETUSER ERROR :: ", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error("APPWRITE :: LOGOUT ::", error);
    }
  }
}

const authService = new AuthService();
export default authService;
