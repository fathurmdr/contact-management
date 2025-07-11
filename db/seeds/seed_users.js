/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const currentDate = new Date().getMilliseconds()
  await knex('users').insert([
    {
      name: "Jhon Doe",
      email: "jhon.doe@email.com",
      phone_number: "+62-81234566789",
      bio: "Software Developer",
      password: "hello_world123",
      created_at: currentDate,
      updated_at: currentDate
    }, {
      name: "Alexander Stefanus",
      email: "alex.stafanus@email.com",
      phone_number: "+62-86236532176",
      bio: "Software Developer",
      password: "hello_world123",
      created_at: currentDate,
      updated_at: currentDate
    }
  ]);
};
