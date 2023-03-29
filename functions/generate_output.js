const request = require("request");
const dotenv = require("dotenv");

dotenv.config();

function generate_output(client, message, language, code) {
    var program = {
        script : code,
        language: language,
        versionIndex: "0",
        clientId: process.env.COMPILER_CLIENT_ID,
        clientSecret:process.env.COMPILER_CLIENT_SECRET
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
    function (error, response, body) {
        client.sendMessage(message.from, body.output);
    });
}

module.exports = generate_output;