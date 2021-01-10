const Player = require("./Player");

class DeathRoll {

    /**
     * We assume that there are more than 1 player(s)
     * @param {Number} playerCount
     * @param {Number} max roll value
     */
    constructor(playerCount, max) {

        //create an array to store players in
        this.players = [];

        //start the roll at 10,000
        this.max = max;
        this.roll = this.max;

        //populate the list with new players
        for (let player = 0; player < playerCount; player++) {
            this.players.push(new Player(player + 1, this.roll));
            console.log("added player");
        }
    }

    /**
     * Start a game of deathroll
     */
    play() {

        //while we have more than 1 player (aka we don't have a winner)
        while (this.players.length > 1) {
            for (let player of this.players) {

                //have that player roll
                player.roll(this.roll);


                //get the value of their roll
                const roll = player.currentRoll;

                //get the index of the player
                console.log(`Player #${player.index} rolled: ${roll}`);

                //if the player rolled a 
                if (player.currentRoll == 1) {
                    //set the roll back to max
                    this.roll = this.max;
                    console.log(`Player #${player.index} eliminated`);
                    this.removePlayer(player)
                }

                //if there are only 2 players use that roll
                if(this.players.length == 2){
                    this.roll = roll;
                }
            }

            //if there is more than 2 players
            if (this.players.length > 2) {
                let sortedList = [...this.players].sort((a, b) => a.currentRoll - b.currentRoll);
                
                let player = sortedList[0];
                console.log(`Eliminated player ${player.index} because they had the lowest roll this round!`);

                this.roll = sortedList[0].currentRoll;
                this.removePlayer(sortedList[0]);
            }
        }
        console.log(`Player #${this.players[0].index} was victorious!`);
    }

    removePlayer(player){
        this.players.splice(this.getPlayerIndex(player), 1);
    }

    getPlayerIndex(player){
        return this.players.indexOf(player);
    }
}

module.exports = DeathRoll;