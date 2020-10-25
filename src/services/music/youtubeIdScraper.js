/**
 * Gets a youtube ID from a youtube URL
 * @param {String} url
 */
function getId(url) {

    //If it's a youtu.be url
    if (url.includes("youtu.be")) {
        let domain = "youtu.be/";

        //if the url contains no addition arguments
        if (!url.includes("?")) {
            return url.substring(url.indexOf(domain) + domain.length, url.length)
        }

        return url.substring(url.indexOf(domain) + domain.length, url.indexOf("?"));
    }

    //If it's a youtube.com domain
    else if (url.includes("youtube.com")) {

        //if there's no v= in the url
        if (!url.includes("v=")) {
            return null;
        }

        //if there's no additional data tags
        if (!url.includes("&")) {
            return url.substring(url.indexOf("v=") + 2, url.length);
        } else if (url.includes("?v=")) {
            return url.substring(url.indexOf("v=") + 2, url.indexOf("&"));
        }

        return url.substring(url.indexOf("v=") + 2, url.length);
    }

    return null;
}

module.exports = getId;