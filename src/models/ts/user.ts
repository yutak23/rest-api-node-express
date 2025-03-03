import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { division, divisionId } from './division';
import type { projectMember, projectMemberId } from './project_member';

export interface userAttributes {
	id: number;
	divisionId: number;
	name: string;
	email: string;
	scopes: object;
	createdAt: Date;
	updatedAt: Date;
}

export type userPk = 'id';
export type userId = user[userPk];
export type userOptionalAttributes = 'id' | 'createdAt' | 'updatedAt';
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
	id!: number;
	divisionId!: number;
	name!: string;
	email!: string;
	scopes!: object;
	createdAt!: Date;
	updatedAt!: Date;

	// user belongsTo division via divisionId
	division!: division;
	getDivision!: Sequelize.BelongsToGetAssociationMixin<division>;
	setDivision!: Sequelize.BelongsToSetAssociationMixin<division, divisionId>;
	createDivision!: Sequelize.BelongsToCreateAssociationMixin<division>;
	// user hasMany projectMember via userId
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

	static initModel(sequelize: Sequelize.Sequelize): typeof user {
		return user.init(
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
}
