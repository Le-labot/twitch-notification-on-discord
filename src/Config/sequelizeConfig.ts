import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:@localhost:3308/<db_name>');

export default sequelize;
