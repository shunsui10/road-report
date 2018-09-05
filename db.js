var postgres = require('pg');
var connection = postgres.Pool({
    host: '127.0.0.1',
    port: '5432',
    database: 'roadreport',
    user: 'postgres',
    username: 'roadreport',
    password: 'roadreport'
});

connection.connect(function(err){    
    if(err){
        console.log(err.stack);
        return;
    }
    console.log('mySql connected as id: ' + connection.threadId);
});

module.exports = connection;