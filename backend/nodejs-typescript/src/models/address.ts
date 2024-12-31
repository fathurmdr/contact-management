import { BaseModel } from "../libs/objection";
import Contact from "./contact";

export default class Address extends BaseModel {
  static get tableName() {
    return "addresses";
  }

  static get idColumn() {
    return "id";
  }

  id!: number;
  contact_id!: number;
  street!: string;
  city?: string;
  district?: string;
  sub_district?: string;
  postal_code?: string;
  created_at!: number;
  updated_at!: number;

  contact?: Contact;

  static get relationMappings() {
    return {
      contact: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Contact,
        join: {
          from: `${this.tableName}.contact_id`,
          to: `${Contact.tableName}.id`,
        },
      },
    };
  }
}
