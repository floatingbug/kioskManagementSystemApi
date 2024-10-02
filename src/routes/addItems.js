function addItems({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}

async function handleRequest(param){
	const {req, res, store} = param;
	const collection = req.body.type;
	const docs = req.body.items;

	try{
		const result = store.addItems({collection, docs});
		
		if(!result){
			res.status(400);
			res.json({success: false, msg: "Bad Request."});
			return;
		}

		res.status(200);
		res.json({success: true, msg: "Items have been added."});
	}
	catch(err){
		console.log(err);
	}
}


module.exports = {addItems};
