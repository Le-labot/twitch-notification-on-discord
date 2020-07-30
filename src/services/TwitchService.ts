import {Sequelize} from "sequelize";
import {GuildMember, User} from "discord.js";


export async function addStreamer(sequelize: Sequelize, user: User | GuildMember, twitchUserID: string) {
    const twitchModel = require('../models/twitch')(sequelize);
    if(!/^[a-zA-Z0-9_]{4,25}$/.test( twitchUserID )) return new Error('twitch username invalid! make sure you\'re only using the streamer\'s username (the thing at the end of their URL)')
    const twitchUser = await twitchModel.build({ discordID: user.id, twitchUserID: twitchUserID })
    twitchUser.save()
    return twitchUser.row;
}

export async function updateStreamer(sequelize: Sequelize, streamer, announced: boolean, started_at = null) {
    const twitchModel = require('../models/twitch')(sequelize);
    await twitchModel.update({
        announced: announced,
        started_at: started_at
    }, {
        where: {
            twitchUserID: streamer.twitchUserID
        }
    })
}

export async function getAllStreamer(sequelize: Sequelize) {
    const twitchModel = require('../models/twitch')(sequelize);
    return twitchModel.findAll();
}
