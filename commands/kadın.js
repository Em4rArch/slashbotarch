const { PermissionsBitField, } = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")

module.exports = {
    name:"kadın",
    description: 'Kadın kayıt!',
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
  //  const rol = "1242033839044562954"
   // const rol2 = "1238526153510092891"
 //   const kayitsiz = "1236108818358734869"
    const user = interaction.options.getMember('kullanıcı')
    const isim = interaction.options.getString('isim')
    const yas = interaction.options.getString('yaş')
   // const target = interaction.guild.members.cache.get(args[1])

   let kadın = db.fetch(`kadın_${interaction.guild.id}`)
   let kadın2 = db.fetch(`kadın2_${interaction.guild.id}`)
   let kayıtsız = db.fetch(`otorol_${interaction.guild.id}`)
   if (!kadın) return interaction.reply("Erkek rolü ayarlanmamış!")
   if (!kadın2) return interaction.reply("Erkek2 rolü ayarlanmamış!")
   if (!kayıtsız) return interaction.reply("Kayıtsız rolü ayarlanmamış!")

    let capitalizedString = isim[0].toUpperCase() + isim.slice(1);
setTimeout(function(){
    user.setNickname(`${capitalizedString} [${yas}]`)
},500)
setTimeout(function(){
    interaction.guild.members.cache.get(user.id).roles.add([kadın, kadın2])
},1500)
setTimeout(function(){
    interaction.guild.members.cache.get(user.id).roles.remove(kayıtsız)
},2000)
    interaction.reply({content: "Başarıyla <@"+user+"> Kullanıcısına <@&"+kadın+"> <@&"+kadın2+"> Rolü Verildi."})

    const sonsuz = client.emojis.cache.find(emoji => emoji.name === 'Verify');
    const embed = new Discord.EmbedBuilder()
     .setColor('#E50000')
     .setThumbnail(`https://cdn.discordapp.com/attachments/1188118049887367168/1242067305362358302/Custom-Icon-Design-Flatastic-7-Female.512.png?ex=664c7cd2&is=664b2b52&hm=0bf5486b1664455a5b285ca35804458763bd0b92b89d255b19c3d39b45589114&`)
    // .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true})}`)
     .setDescription(`${sonsuz} ‍ ‍ ‍ **Patlıcan Kayıt Sistemi** ‍  ‍  ‍ ${sonsuz}
   
   **Kayıt edilen kullanıcı :** <@${user.id}>     
   
   **Kayıt işleminde verilen isim :** ${capitalizedString} ${yas}  
   
   **Kayıt işleminde verilen rol :** <@&${kadın}> **-** <@&${kadın2}>
   
   **Kayıt işleminde alınan rol :** <@&${kayıtsız}>
   `)
   .setFooter({ text: `Komutu kullanan yetkili : ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true})}` })

     .setImage("https://cdn.discordapp.com/attachments/1194810086103720076/1237882252999004320/aubergine.png?ex=663d432f&is=663bf1af&hm=e97cca0875e6c6cdd7b9a4a936e7c1b354998f18d10f0391fae1e48bb80b3d01&")
     client.channels.cache.get('835535042615967824').send({embeds: [embed]})
    
}

};