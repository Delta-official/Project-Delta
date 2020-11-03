const Discord = require("discord.js")

module.exports = {
    name: "PD_C-HELP",
    execute(message, args) {
        const H_EMD = new Discord.MessageEmbed()
        .setColor("#24556a")
        .setTitle("Commands")
        .setDescription("Bot made by Darkuss")
        .addFields(
            { name: "patronlist", value: "Lists all patreon members", inline: true}
        )
        message.channel.send(H_EMD)
    }
}