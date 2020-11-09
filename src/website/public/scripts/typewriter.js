var words = ["play lag train", "skip", "hentai hanekawa tsubasa", "play milabo zutomayo", "help", "playing", "queue", "play study me zutomayo", "play sugar sweet nightmare", "play umbra stella"];
var i = 0;
var speed = 200;
var prefix = "t>";

/**
 * Write word in typewriter style 
 */
function typeWriter(word) {
    if (i < word.length) {
        document.getElementById("typewriter").innerHTML += word.charAt(i);
        i++;
        setTimeout(function () {
            typeWriter(word)
        }, 100);
    } else {
        backup(word)
    }
}

function backup(word) {
    if (i >= 0) {
        document.getElementById("typewriter").innerHTML = prefix + word.substring(0, i)+ "";
        i--;
        setTimeout(function () {
            backup(word)
        }, 30);
    } else {
        typeWriter(getRandom());
    }
}

function getRandom() {
    let word = words[~~(words.length * Math.random())];
    return word;
}

function startWriter() {
    typeWriter(getRandom());
}

window.onload = startWriter;