const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      //get a user by username
      me: async (parent, args, context) => {
        if(context.user) {
            const userData = await User.findOne({_id: context.user._id}).populate('savedBooks')
            return userData;
        }else{
            throw new AuthenticationError('Please login first')
        }

       

     },
    },
  
    Mutation: {
      
    },

  };
  
  module.exports = resolvers;