const Discord = require("discord.js")
const config = require("./config.json")

module.exports = {
    name: "PD_C-LP",
    execute(message, args) {
        if(message.guild.id === config.STRATZ_SERVER_ID) {
            if(message.member.roles.cache.has(config.PATREON_ID || PATREONPLUS_ID)) {
                member.roles.add(Lpass)
                message.channel.send('*Welcome to the Stratzen Lounge!*');
        } else if(!message.member.roles.cache.has(PATREON_ID || PATREONPLUS_ID)) {
        message.channel.send("*You need to have a Patreon or Patreon+ role in order to get Lounge Pass!*")
        } else if(message.member.roles.cache.has(LP_ID)) {
            message.channel.send("*You already have Lounge Pass!")
    }
    } 
    }
}