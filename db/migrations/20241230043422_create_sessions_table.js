/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sessions", function (table) {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.integer("user_id").notNullable().references("id").inTable("users");
    table.integer("expires_at").notNullable();
    table.integer("created_at").notNullable();
    table.integer("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sessions");
};
