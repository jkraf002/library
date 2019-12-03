// Try to encorporate this program with the goodreads API. Pull in books,
// manage them from Booklabs, push changes back to goodreads. Add progress
// bars and other similar functionality that is on goodreads.

// the constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
    const row = document.createElement('tr');

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
    if (book.read) {
        read.textContent = "Read";
    } else {
        read.textContent = "Unread";
        read.classList.add('unread');
    }
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
let inputList = Array.from(document.querySelectorAll('input'));

document.querySelector('button').addEventListener('click', render);
// event listener to change read status on tables back and forth.
