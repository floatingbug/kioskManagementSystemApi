const {store} = require("./src/store/store");
const {createApi} = require("./src/createApi");
const api = createApi({store});
const http = require("http");
const server = http.createServer(api);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log("Server listen on port: ", PORT);
});
