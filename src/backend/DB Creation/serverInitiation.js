import mysql from 'mysql2';
import data from './Bookmarks/JSON/Bookmarks.json' assert { type: 'json' };
import { addDB } from './addDB.js';

addDB(); // First, make sure the database is created

// Create MySQL connection for working with bookmarks
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'filip10',
	database: 'bookmarks',
});

con.connect(function (err) {
	if (err) {
		console.error('Error connecting to the database:', err);
		return;
	}
	console.log('Connected to the database!');

	// Create table if it doesn't exist
	const createTableSQL = `
		CREATE TABLE IF NOT EXISTS bookmarks (
			URL VARCHAR(255),
			Rating VARCHAR(255),
			Progress INT,
			Title VARCHAR(255),
			Website VARCHAR(255),
			Status VARCHAR(255),
			Plot VARCHAR(255),
			Type VARCHAR(255),
			Notes VARCHAR(255),
			LastRead VARCHAR(255),
			Added VARCHAR(255),
			id INT AUTO_INCREMENT PRIMARY KEY
		)`;

	con.query(createTableSQL, function (err, result) {
		if (err) {
			console.error('Error creating table:', err);
			con.end();
			return;
		}
		console.log('Table created or already exists.');

		// Insert bookmarks data into the table
		const insertSQL = `
			INSERT INTO bookmarks (
				URL, Rating, Progress, Title, Website, Status, Plot, Type, Notes, LastRead, Added
			) VALUES ?`;

		const values = getBookmarks(); // Get bookmark data

		if (values.length > 0) {
			con.query(insertSQL, [values], function (err, result) {
				if (err) {
					console.error('Error inserting data:', err);
				} else {
					console.log(`Number of records inserted: ${result.affectedRows}`);
				}
				// Close the connection after the insertion
				con.end(function (err) {
					if (err) console.error('Error closing connection:', err);
					else console.log('Connection closed.');
				});
			});
		} else {
			console.log('No bookmarks to insert.');
			con.end();
		}
	});
});

// Function to convert JSON bookmarks into array format for insertion
function getBookmarks() {
	const bookmarksObjects = data; // Already parsed JSON object
	const bookmarks = [];

	bookmarksObjects.forEach((bookmark) => {
		bookmarks.push([
			bookmark.Link,
			bookmark.Rating,
			bookmark.Progress,
			bookmark.Name,
			bookmark.Website,
			bookmark['Status (On Site)'],
			bookmark.Plot,
			bookmark.Type,
			bookmark.Notes,
			bookmark['Last Read'],
			bookmark.Added,
		]);
	});

	return bookmarks;
}
