import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const { public: config } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  
  const token = await getHeader(event, 'sr_token');

  if (!token) return new Response('Unauthorized', { status: 401 });

  const payload = jwt.verify(token, config.mailHelperJWTSecret as string) as {
    name: string;
    email: string;
    subject: string;
    config: {
      from: string,
      to: string,
      host: string,
      port: number,
      secure: boolean,
      user: string,
      pass: string,
    }
  };

  const mailOptions = {
    from: payload.config.from,
    to: process.env.NODE_ENV === 'production' ? payload.config.to : 'test@mail.com',
    subject: data.subject,
    text: `${payload.email} says: \n${data.message}`,
    attachments: [],
  } as {
    from: string;
    to: string;
    subject: string;
    text: string;
    attachments: { filename: string; content: Buffer }[];
  };

  data.attachments.forEach((attachment: { filename: string, data: Buffer }) => {
    mailOptions.attachments.push({
      filename: attachment.filename,
      content: Buffer.from(attachment.data),
    });
  });

  const transport = nodemailer.createTransport({
    host: process.env.NODE_ENV === 'production' ? payload.config.host : config.mailtrap.host,
    port: process.env.NODE_ENV === 'production' ? payload.config.port : config.mailtrap.port,
    secure: process.env.NODE_ENV === 'production' ? payload.config.secure : false,
    auth: {
      user: process.env.NODE_ENV === 'production' ? payload.config.user : config.mailtrap.auth.user,
      pass: process.env.NODE_ENV === 'production' ? payload.config.pass : config.mailtrap.auth.pass,
    },
  });

  const response = await transport.sendMail(mailOptions);
  
  return response.messageId ? 'Mail sent' : 'There was an error sending the mail';
});