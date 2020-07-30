import { DataTypes, Sequelize } from 'sequelize';
import {ITwitchInstance} from '../utils/typing';

module.exports = (sequelize: Sequelize) => {
    const twitchShema = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        discordID: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        twitchUserID: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        announced: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        started_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    };

    return sequelize.define<ITwitchInstance>('Twitch', twitchShema);
}
