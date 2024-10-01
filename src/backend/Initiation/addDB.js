import mysql from 'mysql';

export function addDB() {
	var con = mysql.createConnection({
		host: 'localhost',
		user: 'script',
		password: 'script123',
	});

	con.connect(function (err) {
		if (err) throw err;
		con.query(
			'CREATE DATABASE IF NOT EXISTS bookmarks',
			function (err, result) {
				if (err) throw err;
				console.log('Database created');
			}
		);
		con.end(function (err) {
			if (err) throw err;
			console.log('Connection ended');
		});
	});
}
