import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_PORT,
	DATABASE_USER
} from '$env/static/private';
import knexLib from 'knex';
import pkg from 'pg';

const { types } = pkg;

types.setTypeParser(1700, (val) => parseFloat(val));

const knex = knexLib({
	client: 'pg',
	connection: {
		host: DATABASE_HOST ?? '',
		port: Number(DATABASE_PORT ?? 5432),
		database: DATABASE_NAME ?? '',
		user: DATABASE_USER ?? '',
		password: DATABASE_PASSWORD ?? ''
	}
});

export default knex;
