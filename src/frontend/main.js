import {createPage} from './createPage.js';

let num = 2;
addEventListener("click", () => {
    for (let i = 2; i < 12; i++) {
        const row = document.createElement("tr");
        row.setAttribute("id", "row-"+num);
        num++;
        document.getElementById("tbody").appendChild(row);
        for (let j = 1; j < 13; j++) {
            const cell = document.createElement("td");
            cell.textContent = 'Example';
            row.appendChild(cell);
        }
    }
})
