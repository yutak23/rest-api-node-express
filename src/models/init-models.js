import _sequelize from 'sequelize';
const DataTypes = _sequelize.DataTypes;
import _division from './division.js';
import _projectMember from './project_member.js';
import _projectRole from './project_role.js';
import _project from './project.js';
import _reportQuestion from './report_question.js';
import _slackChannel from './slack_channel.js';
import _user from './user.js';
import _weeklyReport from './weekly_report.js';

export default function initModels(sequelize) {
	const division = _division.init(sequelize, DataTypes);
	const projectMember = _projectMember.init(sequelize, DataTypes);
	const projectRole = _projectRole.init(sequelize, DataTypes);
	const project = _project.init(sequelize, DataTypes);
	const reportQuestion = _reportQuestion.init(sequelize, DataTypes);
	const slackChannel = _slackChannel.init(sequelize, DataTypes);
	const user = _user.init(sequelize, DataTypes);
	const weeklyReport = _weeklyReport.init(sequelize, DataTypes);

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
		division,
		projectMember,
		projectRole,
		project,
		reportQuestion,
		slackChannel,
		user,
		weeklyReport
	};
}
