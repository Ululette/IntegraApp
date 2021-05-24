const { EMAIL_USER, EMAIL_PASS } = process.env
const nodemailer = require("nodemailer");


export default function sendNodeMailer(to, subject, text, htmlBody) {
    async function main() {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        let callBack = (err, data) => {
            if (err) {
                console.log("error occurs at send message: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            } else {
                // Preview only available when sending through an Ethereal account
                console.log("message sent: %s", info.messageId, 'data:', data);
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
        }

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: EMAIL_USER, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html: htmlBody || null, // html body
        }, callBack);

        

    }

    main().catch(console.error);
}