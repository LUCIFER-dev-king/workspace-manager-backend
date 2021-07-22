const User = require("../../models/user");
const isAuthenticated = require("../../utils/isAuthenticated");

const getUserMiddleware = async (resolve, parent, args, context, info) => {
  console.log(context);
  if (context.isUserAuthenticated._id) {
    const result = await resolve(parent, args, context, info);
    return result;
  }
  return context.isAuthenticated;
};

const getUserById = async (resolve, parent, args, context, info) => {
  const { _id } = context.isUserAuthenticated;
  const user = await User.findById(_id).exec();
  context = { ...context, user: user };
  const result = await resolve(parent, args, context, info);
  return result;
};

const getWorkspace = async (resovle, parent, args, context, info) => {
  const user = await getUserById(resovle, parent, args, context, info);
  return user;
};

module.exports = {
  Query: {
    getUser: getUserById,
  },
  Mutation: {
    createWorkSpace: getUserById,
    createBoard: getWorkspace,
  },
};
