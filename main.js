const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    console.log("Woas");
});
 
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})

client.on('message', async message => {
	const a= await message.getChat();
    console.log(a.isGroup);
    console.log(message.body);
});
client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
});
 
client.initialize();



