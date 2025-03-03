import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { project, projectId } from './project';
import type { user, userId } from './user';

export interface divisionAttributes {
	id: number;
	departmentName: string;
	groupName: string;
	createdAt: Date;
	updatedAt: Date;
}

export type divisionPk = 'id';
export type divisionId = division[divisionPk];
export type divisionOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';
export type divisionCreationAttributes = Optional<divisionAttributes, divisionOptionalAttributes>;

export class division
	extends Model<divisionAttributes, divisionCreationAttributes>
	implements divisionAttributes
{
	id!: number;
	departmentName!: string;
	groupName!: string;
	createdAt!: Date;
	updatedAt!: Date;

	// division hasMany project via divisionId
	projects!: project[];
	getProjects!: Sequelize.HasManyGetAssociationsMixin<project>;
	setProjects!: Sequelize.HasManySetAssociationsMixin<project, projectId>;
	addProject!: Sequelize.HasManyAddAssociationMixin<project, projectId>;
	addProjects!: Sequelize.HasManyAddAssociationsMixin<project, projectId>;
	createProject!: Sequelize.HasManyCreateAssociationMixin<project>;
	removeProject!: Sequelize.HasManyRemoveAssociationMixin<project, projectId>;
	removeProjects!: Sequelize.HasManyRemoveAssociationsMixin<project, projectId>;
	hasProject!: Sequelize.HasManyHasAssociationMixin<project, projectId>;
	hasProjects!: Sequelize.HasManyHasAssociationsMixin<project, projectId>;
	countProjects!: Sequelize.HasManyCountAssociationsMixin;
	// division hasMany user via divisionId
	users!: user[];
	getUsers!: Sequelize.HasManyGetAssociationsMixin<user>;
	setUsers!: Sequelize.HasManySetAssociationsMixin<user, userId>;
	addUser!: Sequelize.HasManyAddAssociationMixin<user, userId>;
	addUsers!: Sequelize.HasManyAddAssociationsMixin<user, userId>;
	createUser!: Sequelize.HasManyCreateAssociationMixin<user>;
	removeUser!: Sequelize.HasManyRemoveAssociationMixin<user, userId>;
	removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<user, userId>;
	hasUser!: Sequelize.HasManyHasAssociationMixin<user, userId>;
	hasUsers!: Sequelize.HasManyHasAssociationsMixin<user, userId>;
	countUsers!: Sequelize.HasManyCountAssociationsMixin;

	static initModel(sequelize: Sequelize.Sequelize): typeof division {
		return division.init(
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
}
