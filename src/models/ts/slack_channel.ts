import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { weeklyReport, weeklyReportId } from './weekly_report';

export interface slackChannelAttributes {
	id: number;
	weeklyReportId: number;
	channelName: string;
	channelUrl: string;
	createdAt: Date;
	updatedAt: Date;
}

export type slackChannelPk = 'id';
export type slackChannelId = slackChannel[slackChannelPk];
export type slackChannelOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';
export type slackChannelCreationAttributes = Optional<
	slackChannelAttributes,
	slackChannelOptionalAttributes
>;

export class slackChannel
	extends Model<slackChannelAttributes, slackChannelCreationAttributes>
	implements slackChannelAttributes
{
	id!: number;
	weeklyReportId!: number;
	channelName!: string;
	channelUrl!: string;
	createdAt!: Date;
	updatedAt!: Date;

	// slackChannel belongsTo weeklyReport via weeklyReportId
	weeklyReport!: weeklyReport;
	getWeeklyReport!: Sequelize.BelongsToGetAssociationMixin<weeklyReport>;
	setWeeklyReport!: Sequelize.BelongsToSetAssociationMixin<weeklyReport, weeklyReportId>;
	createWeeklyReport!: Sequelize.BelongsToCreateAssociationMixin<weeklyReport>;

	static initModel(sequelize: Sequelize.Sequelize): typeof slackChannel {
		return slackChannel.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true
				},
				weeklyReportId: {
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					references: {
						model: 'weekly_reports',
						key: 'id'
					},
					field: 'weekly_report_id'
				},
				channelName: {
					type: DataTypes.STRING(255),
					allowNull: false,
					field: 'channel_name'
				},
				channelUrl: {
					type: DataTypes.STRING(500),
					allowNull: false,
					field: 'channel_url'
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
				tableName: 'slack_channels',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }]
					},
					{
						name: 'idx_slack_channels_wr_id',
						using: 'BTREE',
						fields: [{ name: 'weekly_report_id' }]
					}
				]
			}
		);
	}
}
