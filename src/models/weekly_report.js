import _sequelize from 'sequelize';
import { DateTime } from 'luxon';
const { Model, Sequelize } = _sequelize;

export default class weeklyReport extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
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
					get: function () {
						return DateTime.fromJSDate(this.getDataValue('createdAt')).toUnixInteger();
					},
					set: function (v) {
						this.setDataValue(
							'createdAt',
							v ? DateTime.fromSeconds(v).toFormat('yyyy-LL-dd HH:mm:ss') : null
						);
					},
					field: 'created_at'
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
					get: function () {
						return DateTime.fromJSDate(this.getDataValue('updatedAt')).toUnixInteger();
					},
					set: function (v) {
						this.setDataValue(
							'updatedAt',
							v ? DateTime.fromSeconds(v).toFormat('yyyy-LL-dd HH:mm:ss') : null
						);
					},
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

	toJSON(options = {}) {
		const json = super.toJSON();
		if (options.exclude && Array.isArray(options.exclude))
			options.exclude.forEach((key) => delete json[key]);
		return json;
	}
}
