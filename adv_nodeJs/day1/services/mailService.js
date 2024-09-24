const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deepakmanikandan67@gmail.com',
        pass: 'txuy zvjb wdlb ddga'
    }
})

const sendMail = (to, subject, text, html) => {
    const mailOptions = {
        from: 'deepakmanikandan67@gmail.com',
        to,
        subject,
        text,
        html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
        }
        else{
            console.log('Email sent:' + info.response);
            
        }
    })
}

module.exports = {sendMail}