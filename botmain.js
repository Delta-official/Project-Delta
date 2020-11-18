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
const BIRD_LINKS = require("./Bird links.json")

let BIRD_LIST = ["https://cdn.discordapp.com/attachments/773929540527194133/773929672021901342/owl-05.jpg",
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
"https://cdn.discordapp.com/attachments/733968268867403796/774280579155492894/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/774281662217453578/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/774284048733306920/unknown.png",
"https://cdn.discordapp.com/attachments/527012837055266837/774284540297609276/unknown.png",
"https://cdn.discordapp.com/attachments/527012837055266837/774286061597753344/unknown.png",
"https://cdn.discordapp.com/attachments/527012837055266837/774286852382523452/manbjv45rii21.png",
"https://cdn.discordapp.com/attachments/527012837055266837/774303395355557908/unknown.png",
"https://cdn.discordapp.com/attachments/527012837055266837/774302418526535710/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/775734273704853554/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/775734747297087498/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/775735211148836874/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/775735412429160459/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/775736292360060948/unknown.png",
"https://cdn.discordapp.com/attachments/733968268867403796/775736522778869790/unknown.png"]

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
            welcometothekoolgang()
        } else if(newMember.roles.cache.has(Lpass)) {
            client.channels.cache.get("425119273313370123").send("Thank you for supporting Stratzenblitz again!")
        }
    }
    }
})

client.on("guildMemberAdd", (member) => {
    if(member.user.id === config.OWNER2_ID) {
        client.channels.cache.get("527013908922368001").send("Welcome back Bread!")
    }
})

let canNotifyStreaming = true;
let canPNotifyStreaming = true;

client.on("presenceUpdate", (oldPresence, newPresence) => {
    if(newPresence.user.id === config.LORD_ID) {
        console.log("Check 2 passed")
    if(newPresence.guild.id === config.STRATZ_SERVER_ID) {
        console.log("Check 3 passed")
        if (newPresence.activities) {
            newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
            console.log("Check 4 passed")
            if (canNotifyStreaming) {
                console.log("Check 5 passed")
                itsYOUTUBESTREAMTIME();
                canNotifyStreaming = false;
                setTimeout(() => { canNotifyStreaming = true; }, 86400000);
            }
        };
    });
   }
}
}
});

/*client.on("presenceUpdate", (oldPresence, newPresence) => {
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
});*/

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
        message.channel.send(`birb\r${BIRD_LIST[Math.floor(Math.random() * BIRD_LIST.length)]}`)
    }
    if(command === "allowstreamnotify") {
        if(IsOwner(message.member)) {
        canNotifyStreaming = true
        console.log(canNotifyStreaming)
        message.channel.send("canNotifyStreaming is set to true")
        }
    }
}
})
function itsSTREAMTIME() {
    client.channels.cache.get(config.NEWS_ID).send(`Hey <@everyone>, Stratzenblitz is streaming at ${activity.url}!`)
}
function itsYOUTUBESTREAMTIME() {
    client.channels.cache.get(config.NEWS_ID).send(`Hey everyone, Stratzenblitz is streaming at ${Discord.Activity.url}!`)
}
function welcometothekoolgang() {
    client.channels.cache.get("425119273313370123").send(`Welcome to the Stratzen Lounge <${newMember.id}>!\nTake a seat in of our bean bags or grab a soda or cookies from our vending machines. ᴰᵃʳᵏᵘˢˢ ʷᵉˡᶜᵒᵐᵉˢ ʸᵒᵘ ᵗᵒᵒ`)
}
function isPatron(member) {
    return member.roles.cache.has(config.PATREON_ID) || member.roles.cache.has(config.PATREONPLUS_ID);
}
function IsOwner(member) {
    return member.id === OWNER_ID || OWNER2_ID;
}

client.login(process.env.token)