import { BaseModel } from "../libs/objection";
import Address from "./address";
import User from "./user";

export default class Contact extends BaseModel {
  static get tableName() {
    return "contacts";
  }

  static get idColumn() {
    return "id";
  }

  id!: number;
  user_id!: number;
  full_name!: string;
  nick_name!: string | null;
  phone_number!: string;
  email!: string | null;
  created_at!: number;
  updated_at!: number;

  user?: User;
  addresses?: Address[];

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${this.tableName}.user_id`,
          to: `${User.tableName}.id`,
        },
      },
      addresses: {
        relation: BaseModel.HasManyRelation,
        modelClass: Address,
        join: {
          from: `${this.tableName}.id`,
          to: `${Address.tableName}.contact_id`,
        },
      },
    };
  }
}