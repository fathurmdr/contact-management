/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("groups", function (table) {
    table.increments("id");
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.string("name", 100).notNullable();
    table.string("description", 255).nullable();
    table.integer("created_at").notNullable();
    table.integer("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("groups");
};
