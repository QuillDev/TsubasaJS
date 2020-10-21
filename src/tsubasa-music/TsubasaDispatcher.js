class TsubasaDispatcher {
    /**
     * Constructor for a Tsubasa Audio dispatcher
     * @param {*} options
     */
    constructor(options) {
        this.client = options.client;
        this.guild = options.guild;
        this.text = options.text;
        this.player = options.player;
        this.queue = [];
        this.current = null;

        //on the player start event send messages to the text channel we"re bound to
        this.player.on("start", () => {
            this.text.send(this.client.embedHelper.createEmbed("Tsubasa - Music", `Now Playing: **${this.current.info.title}**`))
                .catch(() => null);
        });

        //when a song ends try to play the next track, if that fails then destroy it.
        this.player.on("end", () => {
            this.play()
                .catch(err => {
                    this.queue.length = 0;
                    this.destroy();
                    this.client.logger.error(err);
               })
        });

        //Iterate through the player types
        for(const playerEvent of ["closed", "error", "nodeDisconnect"]) {

            //on a player event check if it was an error and destroy it
            this.player.on(playerEvent, data => {
                //if the data is an error or an object log it
                if(data instanceof Error || data instanceof Object) {
                    this.client.logger.error(data);
                }

                //set the queue length to 0 and destroy it
                this.queue.length = 0;
                this.destroy();
            });
        }
    }

    /**
     * Get whether the guild exists in the queue
     * @returns {Boolean} whether the guild is in the queue
     */
    get exists(){
        return this.client.queue.has(this.guild.id);
    }

    /**
     * Play the next song in the queue on the player
     * @returns {Promise<*>}
     */
    async play() {

        //TODO was a || !queue.length here btw
        //if this doesn't exist or if the queue length is 0 then destroy the player
        if(!this.exists){
            return this.destroy();
        }

        //set the current track to the first one in the queue, then shift it
        this.current = this.queue.shift();

        //if current is null, destroy the player
        if(!this.current){
            this.destroy();
            return;
        }

        //play the current track
        await this.player.playTrack(this.current.track);
    }

    destroy(reason){
        //log that we destroyed the dispatcher
        this.client.logger.debug(this.constructor.name, `Destroyed the player dispatcher for guild ${this.guild.name}: ID: "${this.guild.id}"`);

        //if there was a reason, log that reason
        if(reason){
            this.client.logger.debug(this.constructor.name, `Destroyed the player dispatcher for guild ${this.guild.name}: ID: "${this.guild.id}"`);
        }

        //set back to defaults
        this.queue.length = 0;
        this.player.disconnect();

        //log that we disconnected
        this.client.logger.debug(this.player.constructor.name, `Destroyed the player dispatcher for guild ${this.guild.name}: ID: "${this.guild.id}"`);

        //remove this guild from the queueing system
        this.client.queue.delete(this.guild.id);

        //send a message to the channel about leaving due to the queue
        this.text.send(this.client.embedHelper.createEmbed("Tsubasa - Music", "Left the channel because the queue has been emptied!"))
            .catch(() => null);
    }
}

module.exports = TsubasaDispatcher;