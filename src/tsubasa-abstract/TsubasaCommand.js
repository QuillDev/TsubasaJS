class TsubasaCommand {

    /**
     * Constructor to be inherited
     * @param {Tsubasa} client
     */
    constructor(client) {
        this.client = client;
        if (this.constructor === TsubasaCommand) throw new TypeError("Abstract class \"TsubasaCommand\" cannot be instantiated directly.");
        else if (this.name === undefined) throw new TypeError("Classes extending TsubasaCommand must have a getter \"name\"");
        else if (this.usage === undefined) throw new TypeError("Classes extending TsubasaCommand must have a getter \"usage\"");
        else if (this.description === undefined) throw new TypeError("Classes extending TsubasaCommand must have a getter \"description\"");
        else if (this.run !== undefined) {
            if (this.run.constructor.name !== "AsyncFunction")
                throw new TypeError("Classes extending TsubasaCommand must implement \"run\" as async function");
        } else throw new TypeError("Classes extending TsubasaCommand must implement an async function \"run\"");
    }

    get permissions() {
        return null;
    }
}

module.exports = TsubasaCommand;