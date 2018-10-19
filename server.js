const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.login("");

let globalRes;
client.on('ready', () => {
  console.log('I am ready!');
});
client.on('message', message => {
  message.channel.send("")
});

client.on('ready', () => { client.user.setActivity('rl_commands'); });

client.on('message', msg => {
  if (msg.content === 'RL') {
    msg.reply('LR');
  }
});


client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "dev")) {
    message.channel.send("This bot is currently under development. Please check back for a full command list later~! :heart:");
  }
  else
  if (message.content.startsWith(config.prefix + "Regal")) {
    message.channel.send("Lords~ :heart:");
  }
  else
  if (message.content.startsWith(config.prefix + "despacito")) {
    message.channel.send("https://www.youtube.com/watch?v=kJQP7kiw5Fk");
  }
});
client.on("message", (message) => { // RL APPLICATION
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "rl")) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Regal Lords Application",
        url: "https://goo.gl/UW3Vra",
        description: "This is an application to join the guild!",
        fields: [{
            name: "This bot was made by SeanXS for Regal Lords!",
            value: "Requirements: 2 6/8+ and 2.5k+ Alive Fame and ability to voice chat~! :heart:"
          },
          {
            name: "Our Realmeye",
            value: "You can view our guild's [realmeye](https://www.realmeye.com/guild/Regal%20Lords) here."
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© SeanXS"
        }
      }
    });
  }
});
client.on("message", (message) => { // beta information
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.content.startsWith(config.prefix + "info")) {
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Shiina Bot",
        description: "This is a moderation bot created by SeanXS for Regal Lords~! :heart:",
        fields: [{
            name: "This bot was added for alpha testing 9/28/18",
            value: "Scheduling for beta testing is 11/12/18"
          },
          {
            name: "Our Guild Discord",
            value: "You can join our guild's [discord](https://www.discord.gg/CdjMcFE) here."
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© SeanXS"
        }
      }
    });
  }

});

client.on("message", (message) => { // guild time awesome
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.content.startsWith(config.prefix + "gt")) {

    message.channel.send({
      embed: {

        title: "Guild time @everyone",
        color: 16711851,
        timestamp: new Date(),
        footer: {
          icon_url: "https://static.drips.pw/rotmg/wiki/Untiered/Crown.png",
          text: "© SeanXS"
        },

        author: {
          name: client.user.username,
          icon_url: "https://static.drips.pw/rotmg/wiki/Untiered/Crown.png"
        },
        fields: [{
            value: "<:Knight:495325916671770629> <:trickster:495325747360170002> <:mystic:495325916587622420> <:warrior:495325746760253441> <:assasin:495325916562587658> <:samurai:495325747125288979> <:necromancer:495325916570976259> <:paladin:495323551977570304> <:sorcerer:495325747192528906> <:ninja:495325916340158464> <:wizard:495325916487090177> <:huntress:495325916373712903> <:priest:495325747091865621> <:rogue:495325747150454794> <:archer:495325916524707850>",
            name: "Please react with what class you plan on bringing!"
          },
          {
            name: "Please react with what keys you plan on bringing!",
            value: "<:shatts:414531281045553152> <:tomb:414531316252672002> <:OT:414531354479296516> <:LH:495441189521326080>"
          },
          {
            name: "Vial <:Bial:449730425670336512>",
            value: "React if you have a vial!",
            inline: true
          },
          {
            name: "Not coming <:RIP:410553121509605386>",
            value: "React if you aren't attending today!",
            inline: true
          }


        ]

      }


    }).then((msg) => {
      msg.react(client.emojis.get('495325916671770629')); // knight
      msg.react(client.emojis.get('495325747360170002')); // trickster
      msg.react(client.emojis.get('495325916587622420')); // mystic
      msg.react(client.emojis.get('495325746760253441')); // warrior
      msg.react(client.emojis.get('495325916562587658')); // assasin
      msg.react(client.emojis.get('495325747125288979')); // samurai 
      msg.react(client.emojis.get('495325916570976259')); // necromancer
      msg.react(client.emojis.get('495323551977570304')); // paladin
      msg.react(client.emojis.get('495325747192528906')); // sorcerer
      msg.react(client.emojis.get('495325916340158464')); // ninja
      msg.react(client.emojis.get('495325916487090177')); // wizard
      msg.react(client.emojis.get('495325916373712903')); // huntress
      msg.react(client.emojis.get('495325747091865621')); // priest
      msg.react(client.emojis.get('495325747150454794')); // rogue
      msg.react(client.emojis.get('495325916524707850')); // archer
      msg.react(client.emojis.get('449730425670336512')); // vial
      msg.react(client.emojis.get('410553121509605386')); // RIP
      msg.react(client.emojis.get('414531281045553152')); // Shatters Key
      msg.react(client.emojis.get('414531316252672002')); // tomb Key
      msg.react(client.emojis.get('414531354479296516')); // OT key
      msg.react(client.emojis.get('495441189521326080')); // LH key
      // if(reaction.emoji.name === "<:knight:495325916671770629>") {

      //  }
    })

  }
  //const knight = client.emojis.get("<:Knight:495325916671770629>");
  //message.react("<:Knight:495325916671770629>");



  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.content.startsWith(config.prefix + "elist")) { // emotelist!
    const emojiList = message.guild.emojis.map(e => e.toString()).join(" ");
    message.channel.send(emojiList);
  }

  if (message.content.startsWith(config.prefix + "commands")) { // command list
    message.channel.send({
      embed: {

        title: "Command List",
        color: 16711851,
        timestamp: new Date(),
        footer: {
          icon_url: "http://pngimage.net/wp-content/uploads/2018/05/command-png-2.png",
          text: "© SeanXS"
        },

        author: {
          name: client.user.username,
          icon_url: "https://static.drips.pw/rotmg/wiki/Untiered/Crown.png"
        },
        fields: [{
            name: "rl_dev",
            value: "states current development of the bot~! :hammer_pick:"
          },
          {
            name: "rl_elist",
            value: "States all custom emotes in the server~! :no_good:"
          },
          {
            name: "rl_info",
            value: "States the bot's information and amazing creator~! :slight_smile:"
          },
          {
            name: "rl_despacito",
            value: "Alexa play despacito"
          },
          {
            name: "rl_gt",
            value: "Calls out guild time for everyone to know! (only use it if you are in #gt_callouts ) :two_hearts: "
          },
          {
            name: "rl_rl",
            value: "Gives information bout the guild :dragon_face: "
          }
        ]
      }
    });
  }
});

client.on("message", (message) => { // role giving cx
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.startsWith(config.prefix + "grole")) {
    var args = message.content.toLowerCase().split(" ");
    console.log(args);
  }
  
});






// wrong"
