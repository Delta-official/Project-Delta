const config = require("./config.json")

module.exports = {
    name: "PD_C-PATLIST",
    execute(message, args) {
        var PAT_L = message.guild.roles.get(config.PATREON_ID).members.map(m=>m.user.tag).join("\n")
        var PATplus_L = message.guild.roles.get(config.PATREONPLUS_ID).members.map(m=>m.user.tag).join("\n")
        message.channel.send(`**PATREON LIST**\n${PAT_L}`)
        message.channel.send(`**PATREON+ LIST**\n${PATplus_L}`)
    }
}