function validateItems(req, res, next){
	if(!req.body || Object.keys(req.body).length > 2 ||
		!req.body.type || !req.body.items ||
		!Array.isArray(req.body.items) || 
		req.body.items.length === 0 ||
		req.body.items.length > 100)
	{
		res.status(404).res.json({success: false, msg: "Invalid properties."}
		return;
	}



	next();
}
