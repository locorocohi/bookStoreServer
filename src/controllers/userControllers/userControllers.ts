import { updateUserData } from "./updateUserData";
import { createUser } from "./createUser"
import { getAllUsers } from "./getAllUsers";
import { getMe } from "./getMe";
import { login } from "./login";

export default {
  createUser: createUser,
  getAllUsers: getAllUsers,
  login: login,
  getMe: getMe,
  updateUserData: updateUserData,
};
