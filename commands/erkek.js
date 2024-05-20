const { PermissionsBitField, } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"erkek",
    description: 'Erkek kayıt!',
    type:1,
    options: [
        {
            name:"kullanıcı",
            description:"Rol verilicek kullanıcıyı seçin!",
            type:6,
            required:true
        },
        {
            name:"isim",
            description:"Kullanıcının İsmini Gir!",
            type:3,
            required:true
        },
        {
            name:"yaş",
            description:"Kullanıcının Yaşını Gir!",
            type:3,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
        if(!interaction) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
  //  const rol = "1242033839044562954"
  //  const rol2 = "1238526153510092891"
    let erkek = db.fetch(`erkek_${interaction.guild.id}`)
    let erkek2 = db.fetch(`erkek2_${interaction.guild.id}`)
    let kayıtsız = db.fetch(`otorol_${interaction.guild.id}`)
    if (!erkek) return interaction.reply("Erkek rolü ayarlanmamış!")
    if (!erkek2) return interaction.reply("Erkek2 rolü ayarlanmamış!")
    if (!kayıtsız) return interaction.reply("Kayıtsız rolü ayarlanmamış!")

    //const kayitsiz = "1236108818358734869"
    const user = interaction.options.getMember('kullanıcı')
    const isim = interaction.options.getString('isim')
    const yas = interaction.options.getString('yaş')
   // const target = interaction.guild.members.cache.get(args[1])
    let capitalizedString = isim[0].toUpperCase() + isim.slice(1);
  
setTimeout(function(){
    user.setNickname(`${capitalizedString} [${yas}]`)
},500)
setTimeout(function(){
    interaction.guild.members.cache.get(user.id).roles.add([erkek, erkek2])
},1500)
setTimeout(function(){
    interaction.guild.members.cache.get(user.id).roles.remove(kayıtsız)
},2500)
    interaction.reply({content: "Başarıyla <@"+user+"> Kullanıcısına <@&"+erkek+"> <@&"+erkek2+"> Rolü Verildi."})

    const sonsuz = client.emojis.cache.find(emoji => emoji.name === 'Verify');
    const embed = new Discord.EmbedBuilder()
     .setColor('#E50000')
     .setThumbnail(`https://cdn.discordapp.com/attachments/1188118049887367168/1242065418621947975/male-symbol-blue-icon.png?ex=664c7b10&is=664b2990&hm=305860cea743814cda8dd232942cece77d54d5bd4008b21fef90bce43b77a98a&`)
    // .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
     .setDescription(`${sonsuz} ‍ ‍ ‍ **Patlıcan Kayıt Sistemi** ‍  ‍  ‍ ${sonsuz}
   
   **Kayıt edilen kullanıcı :** <@${user.id}>     
   
   **Kayıt işleminde verilen isim :** ${capitalizedString} ${yas}  
   
   **Kayıt işleminde verilen rol :** <@&${erkek}> **-** <@&${erkek2}>
   
   **Kayıt işleminde alınan rol :** <@&${kayıtsız}>
   `)
   .setFooter({ text: `Komutu kullanan yetkili : ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}` })

     .setImage("https://cdn.discordapp.com/attachments/1194810086103720076/1237882252999004320/aubergine.png?ex=663d432f&is=663bf1af&hm=e97cca0875e6c6cdd7b9a4a936e7c1b354998f18d10f0391fae1e48bb80b3d01&")
     client.channels.cache.get('835535042615967824').send({embeds: [embed]})
    
}

};