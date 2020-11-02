//                                                                  
// ,adPPYba,  88,dPYba,,adPYba,   ,adPPYba,  ,adPPYb,d8 ,adPPYYba,  
// a8"     "8a 88P'   "88"    "8a a8P_____88 a8"    `Y88 ""     `Y8  
// 8b       d8 88      88      88 8PP""""""" 8b       88 ,adPPPPP88  
// "8a,   ,a8" 88      88      88 "8b,   ,aa "8a,   ,d88 88,    ,88  
//  `"YbbdP"'  88      88      88  `"Ybbd8"'  `"YbbdP"Y8 `"8bbdP"Y8  
//                                            aa,    ,88             
//                                             "Y8bbdP"         

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
    client.guilds.fetch(config.STRATZ_SERVER_ID).then((stratzGuild) => {
        Lpass = stratzGuild.roles.cache.find(Lpass => Lpass.id === "438553700492115968");
    });
})
client.on("guildMemberUpdate", (oldMember, newMember) => {
    if(newMember.guild.id === config.STRATZ_SERVER_ID) {
        if(newMember.roles.cache.has(config.PATREON_ID) || newMember.roles.cache.has(config.PATREONPLUS_ID)) {
            newMember.roles.add(Lpass)
            client.channels.cache.get("425119273313370123").send(`Welcome to the Stratzen Lounge ${newMember.displayName}!\nTake a seat in one of our bean bags or grab a soda or cookies from our vending machines.`)
        } else if(newMember.roles.cache.has(Lpass)) {
            client.channels.cache.get("425119273313370123").send("Thank you for supporting Stratzenblitz again!")
        }
    }
})

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

client.on("presenceUpdate", (oldPresence, newPresence) => {
    if(newPresence.user.id === config.MB_ID) {
        if(newPresence.server.id === config.DEVSER_ID) {
            if (oldPresence.status !== newPresence.status) {
                if(newPresence.status === "online") {
                    client.guild.channel.id.get("772288906200481813").send("<@508632222245322793> Bot is online!")
                }
                if(newPresence.status === "offline") {
                    client.guild.channel.id.get("772288906200481813").send("<@508632222245322793> Bot is offline")
                }
            }
        }
    }
});

const prefix = "s."

client.on('message', async(message) => {
    if (message.author.bot) return;

if (message.content.startsWith(prefix)) {
    const args = message.content.toLowerCase().split(' ');
    const command = args.shift().slice(prefix.length);
    if(command === "help") {
        client.commands.get("PD_C-HELP").execute(message, args)
    }
    if(command === "patronlist") {
        client.commands.get("PD_C-PATLIST").execute(message, args)
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