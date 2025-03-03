import nodemailer from 'nodemailer';
const { public: config } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const token = await getCookie(event, 'token');

  if (!token) return new Response('Unauthorized', { status: 401 });
  
  const getApp = () => (config.apps as []).find((app: {name: string, token: string}) => app.token === token);

  const app = getApp();

  if (!app) return new Response('Unauthorized', { status: 401 });

  const { 
    user: mailUser,
    pass: mailPass,
    to,
    smtp: mailSmtp,
    port: mailPort,
    secure: mailSecure 
  } = app;

  const { from, subject, message } = data;

  const mailOptions = {
    to: process.env.NODE_ENV === 'production' ? to : 'test@mail.com',
    subject,
    text: `${from} says: \n${message}`,
  };

  const transport = nodemailer.createTransport({
    host: process.env.NODE_ENV === 'production' ? mailSmtp : config.mailtrap.host,
    port: process.env.NODE_ENV === 'production' ? mailPort : config.mailtrap.port,
    secure: process.env.NODE_ENV === 'production' ? mailSecure : false,
    auth: {
      user: process.env.NODE_ENV === 'production' ? mailUser : config.mailtrap.auth.user,
      pass: process.env.NODE_ENV === 'production' ? mailPass : config.mailtrap.auth.pass,
    },
  });

  const response = await transport.sendMail(mailOptions);
  
  return response.messageId ? 'Mail sent' : 'There was an error sending the mail';
});