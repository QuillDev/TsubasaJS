class Player {

    constructor(index, maxRoll){
        this.currentRoll = maxRoll;
        this.index = index;
    }

    /**
     * //TODO
     * Make sure this returns a value from 1-maxroll 
     * @param {Number} maxRoll max value the roll can be 
     */
    roll(maxRoll) {
        //set their current roll to the new value
        this.currentRoll = Math.floor(Math.random() * maxRoll)+1;
    }

    /**
     * Get the current roll for this player;
     */
    getCurrentRoll(){
        return this.currentRoll;
    }
}

module.exports = Player;