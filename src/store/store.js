const {MongoClient} = require("mongodb");
const uri = "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0";
const client = new MongoClient(uri);
const db = client.db("kioskManagementSystem");

const store = {
	client,
	db,
	getItems,
}

async function getItems(query){

}


module.exports = {store};
