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
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return {token, user};
        },

        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
    
        },

        // Add a third argument to the resolver to access data in our `context`
        saveBook: async (parent, { book }, context) => {
            // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
            if (context.user){
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true }
                    //runValidators: true
                );
            }
              
            throw new AuthenticationError('Please login first to save books');
            
          },

          removeBook: async (parent, { bookId }, context) => {
            if (context.user){
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
        
            }
              
            throw new AuthenticationError('Please login first to to remove books');
           
          },

    },

  };
  
  module.exports = resolvers;