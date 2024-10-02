const {sendServerError} = require("../utils/sendServerError");

function getItems({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}


async function handleRequest(param){
	const {req, res, store} = param;

	//validate request
	const result = validateQueries(req.query);

	if(!result.success){
		res.status(400);
		res.json(result);
		return;
	}

	//get items
	try{
		//collection
		const collection = req.query.type;

		//query
		const query = {};
		if(req.query.genre) query.genre = req.query.genre;

		//filter
		const filter = {};
		if(req.query.start) filter.start = Number(req.query.start);
		if(req.query.end) filter.end = Number(req.query.end);

		const items = await store.getItems({collection, query, filter});

		if(items.length === 0){
			res.status(404);
			res.json({success: false, msg: "No items found matching the specified type."});
			return;
		}

		res.status(200);
		res.json({success: true, msg: "Request was successful.", items});
	}
	catch(err){
		console.log(err);
		sendServerError({res});
	}
}

function validateQueries(queries){
	if(!queries.type || queries.type.trim() === "" ||
		queries.start && queries.start.trim() === "" ||
		queries.end && queries.end.trim() === ""
	){
		return {success: false, msg: "Invalid query parameters, such as missing or malformed type."};
	}

	return {success: true};
}


module.exports = {getItems};
