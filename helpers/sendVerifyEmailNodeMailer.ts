import { ApiResponse } from '@/types/ApiResponse';
import VerifyEmail from '@/emails/verifyEmail';
import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';

export async function sendVerificationEmailNodeMailer(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,      // Your Gmail address from env
                pass: process.env.GMAIL_PASS,      // App-specific password from env
              },
          });
        //   console.log(' done ye chal gya')
          // Set up email options
          const mailOptions = {
            from: process.env.GMAIL_USER,      // Sender address
            to: email,                         // Receiver's email address
            subject: 'Your OTP Code',          // Email subject
            html: `
        <div>
            <h1>Hello, ${username}</h1>
            <p>Your OTP code is: <strong>${verifyCode}</strong></p>
        </div>
    `, // HTML body of the email
          };
        //   console.log('ho gya done ye chal gya')
          // Send the email
          await transporter.sendMail(mailOptions as Options);
        //   console.log('finally')
        return {success:true, message:"Verification email send successfully"}
    }catch(err){
        console.error("Error in sending verification email");
        return {success:false, message:"Error in sending verification email"}
    }
}