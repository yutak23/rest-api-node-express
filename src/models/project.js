import _sequelize from 'sequelize';
import { DateTime } from 'luxon';
const { Model, Sequelize } = _sequelize;

export default class project extends Model {
	static init(sequelize, DataTypes) {
		return super.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true
				},
				name: {
					type: DataTypes.STRING(255),
					allowNull: false
				},
				description: {
					type: DataTypes.TEXT,
					allowNull: true
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
				startDate: {
					type: DataTypes.DATEONLY,
					allowNull: true,
					field: 'start_date'
				},
				endDate: {
					type: DataTypes.DATEONLY,
					allowNull: true,
					field: 'end_date'
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
				tableName: 'projects',
				timestamps: false,
				indexes: [
					{
						name: 'PRIMARY',
						unique: true,
						using: 'BTREE',
						fields: [{ name: 'id' }]
					},
					{
						name: 'division_id',
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
