import nodemailer from "nodemailer"


export async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 3000,
    secure: true,
    service: "gmail",
    auth: {
      user: "do2167846@gmail.com",
      pass: "yfkj dnsk jjzy gedg"
    }
  })
  const info = await transporter.sendMail({
    from: "do2167846@gmail.com",
    to,
    subject,
    html,
  })

  if (info.accepted.length > 0) return true;
  return false
}
// "davidosamamilad@gmail.com"
// "test"
// "hi from node mailer"
