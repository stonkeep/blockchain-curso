const express = require('express');
const Blockchain = require('../blockchain')
const bodyParser = require('body-parser');
const P2pServer = require('./p2p-server');


const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(bodyParser.json());
const bc = new Blockchain();

app.get('/blocks', (req, res) => {
	res.json(bc.chain);
});

app.post('/mine', (req, res) => {
	const block = bc.addBlock(req.body.data);
	console.log(`New block added: ${block.toString()}`);
	p2pServer.syncChains();
	res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
const p2pServer = new P2pServer(bc);

p2pServer.listen();


