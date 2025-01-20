import _sequelize from 'sequelize';
import { DateTime } from 'luxon';
const { Model, Sequelize } = _sequelize;

export default class user extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true
				},
				divisionId: {
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					references: {
						model: 'divisions',
						key: 'id'
					},
					field: 'division_id'
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: false
				},
				email: {
					type: DataTypes.STRING(255),
					allowNull: false,
					unique: 'uk_users_email'
				},
				scopes: {
					type: DataTypes.JSON,
					allowNull: false,
					comment: 'OAuth2.0のようなスコープ配列をJSONで格納'
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
				},
				fullName: {
					type: DataTypes.VIRTUAL,
					get: function () {
						return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
					},
					field: 'full_name'
				}
			},
			{
				sequelize,
				tableName: 'users',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }]
					},
					{
						name: 'uk_users_email',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'email' }]
					},
					{
						name: 'idx_users_division_id',
						using: 'BTREE',
						fields: [{ name: 'division_id' }]
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
