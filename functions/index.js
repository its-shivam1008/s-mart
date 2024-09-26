/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
admin.initializeApp();

// Configure Nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail or another service (e.g., SMTP, Outlook, etc.)
  auth: {
    user: "your-email@gmail.com", // Your email
    pass: "your-email-password", // Your email password or app password if using Gmail
  },
});

// Cloud function to send email
exports.sendOtpEmail = functions.https.onRequest(async (req, res) => {
  const { email, otp } = req.body; // Expect email and OTP to be passed in the request

  // Your email template with the OTP embedded
  const emailTemplate = `
    <Body style={
    backgroundColor: "#fff",
    color: "#212121",
  }>
          <Container style={
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee",
  }>
            <Section style={ backgroundColor: "#fff" }>
              <Section style={
    backgroundColor: "#252f3d",
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "center",
  }>
                <Img
                  src=''
                  width="75"
                  height="45"
                  alt="S-mart Logo"
                />
              </Section>
              <Section style={ padding: "25px 35px" }>
                <Heading style={
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",{
    color: "#2754C5",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
  }>Verify your email address</Heading>
                <Text style={mainText}>
                  Hello {username}, Thanks for starting the new S-mart account creation process. We
                  want to make sure it's really you. Please enter the following
                  verification code when prompted. If you don&apos;t want to
                  create an account, you can ignore this message.
                </Text>
                <Section style={
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }>
                  <Text style={verifyText}>Verification code</Text>
  
                  <Text style={
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
    fontWeight: "bold",
    fontSize: "36px",
    margin: "10px 0",
    textAlign: "center" as const,
  }>{verifyCode}</Text>
                  <Text style={
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
    margin: "0px",
    textAlign: "center" as const,
  }>
                    (This code is valid for 10 minutes)
                  </Text>
                </Section>
              </Section>
              <Hr />
              <Section style={ padding: "25px 35px" }>
                <Text style={cautionText}>
                  S-mart will never email you and ask you to disclose
                  or verify your password, credit card, or banking account number.
                </Text>
              </Section>
            </Section>
            <Text style={
    color: "#333",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    margin: "24px 0",
    fontSize: "12px",
    padding: "0 20px",
  }>
              This message was produced and distributed by S-mart,
              Inc., Kanpur. Uttar Pradesh. © 2024, S-mart, Inc.. All rights reserved. S-mart is a registered trademark
              of{" "}
              <Link href="https://amazon.com" target="_blank" style={
    color: "#2754C5",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
  }>
                S-mart
              </Link>
              , Inc. View our{" "}
              <Link href="https://amazon.com" target="_blank" style={
    color: "#2754C5",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    textDecoration: "underline",
  }>
                privacy policy
              </Link>
              .
            </Text>
          </Container>
        </Body>
  `;

  const mailOptions = {
    from: "your-email@gmail.com", // Sender address
    to: email, // Receiver's email address
    subject: "Email Verification OTP", // Subject of the email
    html: emailTemplate, // Use your template with embedded OTP
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).send("Failed to send OTP email");
  }
});
