import { Model, type StaticHookArguments } from 'objection';
import knex from './knex';
import dayjs from '$lib/dayjs';

Model.knex(knex);

export class BaseModel extends Model {
	static async beforeInsert(args: StaticHookArguments<any>) {
		const currentDate = dayjs().unix();
		const columnInfo = await this.knex().table(this.tableName).columnInfo();

		args.inputItems.forEach((arg) => {
			if (columnInfo?.created_at) arg.created_at = currentDate;
			if (columnInfo?.updated_at) arg.updated_at = currentDate;
		});
	}

	static async beforeUpdate(args: StaticHookArguments<any>) {
		const currentDate = dayjs().unix();
		const columnInfo = await this.knex().table(this.tableName).columnInfo();

		args.inputItems.forEach((arg) => {
			if (columnInfo?.updated_at) arg.updated_at = currentDate;
		});
	}
}
