import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { projectRole, projectRoleId } from './project_role';
import type { project, projectId } from './project';
import type { user, userId } from './user';

export interface projectMemberAttributes {
	id: number;
	projectId: number;
	userId: number;
	projectRoleId: number;
	createdAt: Date;
	updatedAt: Date;
}

export type projectMemberPk = 'id';
export type projectMemberId = projectMember[projectMemberPk];
export type projectMemberOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';
export type projectMemberCreationAttributes = Optional<
	projectMemberAttributes,
	projectMemberOptionalAttributes
>;

export class projectMember
	extends Model<projectMemberAttributes, projectMemberCreationAttributes>
	implements projectMemberAttributes
{
	id!: number;
	projectId!: number;
	userId!: number;
	projectRoleId!: number;
	createdAt!: Date;
	updatedAt!: Date;

	// projectMember belongsTo projectRole via projectRoleId
	projectRole!: projectRole;
	getProjectRole!: Sequelize.BelongsToGetAssociationMixin<projectRole>;
	setProjectRole!: Sequelize.BelongsToSetAssociationMixin<projectRole, projectRoleId>;
	createProjectRole!: Sequelize.BelongsToCreateAssociationMixin<projectRole>;
	// projectMember belongsTo project via projectId
	project!: project;
	getProject!: Sequelize.BelongsToGetAssociationMixin<project>;
	setProject!: Sequelize.BelongsToSetAssociationMixin<project, projectId>;
	createProject!: Sequelize.BelongsToCreateAssociationMixin<project>;
	// projectMember belongsTo user via userId
	user!: user;
	getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
	setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
	createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

	static initModel(sequelize: Sequelize.Sequelize): typeof projectMember {
		return projectMember.init(
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
}
