/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("name", 100).notNullable();
    table.string("email", 100).notNullable().unique();
    table.string("phone_number", 100).notNullable().unique();
    table.string("password", 100).notNullable();
    table.string("bio", 255).nullable();
    table.integer("created_at").notNullable();
    table.integer("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
