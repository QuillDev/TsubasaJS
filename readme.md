# Tsubasa.js
Tsubasa.js is a work in progress javascript rewrite of my C# Discord bot Tsubasa. The functionality 
is currently limited but much more is planned for the future.

## Installation Instructions

## [Tsubasa Help Site](https://quilldev.tech/tsubasa)
### Downloading the bot
```text
git clone https://github.com/QuillDev/TsubasaJS.git
cd TsubasaJS
npm install
npm start
```

### Setting up the config
#### File: .env
```dotenv
#Control Stuff
NODE_ENV=PRODUCTION

#Website Config
PORT=3000

#Discord Stuff
DISCORD_TOKEN_LIVE=THIS_IS_WHERE_YOUR_REALLY_LONG_TOKEN_GOES
DISCORD_TOKEN_TEST=THIS_IS_WHERE_YOUR_REALLY_LONG_TOKEN_GOES
DISCORD_PREFIX=t>

#Key for SauceNao
SAUCE_KEY=SAUCE_NAO_KEY_GOES_HERE
```

# TODO List

# Features
* Add an "Owner" to the player (only one that can shuffle, pause, etc).
* Add a majority vote system
* Override these limitations if you're admin (have manage channels perm)
* Add some sort of "Alias" system for commands
## New Commands
* t>shuffle - shuffles queue
* t>master - shows the current owner of the player

## WIP
### TsubasaLink
Write my own music streaming node system like Lavalink, Lavalink library has some issues with it that I don't exactly love - TsubasaLink? - Maybe just fork LavaLink and update some stuff? Shoukaku should still be able to connect! If not write a custom solution for that too?