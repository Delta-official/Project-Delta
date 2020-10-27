const Discord = require('discord.js')
const fs = require("fs")

const LP_ID = '438553700492115968'
const PATREON_ID = "425130907809218562"
const PATREONPLUS_ID = "425902812606758922"
const NEWS_ID = "527010080948879387"


const client = new Discord.Client()
client.commands = new Discord.Collection()

const PD_C = fs.readdirSync("./PD_C").filter(file => file.endsWith(".js"));

for(const file of PD_C) {
    const command = require(`./PD_C/${file}`)
    client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log("Project ∆ active, awaiting input...")
    client.user.setActivity("Stratzenblitz | s.help")
    
    
    client.guilds.fetch(STRATZ_SERVER_ID).then((stratzGuild) => {
        Lpass = stratzGuild.roles.cache.find(Lpass => Lpass.id === "438553700492115968");
    });
})

let canNotifyStreaming = true;

client.on("presenceUpdate", (oldPresence, newPresence) => {
    if(newPresence.user.id === LORD_ID) {
    if(newPresence.guild.id === STRATZ_SERVER_ID) {
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

const prefix = "s."

if (message.content.startsWith(prefix)) {
    const args = message.content.toLowerCase().split(' ');
    const command = args.shift().slice(prefix.length);
    if(command === "loungepass") {
        client.commands.get("PD_C-LP").execute(messages, args)
    }
    if(command === "help") {
        client.commands.get("PD_C-HELP").execute(messages, args)
    }
}
function itsSTREAMTIME() {
    client.channel.id.get(NEWS_ID).send(`Hey <@everyone>, Stratzenblitz is streaming at ${activity.url}!`)
}
function itsYOUTUBESTREAMTIME() {
    client.channel.id.get(NEWS_ID).send(`Hey everyone, Stratzenblitz is streaming at ${activity.url}!`)
}

client.login(process.env.token)