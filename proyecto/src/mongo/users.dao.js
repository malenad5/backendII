import { userModel } from "../models/users.model.js";

class UsersDaoMongo {
  constructor() {
    this.userModel = userModel;
  }

  get = async (_) => await this.userModel.find({});

  create = async (newUser) => await this.userModel.create(newUser);

  getBy = async (filter) => "get user";

  update = async (uid, usersToUpdate) => "update user";

  delete = async (uid) => "delete user";
}

export default UsersDaoMongo;
