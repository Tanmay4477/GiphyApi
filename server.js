const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const port = 3000;
const api_key = "fbfQOEaQ4XMH0jqKT5abRRJbZbOss7T3";
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/search", async(req, res) => {
    const q = req.query.query;
    const response = await axios.get("http://api.giphy.com/v1/gifs/search/", {
        params: {
            api_key,
            q,
            limit: 2,
        }
    });

    console.log(response.data["data"][0]["embed_url"]);
    res.status(200).json(response.data["data"][0]["embed_url"]);
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});