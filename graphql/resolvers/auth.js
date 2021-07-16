const User = require("../../models/user");
const jwt = require("jsonwebtoken");
module.exports = {
  Mutation: {
    async signUp(
      _,
      { signUpInput: { username, email, password } },
      context,
      info
    ) {
      const user = new User({ username, email, password });
      return await user.save();
    },

    async signIn(_, { signInInput: { email, password } }, context, info) {
      const user = await User.findOne({ email });

      if (!user) {
        return { err: "Email is invalid" };
      }
      if (!user.authenticate(password)) {
        return { err: "Email and password doesn't match" };
      }

      const token = jwt.sign({ _id: "123456" }, process.env.SECRET);

      return {
        ...user._doc,
        token,
      };
    },
  },
};