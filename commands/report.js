const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let rUser =  message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return message.channel.send("Couldn't find user.");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor("#15f153")
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)  //hide id later  on
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)  //hide id later on
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)  //timestamp
  .addField("Reason", reason);

  let reportsChannel = message.guild.channels.find(`name`, "logs");  //deinfes/assigns report channel
  if(!reportsChannel) return message.channel.send("Couldn't find reports channel.");

  message.delete().catch(O_o=>{}); //deletes last message
  reportsChannel.send(reportEmbed);
}

module.exports.help = {
  name: "report"
}
