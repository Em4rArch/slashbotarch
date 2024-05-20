const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const db = require("croxydb")
const moment = require('moment');
const keep_alive = require('./keep_alive.js')
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });
console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(process.env.TOKEN)

client.on("guildMemberAdd", async (member) => {
  const rol = db.get(`otorol_${member.guild.id}`)

  setTimeout(function(){
    if(!rol) return;
    member.roles.add(rol).catch(() => {})
},1500)

   const kayıtsızNick = "Isim | Yaş" == "" ? null : "Isim | Yaş"
   
   if (kayıtsızNick) await member.setNickname(kayıtsızNick)
   
   const arrow = member.guild.emojis.cache.find(emoji => emoji.name === 'Verify');
   const verify = member.guild.emojis.cache.find(emoji => emoji.name === 'Verify');

   const embed = new Discord.EmbedBuilder()
   .setColor("#0080FF")
   .setAuthor({ name: 'Patlıcan Moderator', iconURL: 'https://cdn.discordapp.com/attachments/1240076731860123658/1241768980528631808/a_b6c60dfadc9ebe8e963fcf3cf256fd9b.png?ex=664b66fb&is=664a157b&hm=16511e962a489430bd245c0e8843ef69d6574af696b47681d6f0d28eb2db1108&', url: 'https://discord.gg/T2jXbtBjwj' })


   .setDescription(`<@${member.user.id}>**, Aramıza Hoşgeldin.**

   ${arrow}  **Seninle Beraber ${member.guild.memberCount} Kişiyiz.**  
   ${arrow} **Kayıt Olmak Için Ses Teyit Odalarından Birine Geçip Bekleyiniz.**
   ${arrow} **Kayıt Tarihi: ${moment.utc(member.user.createdAt).format('DD.MM.YY')}**
   ${arrow} **Güvenli Hesap!**

  ${verify} **Bol keyifli zaman geçirmeniz dileğiyle..**
   `,true)

   .setTimestamp()
   .setImage("https://cdn.discordapp.com/attachments/1194810086103720076/1237882252999004320/aubergine.png?ex=663d432f&is=663bf1af&hm=e97cca0875e6c6cdd7b9a4a936e7c1b354998f18d10f0391fae1e48bb80b3d01&")

   member.guild.channels.cache.get('835535042615967824').send({embeds: [embed]})
 

  
  
});


client.on('messageCreate', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    let gkisi = client.users.fetch(msg.id);
    //let channel = client.channels.get("1236120483783774250") //MESAJIN GİDECEĞİ KANAL ID
   
      // channel.send("reis sunucuya biri geldi <@&1191386223017738303>")
      // const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   
         const kayıtsızNick = "Isim | Yaş" == "" ? null : "Isim | Yaş"
       //  if (kayıtsızNick) await msg.member.setNickname(kayıtsızNick)
     
    const arrow = msg.guild.emojis.cache.find(emoji => emoji.name === 'Verify');
    const verifyy = msg.guild.emojis.cache.find(emoji => emoji.name === 'Verify');
     const embed = new Discord.EmbedBuilder()
     .setColor("#0080FF")
     .setDescription(`<@${msg.guild.id}>**, Aramıza Hoşgeldin.**

     ${arrow}  **Seninle Beraber ${msg.guild.memberCount} Kişiyiz.**  
     ${arrow} **Kayıt Olmak Için Ses Teyit Odalarından Birine Geçip Bekleyiniz.**
   
     ${arrow} **Güvenli Hesap!**

    ${verifyy} **Bol keyifli zaman geçirmeniz dileğiyle..**
     
 `,true)
     
     .setTimestamp()
     .setImage("https://cdn.discordapp.com/attachments/1194810086103720076/1237882252999004320/aubergine.png?ex=663d432f&is=663bf1af&hm=e97cca0875e6c6cdd7b9a4a936e7c1b354998f18d10f0391fae1e48bb80b3d01&")
  
     msg.guild.channels.cache.get('835535042615967824').send({embeds: [embed]})
   

    
  }
});

client.on("guildMemberAdd", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

    message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
  }
});

//client.on("guildMemberAdd", member => {
  //const tag = db.get(`ototag_${member.guild.id}`)
  //if(!tag) return;
 // member.setNickname(`${tag} | ${member.displayName}`)
//})
client.on("guildMemberRemove", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif! `)
}
}
})
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  
  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Hey <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif! `)
}
}
})

client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
}
}
})
client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)  
  if(interaction.customId == "moderasyon") {
const embed = new Discord.EmbedBuilder()
.setTitle("Patlıcan - Yardım Menüsü!")
.setDescription("/ban-list - **Banlı Kullanıcıları Gösterir!**\n/ban - **Bir Üyeyi Yasaklarsın!**\n/emojiler - **Emojileri Görürsün!**\n/forceban - **ID İle Bir Kullanıcıyı Yasaklarsın!**\n/giriş-çıkış - **Giriş çıkış kanalını ayarlarsın!**\n/kanal-açıklama - **Kanalın Açıklamasını Değiştirirsin!**\n/kick - **Bir Üyeyi Atarsın!**\n/küfür-engel - **Küfür Engel Sistemini Açıp Kapatırsın!**\n/oylama - **Oylama Açarsın!**\n/reklam-engel - **Reklam Engel Sistemini Açarsın!**\n/rol-al - **Rol Alırsın**\n/rol-oluştur - **Rol Oluşturursun!**\n/rol-ver - **Rol Verirsin!**\n/sa-as - **Selam Sistemine Bakarsın!**\n/temizle - **Mesaj Silersin!**\n/unban - **Bir üyenin yasağını kaldırırsın!**")
.setColor("Random")
interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kayıt") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("Patlıcan - Yardım Menüsü!")
    .setDescription("/kadın **Kadın Rolü Verirsin**\n/erkek **Erkek Rolü Verirsin**\n/kadın-kayıt-ayarla - ** Kadın Rolü Ayarlarsın**\n/erkek-kayıt-ayarla - **Erkek Rolü Ayarlarsın**\n/kayıtsız-rol-ayarla - **Kayıtsız Otorolü Ayarlarsın!**")
    .setColor("Random")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kullanıcı") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("Patlıcan - Yardım Menüsü!")
    .setDescription("/avatar - **Bir Kullanıcının Avatarına Bakarsın!**\n/afk - **Sebepli Afk Olursun!**\n/emoji-yazı - **Bota Emoji İle Yazı Yazdırırsın!**\n/istatistik - **Bot istatistiklerini gösterir!**\n/kurucu-kim - **Kurucuyu Gösterir!**\n/ping - **Botun pingini gösterir!**\n/yardım - **Yardım Menüsünü Gösterir!**")
    .setColor("Random")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
})
