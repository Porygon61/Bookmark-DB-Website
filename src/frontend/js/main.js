createDummyRows();

function createDummyRows() {
	let num = 2;
	addEventListener('click', () => {
		for (let i = 2; i < 12; i++) {
			const row = document.createElement('tr');
			row.setAttribute('id', 'row-' + num);
			num++;
			document.getElementById('tbody').appendChild(row);
			for (let j = 1; j < 13; j++) {
				const cell = document.createElement('td');
				cell.setAttribute('id', 'column-' + j);
				if (j == 1) {
					cell.innerHTML =
						'<button class="fa-solid fa-pen-to-square"></button>';
				} else if (j == 2) {
					cell.innerHTML =
						'<a href="http://www.example.com"><button class="fa-solid fa-share"></button></a>';
				} else {
					cell.textContent = 'Example';
				}

				row.appendChild(cell);
			}
		}
	});
}
