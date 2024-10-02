function validateItems(req, res, next){
	if(!req.body || Object.keys(req.body).length > 2 ||
		!req.body.type || !req.body.items ||
		!Array.isArray(req.body.items) ||
		req.body.items.length === 0 ||
		req.body.items.length > 200)
	{
		res.status(404).json({success: false, msg: "Invalid properties."});
		return;
	}

	const isValidItems = req.body.items.every(item => {
		if(typeof item !== "object") return false;
	});

	if(!isValidItems){
		res.status(404)
		res.json({success: false, msg: "Invalid properties in items."});
		return;
	}
	
	next();
}


module.exports = {validateItems};
