const express = require("express");
const api = express();
const bodyParser = require("body-parser");
const {getItems} = require("./routes/getItems");

function createApi({store}){

	api.use(bodyParser.json());

	api.get("/", (req, res) => {
		res.send("Kiosk Management System API");
	});
	api.get("/get-items", getItems({store}));


	return api;
}


module.exports = {createApi};
