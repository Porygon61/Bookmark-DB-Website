import mysql from 'mysql2';

export function addDB() {
	const con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'filip10',
	});

	con.connect(function (err) {
		if (err) {
			console.error('Error connecting to MySQL:', err);
			return;
		}

		// Create the bookmarks database if it doesn't exist
		con.query('CREATE DATABASE IF NOT EXISTS bookmarks', function (err, result) {
			if (err) {
				console.error('Error creating database:', err);
			} else {
				console.log('Database created or already exists.');
			}

			// Close the connection after creating the database
			con.end(function (err) {
				if (err) {
					console.error('Error closing the connection:', err);
				} else {
					console.log('Connection closed.');
				}
			});
		});
	});
}
