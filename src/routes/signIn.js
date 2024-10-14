const {sendServerError} = require("../utils/sendServerError");
const bcrypt = require("bcrypt");

function signIn({jwt, store}){
	return (req, res) => {
		handleRequest({req, res, jwt, store});
	};
}


async function handleRequest(param){
	const {req, res, jwt, store} = param;

	//check if body is valid
	if(!req.body.nameOrEmail || !req.body.password ||
		typeof req.body.nameOrEmail !== "string" ||
		typeof req.body.password !== "string" ||
		Object.keys(req.body).length > 2)
	{
		return res.status(400).json({success: false, msg: "Invalid data-types."});
	}

	//get user 
	let user = null;
	try{
		const query = {
			$or: [
				{name: req.body.nameOrEmail},
				{email: req.body.nameOrEmail}
			]
		};

		user = await store.getUser(query)
		if(!user){
			return res.status(400).json({success: false, msg: "User not found."});
		}
		
		const isPwdCorrect = await bcrypt.compare(req.body.password, user.password);
		if(!isPwdCorrect){
			return res.status(400).json({success: false, msg: "Password is incorrect."});
		}

	}
	catch(err){
		return sendServerError({res, err});
	}

	//create and send token
	const tokenPayload = {
		userId: user.userId,
		name: user.name,
		email: user.email
	};
	const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);

	res.status(200).json({success: true, msg: "Token has been send in body.", token});
}


module.exports = {signIn};
