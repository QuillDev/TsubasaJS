class TsubasaEventHandler {
    constructor(client) {
        this.client = client;

        //ready event
        this.client.once('ready', () => {
            this.client.logger.log(`Client logged in as ${this.client.user.username}`)
        });

        //message handler
        this.client.on('message', (msg) => this.commandHandler.resolve(msg));
    }
}

//export the event handler
module.exports = {
    TsubasaEventHandler: TsubasaEventHandler
}