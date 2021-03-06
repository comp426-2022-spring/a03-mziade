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

function coinFlips(flips) {
	const arr = []
	for(let i = 1; i <= flips; i++) {
	  arr.push(Math.random() > 0.5 ? ("heads") : ("tails"))
	}
	return arr
}

function countFlips(array) {
	const Tab = {tails: 0, heads: 0}
	for(let i = 0; i < array.length; i++) {
	  if(array[i] == "heads"){
		Tab.heads = Tab.heads + 1
	  } else {
		Tab.tails = Tab.tails + 1
	  }
	}
	if(Tab.heads == 0){
	  delete Tab.heads
	} if(Tab.tails ==0){
	  delete Tab.tails
	}
	return(Tab)
}
app.get('/app/flips/:number', (req, res) => {
	const flips = coinFlips(req.params.number)
	res.status(200).json({ 'raw': flips, "summary" : countFlips(flips)})
});

function flipACoin(call) {
	const Tab = {call: "", flip: "", result: ""}
	Tab.call = call
	Tab.flip = Math.random() > 0.5 ? ("heads") : ("tails")
	if(Tab.call == Tab.flip){
	  Tab.result = "win"
	} else {
	  Tab.result = "lose"
	}
	return Tab
}

app.get('/app/flip/call/heads', (req, res) => {
	res.status(200).json(flipACoin("heads"))
});

app.get('/app/flip/call/tails', (req, res) => {
	res.status(200).json(flipACoin("tails"))
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

