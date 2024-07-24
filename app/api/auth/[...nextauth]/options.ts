import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/Db/Db";
import UserModel from "@/models/User";


export const authOptions:NextAuthOptions = {
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID? process.env.GITHUB_ID : "abc",
          clientSecret: process.env.GITHUB_SECRET? process.env.GITHUB_SECRET : "abc"
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID?process.env.GOOGLE_CLIENT_ID:"abc",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET?process.env.GOOGLE_CLIENT_SECRET:"abc"
        })
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials}){
        if(account?.provider == 'github' || account?.provider == 'google'){
            await dbConnect();
            // checks if the user is present in the db or not 
            // const client = mongoose.connect("mongodb://localhost:27017/GetMeATip");
            const currentUser = await UserModel.findOne({email:user.email});
            // console.log(currentUser);
            if(!currentUser){
              // if the user is not present create a new user.
              
              const newUser = new UserModel({
                email:user.email,
                name:user.name,
                imageLogo:user.image,
                username:user.email?.split('@')[0],
                signUpWith:account.provider
              })      
              
              await newUser.save();

              // user.name = newUser.username
            }else{
              user.username = currentUser.username
              user._id = currentUser._id?.toString()
              user.isVerified = currentUser.isVerified
            }
          }
          return true;
      },
      async jwt({ token, user}) {
        
        return token
      },
      async session({ session, user, token }) {
        // const dbUser = await UserModel.findOne({email: session.user.email})

        session.user.username = user.username
        session.user._id = user._id
        session.user.isVerified = user.isVerified
        return session;
      }
    }
}