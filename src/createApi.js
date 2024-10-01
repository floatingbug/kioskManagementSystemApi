const express = require("express");
const api = express();
const {addItems} = require("./routes/addItems");
const {getItems} = require("./routes/getItems");

function createApi({store}){

	api.use(express.json());

	api.get("/", (req, res) => {
		res.send("Kiosk Management System API");
	});
	api.get("/get-items", getItems({store}));

	api.post("/add-items", addItems({store}));

	return api;
}


module.exports = {createApi};
