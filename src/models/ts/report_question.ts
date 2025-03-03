import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface reportQuestionAttributes {
	id: number;
	questions: object;
	enabled: number;
	createdAt: Date;
	updatedAt: Date;
}

export type reportQuestionPk = 'id';
export type reportQuestionId = reportQuestion[reportQuestionPk];
export type reportQuestionOptionalAttributes = 'id' | 'enabled' | 'createdAt' | 'updatedAt';
export type reportQuestionCreationAttributes = Optional<
	reportQuestionAttributes,
	reportQuestionOptionalAttributes
>;

export class reportQuestion
	extends Model<reportQuestionAttributes, reportQuestionCreationAttributes>
	implements reportQuestionAttributes
{
	id!: number;
	questions!: object;
	enabled!: number;
	createdAt!: Date;
	updatedAt!: Date;

	static initModel(sequelize: Sequelize.Sequelize): typeof reportQuestion {
		return reportQuestion.init(
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
					comment: '1=有効,0=無効'
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
}
