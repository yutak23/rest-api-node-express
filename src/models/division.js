import _sequelize from 'sequelize';
import { DateTime } from 'luxon';
const { Model, Sequelize } = _sequelize;

export default class division extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true
				},
				departmentName: {
					type: DataTypes.STRING(100),
					allowNull: false,
					comment: '部名',
					field: 'department_name'
				},
				groupName: {
					type: DataTypes.STRING(100),
					allowNull: false,
					comment: 'グループ名',
					field: 'group_name'
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
				tableName: 'divisions',
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
