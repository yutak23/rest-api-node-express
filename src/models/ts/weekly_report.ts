import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { project, projectId } from './project';
import type { slackChannel, slackChannelId } from './slack_channel';

export interface weeklyReportAttributes {
	id: number;
	projectId: number;
	dueOn: string;
	answeredOn: string;
	status?: 'SUBMITTED' | 'CONFIRMED' | 'EDITED' | 'RECONFIRMED';
	reportData: object;
	comment?: string;
	createdAt: Date;
	updatedAt: Date;
}

export type weeklyReportPk = 'id';
export type weeklyReportId = weeklyReport[weeklyReportPk];
export type weeklyReportOptionalAttributes =
	| 'id'
	| 'status'
	| 'comment'
	| 'createdAt'
	| 'updatedAt';
export type weeklyReportCreationAttributes = Optional<
	weeklyReportAttributes,
	weeklyReportOptionalAttributes
>;

export class weeklyReport
	extends Model<weeklyReportAttributes, weeklyReportCreationAttributes>
	implements weeklyReportAttributes
{
	id!: number;
	projectId!: number;
	dueOn!: string;
	answeredOn!: string;
	status?: 'SUBMITTED' | 'CONFIRMED' | 'EDITED' | 'RECONFIRMED';
	reportData!: object;
	comment?: string;
	createdAt!: Date;
	updatedAt!: Date;

	// weeklyReport belongsTo project via projectId
	project!: project;
	getProject!: Sequelize.BelongsToGetAssociationMixin<project>;
	setProject!: Sequelize.BelongsToSetAssociationMixin<project, projectId>;
	createProject!: Sequelize.BelongsToCreateAssociationMixin<project>;
	// weeklyReport hasMany slackChannel via weeklyReportId
	slackChannels!: slackChannel[];
	getSlackChannels!: Sequelize.HasManyGetAssociationsMixin<slackChannel>;
	setSlackChannels!: Sequelize.HasManySetAssociationsMixin<slackChannel, slackChannelId>;
	addSlackChannel!: Sequelize.HasManyAddAssociationMixin<slackChannel, slackChannelId>;
	addSlackChannels!: Sequelize.HasManyAddAssociationsMixin<slackChannel, slackChannelId>;
	createSlackChannel!: Sequelize.HasManyCreateAssociationMixin<slackChannel>;
	removeSlackChannel!: Sequelize.HasManyRemoveAssociationMixin<slackChannel, slackChannelId>;
	removeSlackChannels!: Sequelize.HasManyRemoveAssociationsMixin<slackChannel, slackChannelId>;
	hasSlackChannel!: Sequelize.HasManyHasAssociationMixin<slackChannel, slackChannelId>;
	hasSlackChannels!: Sequelize.HasManyHasAssociationsMixin<slackChannel, slackChannelId>;
	countSlackChannels!: Sequelize.HasManyCountAssociationsMixin;

	static initModel(sequelize: Sequelize.Sequelize): typeof weeklyReport {
		return weeklyReport.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true
				},
				projectId: {
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					references: {
						model: 'projects',
						key: 'id'
					},
					field: 'project_id'
				},
				dueOn: {
					type: DataTypes.DATEONLY,
					allowNull: false,
					field: 'due_on'
				},
				answeredOn: {
					type: DataTypes.DATEONLY,
					allowNull: false,
					field: 'answered_on'
				},
				status: {
					type: DataTypes.ENUM('SUBMITTED', 'CONFIRMED', 'EDITED', 'RECONFIRMED'),
					allowNull: true
				},
				reportData: {
					type: DataTypes.JSON,
					allowNull: false,
					comment: '設問に対する回答をJSONで格納',
					field: 'report_data'
				},
				comment: {
					type: DataTypes.TEXT,
					allowNull: true,
					comment: 'レポートへの単一コメント'
				},
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
					field: 'created_at'
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
					field: 'updated_at'
				}
			},
			{
				sequelize,
				tableName: 'weekly_reports',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }]
					},
					{
						name: 'idx_weekly_reports_project_id',
						using: 'BTREE',
						fields: [{ name: 'project_id' }]
					}
				]
			}
		);
	}
}
