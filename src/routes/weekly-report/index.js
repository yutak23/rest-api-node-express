import { strict as assert } from 'assert';

import openapiValidator from '../../lib/custome-openapi-validator.js';
import weeklyReport from './v1/weekly-report.js';
import verifyAccess from '../../lib/verify-access.js';

const BASE_V1_API_PATH = `/api/v1/weekly-report`;

export default async (options = {}) => {
	assert.ok(options.app, 'app must be required');
	const { app } = options;

	app.use(
		openapiValidator({
			basePath: BASE_V1_API_PATH,
			apiSpec: 'src/openapi/weekly-report.yaml'
		})
	);
	app.use(`${BASE_V1_API_PATH}/*`, verifyAccess());

	app.use(`${BASE_V1_API_PATH}`, weeklyReport);
};
