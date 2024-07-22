const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server);

const transporter = nodemailer.createTransport({
    host: process.env.smtp_server,
    port: process.env.smtp_port,
    auth: {
        user: process.env.smtp_username,
        pass: process.env.smtp_password,
    },
    tls: {
        rejectUnauthorized: false // Enable SSL certificate validation
    }
});

const welcomeMail = async (req, res) => {
    const recipientName = `${req.firstName} ${req.lastName}`;
    const mailOptions = {
        from: process.env.smtp_username,
        to: req.email,
        subject: 'Welcome to Northpoint Tracking Tool',
        // html: `
        // <!DOCTYPE html>
        // <html>
        //     <head>
        //         <title>Northpoint Tracking Tool</title>
        //     </head>
        //     <body style="font-family: sans-serif; margin: 0; padding: 0;">
        //         <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; border-collapse: collapse;">
        //             <tr>
        //                 <td style="padding: 20px; text-align: center;">
        //                     <h1 style="margin: 0;">Northpoint Tracking Tool</h1>
        //                     <img src="cid:northpointwelcome_img" alt="Northpoint Tracking Tool" style="width: 100%; max-width: 500px; height: auto; border: 0;"/>
        //                     <a href="https://example.com/" target="_blank" style="text-decoration: none;">
        //                         <button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Login to my account</button>
        //                     </a>
        //                 </td>
        //             </tr>
        //         </table>
        //     </body>
        // </html>
        // `,
        
        // html: `
        // <!DOCTYPE html>
        // <html>
        //     <head>
        //         <title>Northpoint Tracking Tool</title>
        //         <style>
        //             body {
        //                 font-family: Arial, sans-serif;
        //                 margin: 0;
        //                 padding: 0;
        //             }
        //             .container {
        //                 max-width: 600px;
        //                 margin: auto;
        //                 padding: 20px;
        //                 border: 1px solid #e0e0e0;
        //                 border-radius: 10px;
        //                 text-align: center;
        //                 background-color: #ffffff;
        //             }
        //             .button {
        //                 display: inline-block;
        //                 padding: 10px 20px;
        //                 background-color: #007bff;
        //                 color: white;
        //                 border: none;
        //                 border-radius: 5px;
        //                 margin-top: 20px;
        //                 cursor: pointer;
        //                 text-decoration: none;
        //                 font-size: 16px;
        //             }
        //             .footer {
        //                 margin-top: 20px;
        //                 font-size: 12px;
        //                 color: #666;
        //             }
        //             .footer a {
        //                 color: #007bff;
        //                 text-decoration: none;
        //             }
        //         </style>
        //     </head>
        //     <body>
        //         <div class="container">
        //             <h1 style="margin: 0;">Northpoint Tracking Tool</h1>
        //             <p>Hello ${recipientName},</p>
        //             <p>Welcome to Northpoint Tracking Tool! We are excited to have you on board.</p>
        //             <p>Northpoint Tracking Tool helps you plan, track, and manage your projects efficiently. Collaborate with your team and stay organized.</p>
        //             <img src="cid:northpointwelcome_img" alt="Northpoint Tracking Tool" style="width: 100%; max-width: 500px; height: auto; border: 0; margin: 20px 0;"/>
        //             <a href="https://example.com/" target="_blank" class="button">Login to my account</a>
        //             <p>If you have any questions or need support, feel free to <a href=${process.env.smtp_username}>contact us</a>.</p>
                    // <div style="margin-top: 20px; font-size: 12px; color: #666;">
                //     <p>&copy; 2024 Northpoint Tracking Tool. All rights reserved.</p>
                //     <p><a href="#" style="color: #007bff; text-decoration: none;">Unsubscribe</a> | <a href="#" style="color: #007bff; text-decoration: none;">Privacy Policy</a></p>
                // </div>
        //         </div>
        //     </body>
        // </html>
        // `,
        html: `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Northpoint Tracking Tool</title>
            </head>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h1 style="margin: 0;">Northpoint Tracking Tool</h1>
                            <p>Hello ${recipientName},</p>
                            <p>Welcome to Northpoint Tracking Tool! We are excited to have you on board.</p>
                            <p>Northpoint Tracking Tool helps you plan, track, and manage your projects efficiently. Collaborate with your team and stay organized.</p>
                            <img src="cid:northpointwelcome_img" alt="Northpoint Tracking Tool" style="width: 100%; max-width: 500px; height: auto; border: 0; margin: 20px 0;"/>
                            <a href="https://example.com/" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; font-size: 16px;">Login to my account</a>
                            <p>If you have any questions or need support, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
        `,
        attachments: [{
            filename: 'northpointwelcome_img.png',
            path: 'D:/Northface Jira Application/northpointwelcome_img.png', 
            cid: 'northpointwelcome_img'
        }]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        // res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(`Failed to send welcome email to ${req.email}: ${error}`);
        throw error; 
    }
};


const invitationLink = async (req, res) => {
    try {
        const { emails } = req.body; // Assuming emails is an array of email addresses

        try {
            // Loop through the emails and send an invitation to each
            for (const email of emails) {
                const inviteLink = `https://example.com/invite?token=${generateToken(email)}`;
                await sendInvitationEmail(email, inviteLink);
            }
            res.status(200).send('Invitations sent successfully');
        } catch (error) {
            res.status(500).send(`Error sending invitations. ${error}`);
        }
    } catch (error) {
        res.status(500).send(`Error Occurred - ${error}`);
    }
}

// Function to generate a unique token for the invite link
function generateToken(email) {
    // Generate a unique token.
    return Buffer.from(email).toString('base64');
}

function toTitleCase(str) {
    return str.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
}

// Function to send the invitation email
async function sendInvitationEmail(email, inviteLink) {
    // const nameFromEmail = email.split('@')[0].replace('.', ' ');
    // const nameInTitleCase = toTitleCase(nameFromEmail);
    const mailOptions = {
        from: process.env.sender_email,
        to: email,
        subject: 'You\'ve been invited to Northpoint Tracking Tool',
        html: `
        <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; border: 1px solid #e0e0e0; border-radius: 10px;">
                <img src="cid:northfacein_logo" alt="Northpoint Tracking Tool" style="width: 200px; margin-bottom: 15px;" />
                <h1 style="color: #333; margin: 0 0 10px;">You've been invited to Northpoint Tracking Tool</h1>
                <p style="color: #666; margin: 0 0 20px;">Start planning and tracking work with your team. You can share your work and view what your team is doing.</p>
                <a href="${inviteLink}" id="acceptButton" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #0052cc; border-radius: 5px; text-decoration: none;">
                    Accept Invite
                </a>
            </div>
            </body>
        </html>
        `,
        attachments: [{
            filename: 'northfacein_logo.png',
            path: 'D:/Northface Jira Application/northfacein_logo.png', 
            cid: 'northfacein_logo'
        }]
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`Failed to send invitation email to ${email}: ${error}`);
        throw error; 
    }
}

const acceptInvitation = async (req, res) => {
    const { email } = req.params;
    const nameFromEmail = email.split('@')[0].replace('.', ' ');
    const nameInTitleCase = toTitleCase(nameFromEmail);

    // Notify the frontend via WebSocket (if needed)
    io.emit('inviteAccepted', { name: nameInTitleCase, email });

    // Serve the acceptance page
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invitation Accepted</title>
          <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; text-align: center; }
              #acceptButton { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #0052cc; border-radius: 5px; text-decoration: none; }
              #acceptButton.accepted { color: white; background-color: green; cursor: default; }
              .message { color: green; font-size: 24px; }
          </style>
      </head>
      <body>
          <a id="acceptButton" href="#" onclick="return false;">Accept Invite</a>
          <p class="message">Thank you for accepting the invitation!</p>

          <script>
              document.addEventListener('DOMContentLoaded', function() {
                  const button = document.getElementById('acceptButton');
                  button.textContent = 'Accepted';
                  button.classList.add('accepted');
              });
          </script>
      </body>
      </html>
    `);
};



module.exports = { welcomeMail, invitationLink, acceptInvitation };
