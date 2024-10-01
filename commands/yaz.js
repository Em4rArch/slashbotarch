const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = 'YOUR_BOT_TOKEN';
const clientId = 'YOUR_CLIENT_ID';
const guildId = 'YOUR_GUILD_ID';

const commands = [
    {
        name: 'yaz',
        description: 'Belirtilen metni yazdırır',
        options: [
            {
                type: 3, // STRING
                name: 'metin',
                description: 'Yazdırılacak metin',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Başlatılıyor...');

        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });

        console.log('Komutlar başarıyla yüklendi!');
    } catch (error) {
        console.error(error);
    }
})();

client.on('ready', () => {
    console.log(`Bot olarak giriş yapıldı: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'yaz') {
        const metin = options.getString('metin');
        await interaction.reply(metin);
    }
});

client.login(token); 
