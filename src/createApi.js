const express = require("express");
const api = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {signUp} = require("./routes/signUp");
const {validateCredentials} = require("./middleware/validateCredentials");
const {signIn} = require("./routes/signIn");
const {addItems} = require("./routes/addItems");
const {getItems} = require("./routes/getItems");
const {validateItems} = require("./middleware/validateItems");


function createApi({store}){

	api.use(express.json());
	api.use(cors({
		origin: "*",
		allowedHeaders: ["Content-Type", "Authorization"]
	}));

	

	api.get("/get-items", getItems({store}));

	api.post("/add-items", validateItems, addItems({store}));
	api.post("/sign-up", validateCredentials, signUp({store}));
	api.get("/sign-up", signUp({store}));
	api.post("/sign-in", signIn({store, jwt}));

	return api;
}


module.exports = {createApi};
