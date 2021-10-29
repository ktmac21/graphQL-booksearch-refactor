const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
Query: {
    me: async (parent, { username }, context) => {
      
      if (context.user) {
        const userInfo = await User.findOne({_id: context.user._id})
        
        return userInfo;
      }
      throw new AuthenticationError('You are not logged in');
    },
  },


Mutation: {
  
  addUser: async (parent, { username, email, password }) => {
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    return { token, user };
  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const token = signToken(user);

    return { token, user };
  },

  saveBook: async (parent, args, context) => {
    if (contents.user) {
      const updateBooks = await User.findOneAndUpdate(
        {_id: context.user._id}, 
        { $addToSet: { savedBooks: args.bookInfo } },
        { new: true, runValidators: true }
      )
      return updateBooks; 
    }
    throw new AuthenticationError('Not logged in!')
  },
  
  

  deleteBook: async(parent, args, context) => {
    if (context.user) {
      const deletedBook = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: args.bookId } },
        { new: true }
      );
      return deletedBook;
    }
    throw new AuthenticationError('Not logged in!')
  }
    
}
 
};

module.exports = resolvers;