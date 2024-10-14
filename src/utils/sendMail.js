const nodemailer = require("nodemailer");

async function sendMail(param){
	const {email, confirmId} = param;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for port 465, false for other ports
		auth: {
			user: process.env.GMAIL_ADDRESS,
			pass: process.env.GMAIL_PASSWORD,
		},
	});

	try{
		const result = await transporter.sendMail({
			from: "kioskManager",
			to: email, // list of receivers
			subject: "Confirmation for KioskManager", // Subject line
			html: `<span> please click on <a href="${process.env.SERVER_URL}/sign-up?confirmId=${confirmId}">this link<a/> to confirm your e-mail.</span>`, // html body
		});
		return result;
	}
	catch(err){
		throw err;
	}
}


module.exports = {sendMail};
