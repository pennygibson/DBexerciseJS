const settings = require('./settings');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


knex('famous_people').insert(
  [
    {
      first_name: process.argv[2],
      last_name: process.argv[3],
      birthdate: process.argv[4]
    }
  ]
)
.catch((err) => {
  console.log(err)
})
.finally((err) => {
  knex.destroy()
})



