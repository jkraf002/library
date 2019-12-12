// Try to encorporate this program with the goodreads API. Pull in books,
// manage them from Booklabs, push changes back to goodreads. Add progress
// bars and other similar functionality that is on goodreads.

// Further assignment: convert factory functions into Classes

// the constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function toggleRead(e) {
    if (e.target.classList.contains('unread')) {
        e.target.classList.remove('unread');
        e.target.textContent = "Read";
        myLibrary[Number(e.target.id)].read = true;
        // change object property to true
    } else {
        e.target.classList.add('unread');
        e.target.textContent = "Unread";
        myLibrary[Number(e.target.id)].read = false;
        // change object property to false
    }
}

function removeBook(e) {
    const rowIndex = Number(e.target.id) + 1; // Avoid header row
    const table = document.querySelector('table');
    table.deleteRow(rowIndex);
}

function render() {
    
    // check if there are values in input fields.
    if (checkInputs()) {
        let values = [];
        for (let element of inputList) {
            values.push(element.value);
        }

        let readStatus = false;
        const index = document.querySelector('select').selectedIndex;
        if (index == 0) {
            readStatus = true;
        }

        addBookToLibrary(...values, readStatus);
        updateTable(myLibrary[myLibrary.length-1]);
        resetInputs();
    }
    // highlight unfilled input fields
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function checkInputs() {
    for (let element of inputList) {
        if (element.value == "") {
            return false;
        }
    }
    return true;
}

function updateTable(book) {
    const index = myLibrary.length - 1;
    const row = document.createElement('tr');

    const clear = document.createElement('button');
    clear.textContent = 'X';
    clear.setAttribute('id', `${index}`);
    clear.classList.add('delete');
    clear.addEventListener('click', removeBook);
    const tmpCell = document.createElement('td');
    tmpCell.append(clear);
    row.append(tmpCell);

    const title = document.createElement('td');
    title.textContent = book.title;
    row.append(title);

    const author = document.createElement('td');
    author.textContent = book.author;
    row.append(author);

    const pages = document.createElement('td');
    pages.textContent = book.pages;
    row.append(pages);

    const read = document.createElement('button');
    read.setAttribute('id', `+${index}`);
    if (book.read) {
        read.textContent = "Read";
    } else {
        read.textContent = "Unread";
        read.classList.add('unread');
    }
    read.addEventListener('click', toggleRead);

    const cell = document.createElement('td');
    cell.append(read);
    row.append(cell);
   
    document.querySelector('tbody').append(row);
}

function resetInputs() {
    for (let element of inputList) {
        element.value = "";
    }
    document.querySelector('select').selectedIndex = 0;
}

let myLibrary = [];
myLibrary.push(new Book('The Very Hungry Caterpillar', 'Eric Carle', 26, true));
updateTable(myLibrary[0]);
myLibrary.push(new Book('The Hounds of the Baskervilles', 'Sir Arthur Conan Doyle', 320, false));
updateTable(myLibrary[1]);

const inputList = Array.from(document.querySelectorAll('input'));

document.querySelector('button').addEventListener('click', render);
statusButtons = Array.from(document.querySelectorAll('button.status'));
for (let button of statusButtons) {
    button.addEventListener('click', toggleRead);
}
