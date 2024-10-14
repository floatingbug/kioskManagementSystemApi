const {MongoClient} = require("mongodb");
const uri = process.env.MONGO_ATLAS_URL;
const client = new MongoClient(uri);
const db = client.db("kioskManagementSystem");

const store = {
	client,
	db,
	addUser,
	confirmEmail,
	getUser,
	addItems,
	getItems,
}

async function addUser(doc){
	const coll = this.db.collection("user");

	try{
		const result = await coll.insertOne(doc);
		return result.acknowledged ? true : false;
	}
	catch(err){
		console.log("Error in file store.js in function addUser");
		throw err;
	}
}

async function confirmEmail(filter, update){
	const coll = this.db.collection("user");

	try{
		const result = await coll.updateOne(filter, update);
		return result.modifiedCount > 0 ? true : false;
	}
	catch(err){
		console.log("Error in file store.js in function confirmEmail");
		throw err;
	}
}

async function getUser(query){
	const coll = this.db.collection("user");

	try{
		const user = await coll.findOne(query);
		return user;
	}
	catch(err){
		console.log("Error in file store.js in function getUser");
		throw err;
	}
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
		console.log("Error in file store.js in function addItems");
		throw err;
	}
}


module.exports = {store};
