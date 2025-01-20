import express from 'express';
import Sequelize from 'sequelize';
import config from 'config';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
import authBearerParser from 'auth-bearer-parser';

import expressSession from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';

import errorResponse from './lib/error-response.js';
import CustomError from './lib/custom-error.js';

import initModels from './models/init-models.js';
import createRoutes from './routes/index.js';

import consoleExpressRouting from 'console-express-routes';

dotenv.config();

const app = express();

app.use(errorResponse());
app.use(express.static('static'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authBearerParser());

const redis = new Redis(config.get('redis.session'));
const store = new RedisStore({ client: redis });
app.use(
	expressSession({
		...config.get('session'),
		secret: process.env.COOKIE_SECRET,
		store
	})
);

const sequelize = new Sequelize(config.get('sequelize'));
app.locals.sequelize = sequelize;
app.locals.models = initModels(sequelize);
app.locals.HttpError = CustomError;

const routes = await createRoutes();
await Promise.all(Object.keys(routes).map((route) => routes[route]({ app })));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(err.status || 500).error(err);
});

app.listen(3000, () => {
	console.log();
	console.log('  ♻️  Server running at:');
	console.log(`    - Local:   ${chalk.cyan('http://localhost:3000')}`);
	console.log();

	// routing一覧を出力
	consoleExpressRouting(app);
});
