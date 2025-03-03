import type { Sequelize } from 'sequelize';
import { division as _division } from './division';
import type { divisionAttributes, divisionCreationAttributes } from './division';
import { projectMember as _projectMember } from './project_member';
import type { projectMemberAttributes, projectMemberCreationAttributes } from './project_member';
import { projectRole as _projectRole } from './project_role';
import type { projectRoleAttributes, projectRoleCreationAttributes } from './project_role';
import { project as _project } from './project';
import type { projectAttributes, projectCreationAttributes } from './project';
import { reportQuestion as _reportQuestion } from './report_question';
import type { reportQuestionAttributes, reportQuestionCreationAttributes } from './report_question';
import { slackChannel as _slackChannel } from './slack_channel';
import type { slackChannelAttributes, slackChannelCreationAttributes } from './slack_channel';
import { user as _user } from './user';
import type { userAttributes, userCreationAttributes } from './user';
import { weeklyReport as _weeklyReport } from './weekly_report';
import type { weeklyReportAttributes, weeklyReportCreationAttributes } from './weekly_report';

export {
	_division as division,
	_projectMember as projectMember,
	_projectRole as projectRole,
	_project as project,
	_reportQuestion as reportQuestion,
	_slackChannel as slackChannel,
	_user as user,
	_weeklyReport as weeklyReport
};

export type {
	divisionAttributes,
	divisionCreationAttributes,
	projectMemberAttributes,
	projectMemberCreationAttributes,
	projectRoleAttributes,
	projectRoleCreationAttributes,
	projectAttributes,
	projectCreationAttributes,
	reportQuestionAttributes,
	reportQuestionCreationAttributes,
	slackChannelAttributes,
	slackChannelCreationAttributes,
	userAttributes,
	userCreationAttributes,
	weeklyReportAttributes,
	weeklyReportCreationAttributes
};

export function initModels(sequelize: Sequelize) {
	const division = _division.initModel(sequelize);
	const projectMember = _projectMember.initModel(sequelize);
	const projectRole = _projectRole.initModel(sequelize);
	const project = _project.initModel(sequelize);
	const reportQuestion = _reportQuestion.initModel(sequelize);
	const slackChannel = _slackChannel.initModel(sequelize);
	const user = _user.initModel(sequelize);
	const weeklyReport = _weeklyReport.initModel(sequelize);

	project.belongsTo(division, { as: 'division', foreignKey: 'divisionId' });
	division.hasMany(project, { as: 'projects', foreignKey: 'divisionId' });
	user.belongsTo(division, { as: 'division', foreignKey: 'divisionId' });
	division.hasMany(user, { as: 'users', foreignKey: 'divisionId' });
	projectMember.belongsTo(projectRole, { as: 'projectRole', foreignKey: 'projectRoleId' });
	projectRole.hasMany(projectMember, { as: 'projectMembers', foreignKey: 'projectRoleId' });
	projectMember.belongsTo(project, { as: 'project', foreignKey: 'projectId' });
	project.hasMany(projectMember, { as: 'projectMembers', foreignKey: 'projectId' });
	weeklyReport.belongsTo(project, { as: 'project', foreignKey: 'projectId' });
	project.hasMany(weeklyReport, { as: 'weeklyReports', foreignKey: 'projectId' });
	projectMember.belongsTo(user, { as: 'user', foreignKey: 'userId' });
	user.hasMany(projectMember, { as: 'projectMembers', foreignKey: 'userId' });
	slackChannel.belongsTo(weeklyReport, { as: 'weeklyReport', foreignKey: 'weeklyReportId' });
	weeklyReport.hasMany(slackChannel, { as: 'slackChannels', foreignKey: 'weeklyReportId' });

	return {
		division: division,
		projectMember: projectMember,
		projectRole: projectRole,
		project: project,
		reportQuestion: reportQuestion,
		slackChannel: slackChannel,
		user: user,
		weeklyReport: weeklyReport
	};
}
