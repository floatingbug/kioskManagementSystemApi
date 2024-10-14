async function validateCredentials(req, res, next){
	if(!req.body.name || !req.body.email || !req.body.password){
		res.status(400).json({success: false, msg: "Not all required credentials provided."});
		return;
	}

	if(	typeof req.body.name !== "string" ||
		typeof req.body.password !== "string")
	{
		res.status(400).json({success: false, msg: "Wrong data-type in credentials."});
		return;
	}

	//validate email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(!emailRegex.test(req.body.email)){
		res.status(400).json({success: false, msg: "Not a valid e-mail address."});
		return;
	}

	next();
}


module.exports = {validateCredentials};
