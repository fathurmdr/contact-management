import { BaseModel } from '../objection';
import Contact from './contact';
import User from './user';

export default class Group extends BaseModel {
	static get tableName() {
		return 'groups';
	}

	static get idColumn() {
		return 'id';
	}

	id!: number;
	user_id!: number;
	name!: string;
	description!: string | null;
	created_at!: number;
	updated_at!: number;

	user?: User;
	members?: Contact[];

	static get relationMappings() {
		return {
			user: {
				relation: BaseModel.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: `${this.tableName}.user_id`,
					to: `${User.tableName}.id`
				}
			},
			members: {
				relation: BaseModel.ManyToManyRelation,
				modelClass: Contact,
				join: {
					from: `${this.tableName}.id`,
					through: {
						from: 'group_members.group_id',
						to: 'group_members.contact_id'
					},
					to: `${Contact.tableName}.id`
				}
			}
		};
	}
}
