// node lookup_people.js Lincoln
// Searching ...
// Found 1 person(s) by the name 'Lincoln':
// - 1: Abraham Lincoln, born '1809-02-12'

//table famous_people

const pg = require('pg');
const settings = require('./settings'); // settings.json
const client = new pg.Client({
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.post,
    ssl      : settings.ssl
});
client.connect((err) => {
    if (err) {
        return console.error('Connection Error', err);
    }
    client.query('SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1', [process.argv[2]], (err, result) => {
        console.log('Searching ...');
        if (err) {
            return console.error('error running query', err);
        }

        console.log(result.rows[0].id + "Found 1 person(s) by the name " + result.rows[0].first_name + " " + result.rows[0].last_name + " born " + result.rows[0].birthdate);

        client.end();
    });
});