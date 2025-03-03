import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { division, divisionId } from './division';
import type { projectMember, projectMemberId } from './project_member';
import type { weeklyReport, weeklyReportId } from './weekly_report';

export interface projectAttributes {
	id: number;
	name: string;
	description?: string;
	divisionId: number;
	startDate?: string;
	endDate?: string;
	createdAt: Date;
	updatedAt: Date;
}

export type projectPk = 'id';
export type projectId = project[projectPk];
export type projectOptionalAttributes =
	| 'id'
	| 'description'
	| 'startDate'
	| 'endDate'
	| 'createdAt'
	| 'updatedAt';
export type projectCreationAttributes = Optional<projectAttributes, projectOptionalAttributes>;

export class project
	extends Model<projectAttributes, projectCreationAttributes>
	implements projectAttributes
{
	id!: number;
	name!: string;
	description?: string;
	divisionId!: number;
	startDate?: string;
	endDate?: string;
	createdAt!: Date;
	updatedAt!: Date;

	// project belongsTo division via divisionId
	division!: division;
	getDivision!: Sequelize.BelongsToGetAssociationMixin<division>;
	setDivision!: Sequelize.BelongsToSetAssociationMixin<division, divisionId>;
	createDivision!: Sequelize.BelongsToCreateAssociationMixin<division>;
	// project hasMany projectMember via projectId
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
	// project hasMany weeklyReport via projectId
	weeklyReports!: weeklyReport[];
	getWeeklyReports!: Sequelize.HasManyGetAssociationsMixin<weeklyReport>;
	setWeeklyReports!: Sequelize.HasManySetAssociationsMixin<weeklyReport, weeklyReportId>;
	addWeeklyReport!: Sequelize.HasManyAddAssociationMixin<weeklyReport, weeklyReportId>;
	addWeeklyReports!: Sequelize.HasManyAddAssociationsMixin<weeklyReport, weeklyReportId>;
	createWeeklyReport!: Sequelize.HasManyCreateAssociationMixin<weeklyReport>;
	removeWeeklyReport!: Sequelize.HasManyRemoveAssociationMixin<weeklyReport, weeklyReportId>;
	removeWeeklyReports!: Sequelize.HasManyRemoveAssociationsMixin<weeklyReport, weeklyReportId>;
	hasWeeklyReport!: Sequelize.HasManyHasAssociationMixin<weeklyReport, weeklyReportId>;
	hasWeeklyReports!: Sequelize.HasManyHasAssociationsMixin<weeklyReport, weeklyReportId>;
	countWeeklyReports!: Sequelize.HasManyCountAssociationsMixin;

	static initModel(sequelize: Sequelize.Sequelize): typeof project {
		return project.init(
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
}
