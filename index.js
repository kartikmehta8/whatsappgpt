const qrcode = require('qrcode-terminal');
const dotenv = require("dotenv");
const { Client, LocalAuth } = require('whatsapp-web.js');

const generate_output = require('./functions/generate_output');
const log = require('./functions/log');
const ask = require('./functions/ask');

dotenv.config();

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
		args: ['--no-sandbox'],
	}
});

// qr code auth for first time
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', async message => {
    
    // Consoling to-from-data
    log(message);

    // trigger command extraction
    let trigger = message.body.split(' ')[0];

    // chatgpt response
	if(trigger === '/ask') {

        let response = await ask(message.body);
		client.sendMessage(message.from, response.data.choices[0].text);

	}
    else if (trigger == "/execute") {

        // extracting language & code
        let text = message.body.split(' ');
        let language = text[1];
        let code = text.slice(2);
        code = code.join(' ');

        generate_output(client, message, language, code);
    }
});

// listening for messages
client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();