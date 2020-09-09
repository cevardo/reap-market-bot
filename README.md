# [REAP] RESPECT Market Ticket Bot

This is an on going implemenation of a market bot system for Discord. The project currently uses Node.js with Discord.js on the server side to interact with a Discord server bot. An accompanying web application is included on the roadmap.

Feel free to reach out in game or on the [REAP] Respect Discord server if you have any questions and have fun!

## Local Development
### Prerequisite Installs
- Node.js (NPM)
- Git
- Typescript CLI
- A text editor (VSCode, Sublime, Atom, vim, etc)
- Database client (optional)

### Setup
1. Clone our git repo to your file system
    ```
    cd /path/to/your/workspace
    git clone https://github.com/cevardo/reap-market-bot.git
    ```
1. Install project dependencies
    ```
    cd reap-market-bot
    npm i
    ```
1. Copy the .env.example file and paste in the project root directory
1. Rename the copied file to ".env"
    ### NEVER CHECK IN OR EXPOSE THE DISCORD BOT TOKEN PUBLICLY !!!
  - Reach out to Steve009, Kery, or hamSLAMwich to get the Bot token
  - Your .env file will not be checked into the repo
  - Market Channel ID is sourced from the Discord server's Chat Category ID. 

    A Category is the collapsible group that chat channels are listed under (ie: "Text Channels").

    Enabling [Discord Developer Mode](https://discordia.me/en/developer-mode#:~:text=Enabling%20Developer%20Mode%20is%20easy,the%20toggle%20to%20enable%20it.)

  - Database variables prefixed with "DB_" are for your local development environment only and can be left unchanged
1. Start the [REAP] Market Bot to log it into all servers it has been invited to and get crackin!
    ```
    npm start
    ```


## Invite Bot to a Server
To add a Bot, first generate an [invite URL](https://discordapi.com/permissions.html)

**Current Permissions**
- Read Messages
- Send Messages
- Read Message History
- Mention @everyone, @here, and all Roles
- Add Reactions