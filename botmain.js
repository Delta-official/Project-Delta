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

let BIRD_LIST = [
    "https://cdn.discordapp.com/attachments/773929540527194133/773929672021901342/owl-05.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773929672463351818/image-3.gif", 
    "https://cdn.discordapp.com/attachments/773929540527194133/773929753374883870/91943b9f4fb275b2cd147e12bb307581.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773929804373557269/bird_fast.gif",
    "https://cdn.discordapp.com/attachments/773929540527194133/773929883779858512/unknown.png",
    "https://cdn.discordapp.com/attachments/773929540527194133/773930431774589008/giphy.gif",
    "https://cdn.discordapp.com/attachments/773929540527194133/773930432064258048/47d89e49583bcba6dd3ee5f147775367.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773930432349077544/MOxPZ4F.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773930432592871424/IMG_20190217_152641.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773930432805863434/P4ScrZK.png",
    "https://cdn.discordapp.com/attachments/773929540527194133/773930433104052275/pollero.png",
    "https://cdn.discordapp.com/attachments/773929540527194133/773930433830322176/abirdofprey.gif",
    "https://cdn.discordapp.com/attachments/773929540527194133/773931104565985290/ElofXFtX0AIF00S.png",
    "https://cdn.discordapp.com/attachments/773929540527194133/773931104813318144/IMG_20201101_194017.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773931105086341120/IMG_20201031_222458.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773931105359233095/ec6e3934d75deff575774d208a919c6d.jpg",
    "https://cdn.discordapp.com/attachments/773929540527194133/773931105635663903/image0-20.png",
    "https://cdn.discordapp.com/attachments/773929540527194133/773931105937391666/FB_IMG_1585676154854.jpg",
    "https://cdn.discordapp.com/attachments/733968268867403796/774279931735441468/unknown.png",
    "https://cdn.discordapp.com/attachments/733968268867403796/774280579155492894/unknown.png"
    ]

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
    if (isPatron(newMember) && !isPatron(oldMember)) {
    if(newMember.guild.id === config.STRATZ_SERVER_ID) {
        if(newMember.roles.cache.has(config.PATREON_ID) || newMember.roles.cache.has(config.PATREONPLUS_ID)) {
            newMember.roles.add(Lpass)
            client.channels.cache.get("425119273313370123").send(`Welcome to the Stratzen Lounge ${newMember.displayName}!\nTake a seat in one of our bean bags or grab a soda or cookies from our vending machines. ᴰᵃʳᵏᵘˢˢ ʷᵉˡᶜᵒᵐᵉˢ ʸᵒᵘ ᵗᵒᵒ`)
        } else if(newMember.roles.cache.has(Lpass)) {
            client.channels.cache.get("425119273313370123").send("Thank you for supporting Stratzenblitz again!")
        }
    }
    }
})

let canNotifyStreaming = true;
let canPNotifyStreaming = true;

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
                    client.guild.channels.id.get("772288906200481813").send("<@508632222245322793> Bot is online!")
                }
                if(newPresence.status === "offline") {
                    client.guild.channels.id.get("772288906200481813").send("<@508632222245322793> Bot is offline")
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
    if(command === "bird" || command === "birb") {
        message.channel.send(BIRD_LIST[Math.floor(Math.random() * BIRD_LIST.length)])
    }
}
})
function itsSTREAMTIME() {
    client.channel.id.get(config.NEWS_ID).send(`Hey <@everyone>, Stratzenblitz is streaming at ${activity.url}!`)
}
function itsYOUTUBESTREAMTIME() {
    client.channel.id.get(config.NEWS_ID).send(`Hey everyone, Stratzenblitz is streaming at ${activity.url}!`)
}
function isPatron(member) {
    return member.roles.cache.has(config.PATREON_ID) || member.roles.cache.has(config.PATREONPLUS_ID);
}

client.login(process.env.token)