
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
let search = process.argv[2]
knex.select('*')
.from('famous_people')
.where('first_name', "LIKE", search )
.orWhere('last_name', "LIKE", search )
.then(function(rows) {
  return console.log(`Searching ... Found ${rows.length} person(s) by the name ${search} : ${rows[0].id} ${rows[0].first_name} ${rows[0].last_name}, born ${rows[0].birthdate}`);
})
.catch(function(error) {
  console.error(error)
})
.finally(error) => {
  knex.destroy();
});


