const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0";
const client = new MongoClient(uri);
const db = client.db("kioskManagementSystem");

const store = {
	client,
	db,
	addItems,
	getItems,
}

async function getItems({collection, query, filter}){
	const coll = this.db.collection(collection);

	try{
		const cursor = await coll.find(query);
		
		if(filter.start) cursor.skip(filter.start);
		if(filter.end) cursor.limit(filter.end - filter.start);

		const items = await cursor.toArray();
		return items;
	}
	catch(err){
		console.log("Error in file store.js in function getitems");
		throw err;
	}
}

async function addItems({collection, docs}){
	const coll = this.db.collection(collection);

	try{
		const result = await coll.insertMany(docs);
		return result.insertedCount > 0 ? true : false;
	}
	catch(err){
		console.log(err);
		throw err;
	}
}


module.exports = {store};
