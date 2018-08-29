const Discord = require("discord.js");
const errors = require("../utils/error.js");
module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return errors.noPerms(message, "MANAGE_MESSAGES");
  if (!kUser) return message.channel.send("Can't find user");
  let kReason = args.join(" ").slice(22);

  if (kUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("That person can't be kicked");

  let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField(
      "Kicked by",
      `<@${message.author.id}> with ID: ${message.author.id}`
    )
    .addField("Kicked In", message.chanel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(`name`, "incidents");
  if (!kickChannel)
    return message.channel.send("Can't find incidents channel.");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;
};

module.exports.help = {
  name: "kick"
};
