import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projectMember, projectMemberId } from './project_member';

export interface projectRoleAttributes {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export type projectRolePk = 'id';
export type projectRoleId = projectRole[projectRolePk];
export type projectRoleOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';
export type projectRoleCreationAttributes = Optional<
	projectRoleAttributes,
	projectRoleOptionalAttributes
>;

export class projectRole
	extends Model<projectRoleAttributes, projectRoleCreationAttributes>
	implements projectRoleAttributes
{
	id!: number;
	name!: string;
	createdAt!: Date;
	updatedAt!: Date;

	// projectRole hasMany projectMember via projectRoleId
	projectMembers!: projectMember[];
	getProjectMembers!: Sequelize.HasManyGetAssociationsMixin<projectMember>;
	setProjectMembers!: Sequelize.HasManySetAssociationsMixin<projectMember, projectMemberId>;
	addProjectMember!: Sequelize.HasManyAddAssociationMixin<projectMember, projectMemberId>;
	addProjectMembers!: Sequelize.HasManyAddAssociationsMixin<projectMember, projectMemberId>;
	createProjectMember!: Sequelize.HasManyCreateAssociationMixin<projectMember>;
	removeProjectMember!: Sequelize.HasManyRemoveAssociationMixin<projectMember, projectMemberId>;
	removeProjectMembers!: Sequelize.HasManyRemoveAssociationsMixin<projectMember, projectMemberId>;
	hasProjectMember!: Sequelize.HasManyHasAssociationMixin<projectMember, projectMemberId>;
	hasProjectMembers!: Sequelize.HasManyHasAssociationsMixin<projectMember, projectMemberId>;
	countProjectMembers!: Sequelize.HasManyCountAssociationsMixin;

	static initModel(sequelize: Sequelize.Sequelize): typeof projectRole {
		return projectRole.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER.UNSIGNED,
					allowNull: false,
					primaryKey: true
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: false
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
				tableName: 'project_roles',
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
