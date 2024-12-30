/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("group_members", function (table) {
    table.increments("id");
    table.integer("group_id").notNullable().references("id").inTable("groups");
    table
      .integer("contact_id")
      .notNullable()
      .references("id")
      .inTable("contacts");
    table.integer("created_at").notNullable();
    table.integer("updated_at").notNullable();

    table.unique(["group_id", "contact_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("group_members");
};
