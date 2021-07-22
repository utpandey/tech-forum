const mongoose = require("mongoose")
const User = mongoose.model('User');
// const User = require("../models/User");

module.exports = UserResolver = {
    Query: {
        hello: () => "hi",
        users: () => User.find()
    },
    Mutation: {
        createUser: async(_, { email, password }) => {
            const user = new User({ email, password });
            await user.save();
            return user;
        }
    }
};

// export default UserResolver;