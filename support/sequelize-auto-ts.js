import SequelizeAuto from 'sequelize-auto';
import Sequelize from 'sequelize';
import config from 'config';
import appRoot from 'app-root-path';

const sequelize = new Sequelize(config.get('sequelize'));

const main = async () => {
	const auto = new SequelizeAuto(sequelize, null, null, {
		directory: appRoot.resolve('src/models-auto/ts'),
		caseModel: 'c',
		caseFile: 'l',
		caseProp: 'c',
		lang: 'ts',
		singularize: true,
		views: true,
		additional: {
			timestamps: false
		}
	});

	await auto.run();
};

await main();
