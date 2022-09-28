/**
 * [
 *    {
 *      id: <int>
 *      task: <string>
 *      timestamp: <string>
 *      isCompleted: <boolean>
 *    }
 * ]
 */
const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'Bookshelf_Application';

function generateId() {
  return +new Date();
}

function generateBookObject(id, Title, Author, Year, isCompleted) {
  return {
    id,
    Title,
    Author,
    Year,
    isCompleted,
  }
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}


/**
 * Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak
 *
 * @returns boolean
 */
function isStorageExist() /* boolean */ {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

/**
 * Fungsi ini digunakan untuk menyimpan data ke localStorage
 * berdasarkan KEY yang sudah ditetapkan sebelumnya.
 */
function saveData() {
  if (isStorageExist()) {
    const parsed /* string */ = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see todos}
 */
function loadDataFromStorage() {
  const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}


function makeBook(bookObject) {
  const {id, Title, Author, Year, isCompleted} = bookObject;

  const textBookTitle = document.createElement('h2');
  textBookTitle.innerText = Title;

  const textBookAuthor = document.createElement('p');
  textBookAuthor.innerText = Author;

  const textBookYear = document.createElement('p');
  textBookYear.innerText = Year;

  const textContainer = document.createElement('div');
  textContainer.classList.add('inner');
  textContainer.append(textBookTitle, textBookAuthor, textBookYear);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow')
  container.append(textContainer);
  container.setAttribute('id', `book-${id}`);

  if (isCompleted) {
    const ijoButton = document.createElement('button');
    ijoButton.classList.add('green');
    ijoButton.textContent = 'Belum selesai di baca'
    ijoButton.addEventListener('click', function () {
      moveBookToUncompletedBookList(id);
    });
    const redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.textContent = 'Hapus Buku';
    redButton.addEventListener('click', function () {
      removeBookFromCompleted(id);
    });
    container.append(ijoButton, redButton);
  } else {

    const hijauButton = document.createElement('button');
    hijauButton.classList.add('green');
    hijauButton.textContent = 'Sudah selesai di baca'
    hijauButton.addEventListener('click', function () {
      moveBookToListCompleted(id);
    });
    const redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.textContent = 'Hapus Buku';
    redButton.addEventListener('click', function () {
      removeBookFromCompleted(id);
    });

    container.append(hijauButton, redButton);
  }

  return container;
}

function addBook() {
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAuthor = document.getElementById('inputBookAuthor').value;
  const bookYear = document.getElementById('inputBookYear').value;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, false);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function moveBookToListCompleted(bookId /* HTMLELement */) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
    const listCompleted = document.getElementById('completeBookshelfList');
    listCompleted.innerHTML = '';
  listCompleted.append(bookTarget);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function removeBookFromCompleted(bookId /* HTMLELement */) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function moveBookToUncompletedBookList(bookId /* HTMLELement */) {

  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    uncompletedBookList.innerHTML = '';
  uncompletedBookList.append(bookTarget);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

document.addEventListener('DOMContentLoaded', function () {

  const submitForm /* HTMLFormElement */ = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log('Data berhasil di simpan.');
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById('incompleteBookshelfList');
  const listCompleted = document.getElementById('completeBookshelfList');

  // clearing list item
  uncompletedBookList.innerHTML = '';
  listCompleted.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isCompleted) {
      listCompleted.append(bookElement);
    } else {
      uncompletedBookList.append(bookElement);
    }
  }
})


function search() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchBookTitle');
  filter = input.value.toUpperCase();
  for (i=0; i < serializedData.length; i++) {
  }
}
