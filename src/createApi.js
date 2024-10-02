const express = require("express");
const api = express();
const {addItems} = require("./routes/addItems");
const {getItems} = require("./routes/getItems");
const {validateItems} = require("./middleware/validateItems");

function createApi({store}){

	api.use(express.json());

	api.get("/", (req, res) => {
		res.send("Kiosk Management System API");
	});
	api.get("/get-items", getItems({store}));

	api.post("/add-items", validateItems, addItems({store}));

	return api;
}


module.exports = {createApi};
