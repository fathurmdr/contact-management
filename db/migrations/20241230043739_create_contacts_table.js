/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contacts", function (table) {
    table.increments("id");
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.string("full_name", 100).notNullable();
    table.string("nick_name", 100).nullable();
    table.string("phone_number", 100).nullable();
    table.string("email", 100).nullable();
    table.integer("created_at").notNullable();
    table.integer("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("contacts");
};
