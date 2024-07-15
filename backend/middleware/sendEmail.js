import nodemailer from "nodemailer";

const sendEmail = async (options)=>{
    // const transporter = nodeMailer.createTransport({
    //     host:process.env.SMTP_HOST,
    //     port:process.env.SMTP_PORT,
    //     auth:{
    //         user:process.env.SMTP_MAIL,
    //         pass:process.env.SMTP_PASS
    //     },
    //     service : process.env.SMTP_SERVICE
    // })

    // Using mailtrap.com
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d36f3ecd5fa921",
          pass: "e1d7497a9ccd4a"
        }
      });
    
    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmail;