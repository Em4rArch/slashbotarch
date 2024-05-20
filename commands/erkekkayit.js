const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"erkek-rol-ayarla",
    description: 'Kayıtlı rol ayarlarsın!',
    type:1,
    options: [
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
        {
            name:"rol2",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
       
       
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    db.set(`erkek_${interaction.guild.id}`, rol.id)
    const rol2 = interaction.options.getRole('rol2')
    db.set(`erkek2_${interaction.guild.id}`, rol2.id)
    interaction.reply({content: "Kayıtlı Rolü Başarıyla <@&"+rol+"> - <@&"+rol2+"> Olarak Ayarlandı."})
}

};
