interface EmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  // Implement your email sending logic here
  // You can use services like SendGrid, AWS SES, etc.
  
  // Example using SendGrid:
  // const sgMail = require('@sendgrid/mail')
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  // await sgMail.send({
  //   to,
  //   from: process.env.FROM_EMAIL,
  //   subject,
  //   html
  // })
} 