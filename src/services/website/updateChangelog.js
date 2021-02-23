const fs = require("fs");
const {post} = require("got");

module.exports = updateChangelog = async () => {

    //read the changelog file
    let data = fs.readFileSync("CHANGELOG.md", "utf-8");

    //get valid lines from the file
    const lines = data.split("\n").filter(x => x.length > 0);

    //make an array for storing patches in
    const patches = [];

    //create vars for holding the headline, version, and description
    let version = "";
    let description = "";
    let headline = "";

    //iterate through each line in the file
    for (const line of lines) {
        if (line.startsWith("#") && !line.startsWith("##")) {
            version = line.split("# ")[1];
        }
        else if (line.startsWith("##")) {
            headline = line.split("## ")[1];
        } else {
            description = line;
        }

        //if we have a headline, lastline, and description
        if (headline.length !== 0 && version.length !== 0 && description.length !== 0) {
            patches.push({
                version,
                headline,
                description
            });
            version = headline = description = "";
        }
    }

    await post(`${process.env.URL}api/tsubasa/updateChangelogs`,
        {
            json: patches,
            headers: {
                "ACCESS-TOKEN": process.env.SESSION_SECRET
            }
        });
}