import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{
    interface User{
        _id?:string;
        isVerified?:boolean;
        verifyCode?:string;
        email?:string;
        imageLogo?:string;
        username?:string;
    }
    interface Session{
        user:{
            _id?:string;
            isVerified?:boolean;
            verifyCode?:string;
            email?:string;
            imageLogo?:string;
            username?:string;
        } & DefaultSession['user']
    }
    interface JWT{
        _id?:string;
        isVerified?:boolean;
        verifyCode?:string;
        email?:string;
        imageLogo?:string;
        username?:string;
    }
}