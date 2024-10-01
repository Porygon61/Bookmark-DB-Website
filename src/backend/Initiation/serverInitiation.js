import mysql from 'mysql';
import http from 'http';
import data from './Bookmarks/bookmarks.json' assert { type: 'json' };
import { addDB } from './addDB.js';

addDB();
console.log('Server running, Database exists and is connected');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'script',
	password: 'script123',
	database: 'bookmarks',
});

con.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
	var sql =
		'CREATE TABLE IF NOT EXISTS bookmarks (URL VARCHAR(255),Rating VARCHAR(255), Progress INT, Title VARCHAR(255), Website VARCHAR(255), Status VARCHAR(255), Plot VARCHAR(255),Type VARCHAR(255), Notes VARCHAR(255), LastRead VARCHAR(255), Added VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)';
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log('Table created');
	});
	var sql =
		'INSERT INTO bookmarks (URL, Rating, Progress, Title, Website, Status, Plot, Type, Notes, LastRead, Added) VALUES ?';
	var values = getBookmarks(); //array of arrays
	con.query(sql, [values], function (err, result) {
		if (err) throw err;
		console.log('Number of records inserted: ' + result.affectedRows);
	});
	con.end(function (err) {
		if (err) throw err;
		console.log('Disconnected!');
	});
});

function getBookmarks() {
	const JSONdata = JSON.stringify(data);
	const bookmarksObjects = JSON.parse(JSONdata);

	const bookmarks = [];

	for (let i = 0; i < bookmarksObjects.length; i++) {
		bookmarks.push([
			bookmarksObjects[i].Link,
			bookmarksObjects[i].Rating,
			bookmarksObjects[i].Progress,
			bookmarksObjects[i].Name,
			bookmarksObjects[i].Website,
			bookmarksObjects[i]['Status (On Site)'],
			bookmarksObjects[i].Plot,
			bookmarksObjects[i].Type,
			bookmarksObjects[i].Notes,
			bookmarksObjects[i]['Last Read'],
			bookmarksObjects[i].Added,
		]);
	}

	return bookmarks;
}
