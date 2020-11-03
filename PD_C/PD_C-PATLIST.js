const config = require("./config.json")

module.exports = {
    name: "PD_C-PATLIST",
    execute(message, args) {
        function PAT_L() {
            message.guild.roles.get(config.PATREON_ID).members.map(m=>m.user.tag).join("\n")
        }
        function PATplus_L() {
            message.guild.roles.get(config.PATREONPLUS_ID).members.map(m=>m.user.tag).join("\n")
        }
        message.channel.send(`**PATREON LIST**\n${PAT_L}`)
        message.channel.send(`**PATREON+ LIST**\n${PATplus_L}`)
    }
}