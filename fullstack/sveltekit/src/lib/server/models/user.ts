import { BaseModel } from '../objection';
import Contact from './contact';
import Group from './group';
import Session from './session';

export default class User extends BaseModel {
	static get tableName() {
		return 'users';
	}

	static get idColumn() {
		return 'id';
	}

	id!: number;
	name!: string;
	email!: string;
	phone_number!: string;
	password!: string;
	bio!: string | null;
	created_at!: number;
	updated_at!: number;

	sessions?: Session[];
	contacts?: Contact[];
	groups?: Group[];

	static get relationMappings() {
		return {
			sessions: {
				relation: BaseModel.HasManyRelation,
				modelClass: Session,
				join: {
					from: `${this.tableName}.id`,
					to: `${Session.tableName}.user_id`
				}
			},
			contacts: {
				relation: BaseModel.HasManyRelation,
				modelClass: Contact,
				join: {
					from: `${this.tableName}.id`,
					to: `${Contact.tableName}.user_id`
				}
			},
			groups: {
				relation: BaseModel.HasManyRelation,
				modelClass: Group,
				join: {
					from: `${this.tableName}.id`,
					to: `${Group.tableName}.user_id`
				}
			}
		};
	}
}
