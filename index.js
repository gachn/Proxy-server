const fetch = require('node-fetch');
const config = require('config');
const express = require('express')
const app = express();
const port = config.get("port");

app.use(express.json());

//Allow cors middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// forward request 
app.use('/', (req, res) => {
    const { method, headers, body } = req;
    const endpoint = req.url;
    headers.host = headers.origin = config.get("origin");
    fetch(config.get("url") + endpoint, {
        method,
        headers,
        body: method === "POST" ? JSON.stringify(body) : undefined
    }).then(response => response.json())
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        });
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))