import { BaseModel } from '../objection';
import User from './user';

export default class Session extends BaseModel {
	static get tableName() {
		return 'sessions';
	}

	static get idColumn() {
		return 'id';
	}

	id!: string;
	user_id!: number;
	expires_at!: number;
	created_at!: number;
	updated_at!: number;

	user?: User;

	static get relationMappings() {
		return {
			user: {
				relation: BaseModel.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: `${this.tableName}.user_id`,
					to: `${User.tableName}.id`
				}
			}
		};
	}
}
