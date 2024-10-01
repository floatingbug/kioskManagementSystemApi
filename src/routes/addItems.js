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
	}
	catch(err){
		console.log(err);
	}
}


module.exports = {addItems};
