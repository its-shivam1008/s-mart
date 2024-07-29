import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{
    interface User{
        _id?:string;
        role?:string;
        userId?:string;
        isVerified?:boolean;
        verifyCode?:string;
        email?:string;
        imageLogo?:string;
        username?:string;
        role?:string;
    }
    interface Session{
        user:{
            _id?:string;
            role?:string;
            userId?:string;
            isVerified?:boolean;
            verifyCode?:string;
            email?:string;
            imageLogo?:string;
            username?:string;
            role?:string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string;
        role?:string
        userId?:string;
        isVerified?:boolean;
        verifyCode?:string;
        email?:string;
        imageLogo?:string;
        username?:string;
        role?:string;
    }
}