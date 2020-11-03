const config = require("./config.json")
const Discord = require("discord.js")

module.exports = {
    name: "PD_C-PATLIST",
    execute(message, args) {
        const PAT_L_EMB = new Discord.MessageEmbed()
        .setDescription(`**PATREON LIST**\n${message.guild.roles.cache.get(config.PATREON_ID).members.map(m=>m.user.mention).join("\n")}\n**PATREON+ LIST**\n${message.guild.roles.cache.get(config.PATREONPLUS_ID).members.map(m=>m.user.mention).join("\n")}`)
        message.channel.send(PAT_L_EMB)
    }
}