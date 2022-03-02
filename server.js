// Require Express.js
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
args['port']
const call = args.call
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.get('/app/', (req, res) => {
    // Respond with status 200
	res.statusCode = 200;
	// Respond with status message "OK"
		res.statusMessage = 'OK';
		res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
		res.end(res.statusCode+ ' ' +res.statusMessage)
});


function coinFlip() {
	return Math.random() > 0.5 ? ("heads") : ("tails")
}

app.get('/app/flip', (req, res) => {
	var flip = coinFlip()
	res.status(200).json({ 'flip' : flip})
}) 


app.get('/app/flips/:number', (req, res) => {
	const flips = manyflips(req.params.number)
	//Other
	//expressions
	//go
	//here
});


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

