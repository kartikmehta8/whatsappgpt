function log(message) {
    console.log("[+] LOG : to: " + message.to + " from: " + message.from + " \nbody: " + message.body);
}

module.exports = log;