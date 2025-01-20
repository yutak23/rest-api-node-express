import _sequelize from 'sequelize';
import { DateTime } from 'luxon';
const { Model, Sequelize } = _sequelize;

export default class projectMember extends Model {
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
				userId: {
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					references: {
						model: 'users',
						key: 'id'
					},
					field: 'user_id'
				},
				projectRoleId: {
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					references: {
						model: 'project_roles',
						key: 'id'
					},
					field: 'project_role_id'
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
				tableName: 'project_members',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }]
					},
					{
						name: 'uk_project_user_role',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'project_id' }, { name: 'user_id' }, { name: 'project_role_id' }]
					},
					{
						name: 'idx_project_id',
						using: 'BTREE',
						fields: [{ name: 'project_id' }]
					},
					{
						name: 'idx_user_id',
						using: 'BTREE',
						fields: [{ name: 'user_id' }]
					},
					{
						name: 'idx_project_role_id',
						using: 'BTREE',
						fields: [{ name: 'project_role_id' }]
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
