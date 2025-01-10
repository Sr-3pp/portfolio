export default defineEventHandler(async (event) => {
  const { data } = await readBody(event);
  const cookie = await getCookie(event, 'token');
  const { from, to, subject, content } = data;

  const mailOptions = {
    from,
    to,
    subject,
    text: content,
  };

console.log(mailOptions)

  return true;
});