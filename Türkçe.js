const Discord = require("discord.js");
const got = require("got");

module.exports.run = async (bot, message, args) => {
  if (!message.guild) return;
  const embed = new Discord.MessageEmbed();
  got("https://www.reddit.com/r/dankmemer/random/.json")//Subretidi Değişebilirsiniz Eğer Beğenmesieniz
    .then(response => {
      const [list] = JSON.parse(response.body);
      const [post] = list.data.children;

      const permalink = post.data.permalink;
      const güzelmemeurl = `https://reddit.com${permalink}`;
      const resim = post.data.url;
      const başlık = post.data.title;
      const beğeni = post.data.ups;
      const sayı = post.data.num_comments;
      const ödül = post.data.total_awards_received;
      embed.setTitle(`${başlık}`);
      embed.setURL(`${güzelmemeurl}`);
      embed.setColor("RANDOM");
      embed.setImage(`${resim}`);
      embed.setFooter(
        `Bu Gönderi 👍 ${beğeni} Beğeni 💬 ${sayı} Ve 🏆 ${ödül} Ödüle Sahip.`
      );

      message.channel.send(embed);
    })
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["meme"],
  permLevel: 0
};

exports.help = {
  name: "meme",
  description: "İstediğiniz yaziyi yaz",
  usage: "prefix yaz yazı"
};
