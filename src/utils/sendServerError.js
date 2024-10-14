function sendServerError(param){
	const {res, err} = param;

	console.log(err);

	res.status(500);
	res.json({success: false, msg: "Internal server error."});
}


module.exports = {sendServerError};
