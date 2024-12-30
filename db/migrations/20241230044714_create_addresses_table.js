/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("addresses", function (table) {
    table.increments("id");
    table
      .integer("contact_id")
      .notNullable()
      .references("id")
      .inTable("contacts");
    table.string("street", 100).notNullable();
    table.string("city", 100).nullable();
    table.string("district", 100).nullable();
    table.string("sub_district", 100).nullable();
    table.string("postal_code", 100).nullable();
    table.integer("created_at").notNullable();
    table.integer("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("addresses");
};
