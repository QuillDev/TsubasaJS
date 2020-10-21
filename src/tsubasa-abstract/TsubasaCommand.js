class TsubasaCommand {

    /**
     * Constructor to be inherited
     * @param {Tsubasa} client
     */
    constructor(client) {
        this.client = client;
        if (this.constructor === TsubasaCommand) throw new TypeError("Abstract class \"TsubasaCommand\" cannot be instantiated directly.");
        if (this.name === undefined) throw new TypeError("Classes extending TsubasaCommand must have a getter \"name\"");
        if (this.usage === undefined) throw new TypeError("Classes extending TsubasaCommand must have a getter \"usage\"");
        if (this.description === undefined) throw new TypeError("Classes extending TsubasaCommand must have a getter \"description\"");
        if (this.run !== undefined) {
            if (this.run.constructor.name !== "AsyncFunction")
                throw new TypeError("Classes extending TsubasaCommand must implement \"run\" as async function");
        } else throw new TypeError("Classes extending TsubasaCommand must implement an async function \"run\"");
    }

    get permissions() {
        return null;
    }
}

module.exports = TsubasaCommand;