import {Client, Message} from 'discord.js';
import sequelize from './config/sequelizeConfig';
import * as YAML from 'yamljs';
import * as path from "path";
import {addStreamer} from "./services/TwitchService";
import {getUser} from "./utils/TwitchAuth";
const prefix = '!'

const client: any = new Client();
client.setting = YAML.load(path.resolve(__dirname, 'config/setting.yml'));
client.sequelize = sequelize;
require('./modules/twitchModule')(client);

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));

client.on("message", async (message: Message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return
    const args: string[] = message.content.slice(prefix.length).split(/ +/);
    const command: string = args.shift().toLocaleLowerCase();

    if(command === 'addstreamer') {
        const streamer = message.guild.member(message.mentions.users.first())
        if(!streamer) return message.channel.send('Vous devez mentionner le streamer a qui appartient la chaine !');
        if(!args[0]) return message.channel.send('Vous devez mettre le pseudos twitch de l\'utilisateur');
        const twitchUser: { id: string; login: string; type:string; broadcaster_type: string; description: string } = await getUser(client, args[0]);
        if(twitchUser === undefined) return message.channel.send('Utilisateur twitch invalid !');
        await addStreamer(client.sequelize, streamer, twitchUser.login);
        message.channel.send('Streameur ajouter à la liste')
    }
})

client.login(client.setting.token)
