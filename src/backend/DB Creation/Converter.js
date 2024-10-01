import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// Function to convert Excel (xlsm or xlsx) file to JSON
function excelToJson(filePath) {
    const workbook = XLSX.readFile(filePath);
    let allSheetData = [];

    // Loop through all sheets in the Excel file
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];

        // Convert the sheet to JSON format with headers
        let sheetData = XLSX.utils.sheet_to_json(worksheet, { defval: "/" }); // 'defval' ensures empty cells are filled with "/"

        // Replace hyperlinks with plain text URLs (we modify sheetData directly)
        sheetData = replaceHyperlinks(worksheet, sheetData);

        // Combine all sheet data into one array of objects
        allSheetData = allSheetData.concat(sheetData);
    });

    return allSheetData;
}

// Function to replace hyperlinks with plain text URLs
function replaceHyperlinks(worksheet, sheetData) {
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
            const cell = worksheet[cellRef];

            // Check if the cell contains a hyperlink
            if (cell && cell.l && cell.l.Target) {
                const url = cell.l.Target;
                
                // Find the corresponding row in sheetData and update it
                const rowIndex = row - 1;  // row index in sheetData
                if (sheetData[rowIndex]) {
                    const headerKeys = Object.keys(sheetData[rowIndex]);

                    // Match the column index with the corresponding key in sheetData
                    const colName = headerKeys[col];  // The actual column name (header)

                    if (colName && sheetData[rowIndex][colName]) {
                        sheetData[rowIndex][colName] = url; // Replace the value with the hyperlink
                    }
                }
            }
        }
    }

    return sheetData;
}

// Function to ensure the directory exists
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Specify the Excel file path
const filePath = 'src/backend/DB Creation/Bookmarks/EXCEL/Manga Bookmarks.xlsm';

// Convert the Excel file to JSON
const jsonResult = excelToJson(filePath);

// Define the directory and JSON file path
const directoryPath = 'src/backend/DB Creation/Bookmarks/JSON/';
const jsonFilePath = path.join(directoryPath, 'Bookmarks.json');

// Ensure the directory exists (creates it if it doesn't)
ensureDirectoryExists(directoryPath);

// Write the JSON to the specified file as an array of objects
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonResult, null, 2));

console.log("Excel file has been converted to JSON successfully!");
