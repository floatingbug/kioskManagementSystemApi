function sendServerError(param){
	const {res} = param;

	res.status(500);
	res.json({success: false, msg: "Internal server error."});
}


module.exports = {sendServerError};
