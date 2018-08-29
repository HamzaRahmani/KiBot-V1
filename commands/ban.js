const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  return message.channel.send("Can't Ban")
}

module.exports.help = {
  name: "ban"
}
