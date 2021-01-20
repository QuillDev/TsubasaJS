class Player {

    constructor(maxRoll, member){
        this.currentRoll = maxRoll;
        this.username = member.username;
        this.member = member;
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
}

module.exports = Player;