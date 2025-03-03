import CustomError from './lib/custom-error';
import { Sequelize, ModelStatic, Model } from 'node_modules/sequelize/types/index';
import {
	divisionAttributes,
	divisionCreationAttributes,
	projectAttributes,
	projectCreationAttributes,
	projectMemberAttributes,
	projectMemberCreationAttributes,
	projectRoleAttributes,
	projectRoleCreationAttributes,
	reportQuestionAttributes,
	reportQuestionCreationAttributes,
	slackChannelAttributes,
	slackChannelCreationAttributes,
	userAttributes,
	userCreationAttributes,
	weeklyReportAttributes,
	weeklyReportCreationAttributes
} from './models/ts/init-models';

declare global {
	namespace Express {
		interface Response {
			error: (e: Error | typeof CustomError) => this;
		}
		interface Request {}
		interface Locals {
			sequelize: Sequelize;
			models: {
				division: ModelStatic<Model<divisionAttributes, divisionCreationAttributes>>;
				projectMember: ModelStatic<Model<projectMemberAttributes, projectMemberCreationAttributes>>;
				projectRole: ModelStatic<Model<projectRoleAttributes, projectRoleCreationAttributes>>;
				project: ModelStatic<Model<projectAttributes, projectCreationAttributes>>;
				reportQuestion: ModelStatic<
					Model<reportQuestionAttributes, reportQuestionCreationAttributes>
				>;
				slackChannel: ModelStatic<Model<slackChannelAttributes, slackChannelCreationAttributes>>;
				user: ModelStatic<Model<userAttributes, userCreationAttributes>>;
				weeklyReport: ModelStatic<Model<weeklyReportAttributes, weeklyReportCreationAttributes>>;
			};
			HttpError: typeof CustomError;
		}
	}
}
