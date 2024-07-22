import { Resend } from 'resend';
import VerifyEmail from '@/emails/verifyEmail';
import { ApiResponse } from '@/types/ApiResponse';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'S-mart <onboarding@resend.dev>',
            to: email,
            subject: 'Verify your email',
            react: VerifyEmail({verifyCode, username}),
          });
        return {success:true, message:"Verification email send successfully"}
    }catch(err){
        console.error("Error in sending verification email");
        return {success:false, message:"Error in sending verification email"}
    }
}