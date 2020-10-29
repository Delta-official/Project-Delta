const fs = require("fs")
const config = require("./PD_C/config.json")
const Discord = require('discord.js')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const PD_C = fs.readdirSync("./PD_C").filter(file => file.endsWith(".js"));

for(const file of PD_C) {
    const command = require(`./PD_C/${file}`)
    client.commands.set(command.name, command)
}
let Lpass
client.on('ready', () => {
    console.log("Project ∆ active, awaiting input...")
    client.user.setActivity("Stratzenblitz | s.help")
    
    // just a comment
    client.guilds.fetch(STRATZ_SERVER_ID).then((stratzGuild) => {
        Lpass = stratzGuild.roles.cache.find(Lpass => Lpass.id === "438553700492115968");
    });
})

if (!message.content.startsWith(prefix) || message.author.bot) return;

let canNotifyStreaming = true;

client.on("presenceUpdate", (oldPresence, newPresence) => {
    if(newPresence.user.id === config.LORD_ID) {
    if(newPresence.guild.id === config.STRATZ_SERVER_ID) {
    if (!newPresence.activities) return false;
    newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
            if (canNotifyStreaming) {
                if(activity.url.startsWith("www.youtube.com")) {
                    itsYOUTUBESTREAMTIME();
                    canNotifyStreaming = false;
                    setTimeout(() => { canNotifyStreaming = true; }, 86400000);
                } else if(activity.url.startsWith("www.twitch.tv")) {
                    itsSTREAMTIME();
                    canNotifyStreaming = false;
                    setTimeout(() => { canNotifyStreaming = true; }, 86400000);
                }
            }
        };
    });
   }
 }
});

const prefix = "!"

client.on('message', async(message) => {
    if (message.author.bot) return;

if (message.content.startsWith(prefix)) {
    const args = message.content.toLowerCase().split(' ');
    const command = args.shift().slice(prefix.length);
    if(command === "loungepass") {
        client.commands.get("PD_C-LP").execute(message, args)
    }
    if(command === "help") {
        client.commands.get("PD_C-HELP").execute(message, args)
    }
}
})
function itsSTREAMTIME() {
    client.channel.id.get(config.NEWS_ID).send(`Hey <@everyone>, Stratzenblitz is streaming at ${activity.url}!`)
}
function itsYOUTUBESTREAMTIME() {
    client.channel.id.get(config.NEWS_ID).send(`Hey everyone, Stratzenblitz is streaming at ${activity.url}!`)
}

client.login(process.env.token)