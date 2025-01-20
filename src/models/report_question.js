import _sequelize from 'sequelize';
import { DateTime } from 'luxon';
const { Model, Sequelize } = _sequelize;

export default class reportQuestion extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true
				},
				questions: {
					type: DataTypes.JSON,
					allowNull: false
				},
				enabled: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: 1,
					comment: '1=有効,0=無効',
					get: function () {
						return !!this.getDataValue('createdAt');
					},
					set: function (v) {
						this.setDataValue('enabled', v ? 1 : 0);
					}
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
				tableName: 'report_questions',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }]
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
