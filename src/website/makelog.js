const path = require('path');
var Promise = require('bluebird');
const Path = require("path");
var fs = Promise.promisifyAll(require('fs'));

const changelogpath = path.join("..", "TsubasaJS", "CHANGELOG.md");

//TODO Remove
updateChangelog();

async function updateChangelog() {
    const markdownRaw = await fs.readFileAsync(changelogpath, {
        encoding: "utf-8"
    });
    const lineArray = markdownRaw.split("\n");

    const resultArray = [];
    let latest = "";

    for (let index = 0; index < lineArray.length; index++) {
        const line = lineArray[index];

        //if the line is empty return <br>
        if (line === "") {
            resultArray.push("<br>");
            continue;
        }

        //get the linecontent (excludes bullet points, etc)
        const lineContent = line.substring(2);

        //if we have a header line
        if (line.includes("#")) {

            //Find version
            if (line.match(/v(\d+.\d+.\d+)/)) {
                const description = lineArray[lineArray.indexOf(line) + 1].substring(2);
                resultArray.push(`<version> <button class="btn latest-button">${lineContent}</button>${description}</version></h1>`)
                index++;
                continue;

            }

            resultArray.push(`<h1> ${lineContent} </h1>`);

            continue;
        }

        //if the line has a bullet indicator
        if (line.includes("* ")) {
            resultArray.push(`<li>${lineContent}</li>`);
            continue;
        }

        resultArray.push( `<p>${line}</p>`);
    }

    //Base data to use on every web page
    const baseData =
        `
    <header>
        <title> Tsubasa Patch Notes </title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="/public/css/basic.css" type="text/css">
    </header>

    <html lang="en">
        <body style="margin: 1em">
            <div style="text-align: center;"> 
                <h1> Tsubasa Patch Notes - Latest: ${latest} </h1> 
                <a href="../tsubasa/"><button class="btn btn-dark"> Command Help Page </button></a>
            </div>
            <br>
    `;

    const suffix =
        `
        </body>
    </html>
    <div style="text-align: center;"> <p> Tsubasa Project - 2020 </p> </div>
    `

    const webpage = baseData.concat(resultArray.join("\n"), suffix);

    //write the change log locally
    fs.writeFileSync(Path.join(__dirname, "public", "pages", "changelog.htm"), webpage);
}


module.exports = {
    updateChangelog: updateChangelog,
}