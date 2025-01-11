const { public: config } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  const token = await getCookie(event, 'token');
  const { from, to, subject, content } = data;

  const mailOptions = {
    from,
    to,
    subject,
    text: content,
  };

  return {
    mailOptions,
    token,
  };
});