import * as express from 'express';
import {getAllStreamer, updateStreamer} from "../services/TwitchService";
import {getStream} from "../utils/TwitchAuth";
import {TextChannel} from "discord.js";
import * as moment from 'moment';

module.exports = async (client) => {
    setInterval(await check, 30000 ); // 5 min
    await check();

    async function check() {
        const streamers = await getAllStreamer(client.sequelize);
        if (streamers.length < 1) return console.log('aucun streamer')
        for (const streamer of streamers) {
            const stream = await getStream(client, streamer.twitchUserID);
            if (!stream) await updateStreamer(client.sequelize, streamer, false);
            const now = new Date();
            const started = new Date(streamer.started_at)
            if(streamer.announced === false || moment.duration(7200000) >  moment.duration(now.getTime() - started.getTime())) {
                //@ts-ignore
                const chan: TextChannel = client.channels.cache.find(ch => ch.id === '716019523874193520' && ch.type === 'text')
                chan.send('<message>')
                await updateStreamer(client.sequelize, streamer, true, started)
            }
        }
    }
}
