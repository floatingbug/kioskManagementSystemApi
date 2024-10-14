const {randomUUID} = require("crypto");
const {sendMail} = require("../utils/sendMail");
const {sendServerError} = require("../utils/sendServerError");
const bcrypt = require("bcrypt");

function signUp({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}




async function handleRequest(param){
	const {req, res, store} = param;

	//if query confirmId is provided, confirm email
	if(req.query.confirmId){
		const filter = {
			confirmId: req.query.confirmId
		};
		const update = {
			$set: {
				isEmailConfirmed: true
			},
			$unset: {
				confirmId: ""
			}
		}
	
		try{
			const result = await store.confirmEmail(filter, update);
			if(!result){
				res.status(400).json({success: false, msg: "Fail to confirm email. Please try again"});
				return;
			}

			console.log(process.env.CLIENT_URL);

			res.status(200);
			res.redirect(`${process.env.CLIENT_URL}/sign-in`);
			return;
		}
		catch(err){
			sendServerError({res, err});
			return;
		}
	}
	

	//check if name or email exists already
	try{
		const query = {
			$or: [
				{name: req.body.name},
				{email: req.body.email}
			]
		};

		const user = await store.getUser(query);
		if(user){
			res.status(400).json({success: false, msg: "Name or email exists already."});
			return;
		}
	}
	catch(err){
		sendServerError({res, err});
		return;
	}

	//add user to db
	const confirmId = randomUUID();
	try{
		const hashedPwd = await bcrypt.hash(req.body.password, 10);
		
		const doc = {
			userId: randomUUID(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPwd,
			isEmailConfirmed: false,
			confirmId
		};
		
		const result = await store.addUser(doc);
		
		if(!result){
			res.status(500).json({success: false, msg: "Fail to add user. Please try again."});
			return;
		}
	}
	catch(err){
		return sendServerError({res, err});
	}

	//send confirmation email
	try{
		const result = await sendMail({email: req.body.email, confirmId});
	}
	catch(err){
		return sendServerError({res, err});
	}

	res.status(200).json({success: true, msg: "Please confirm your e-mail."});
}


module.exports = {signUp};
