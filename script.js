class Book {
    constructor(name, author, pages, status) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

//Adds Books in local storage
function createBook(){
    let bookName = document.getElementById('name').value;
    let bookAuthor = document.getElementById('author').value;
    let bookPages = document.getElementById('pages').value;
    let bookStatus = false;
    if(document.getElementById('read').checked){
        bookStatus = true;
    }
    if(bookName == "" || bookAuthor == "" || bookPages == "") {
        document.getElementById('msg').innerHTML = "Please Enter Values for all fields!";
        return false;
    }else document.getElementById('msg').innerHTML = "";


    const newBook = new Book(bookName, bookAuthor, bookPages, bookStatus);
    var temparray = JSON.parse(localStorage.getItem('library')) || [];
    temparray.push(newBook);
    localStorage.setItem('library', JSON.stringify(temparray));
    getTotalBooks();
    getTotalUnread;
    form.reset();                   //reset form input fields

    document.getElementById('form-container').style.visibility = "hidden";
    getbooks();
}


//Form
const form = document.getElementById('addform');
const submitBtn = document.getElementById('form-add');
submitBtn.addEventListener("click", createBook);

const closebtn = document.getElementById('form-close');
closebtn.onclick = function(){
    form.reset();
    document.getElementById('form-container').style.visibility = "hidden";
    document.getElementById('msg').innerHTML = "";
}


//Add Book in Library button
const addtolib = document.getElementById('addbook-btn');
addtolib.onclick = function(){
    document.getElementById('form-container').style.visibility = "visible";
    return true;
}

//display book visual in library
const library = document.getElementById('library');

function displayBook(btitle, bauthor, bpages, bstatus){
    const book = document.createElement('div');
    book.setAttribute('class', 'book');
    library.appendChild(book);

    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const btns = document.createElement('div');
    const mark = document.createElement('div');
    const remove = document.createElement('div');

    book.appendChild(title); title.setAttribute('class', 'bookElement');title.setAttribute('class', 'booktitle'); title.innerHTML = btitle;
    book.appendChild(author); author.setAttribute('class', 'bookElement'); author.innerHTML = bauthor;
    book.appendChild(pages); pages.setAttribute('class', 'bookElement'); pages.innerHTML = bpages;
    book.appendChild(mark);  mark.setAttribute('class', 'bookElement'); mark.setAttribute('class', 'toggle-btn');
    book.appendChild(remove);  remove.setAttribute('class', 'bookElement');remove.setAttribute('class', 'remove-btn'); remove.innerHTML = "Remove";

    if(bstatus){
        mark.innerHTML = "Completed";
        mark.setAttribute('id', 'read');
    }else{
        mark.innerHTML = "Mark Complete";
        mark.setAttribute('id', 'unread');
    }

    remove.addEventListener("click", (e) => {
        removebook(e);
        book.remove();
    });

    mark.onclick = function(e){
        if(mark.innerHTML == "Completed"){
            mark.innerHTML = "Mark Complete";
            mark.setAttribute('id', 'unread');
        }
        else{
            mark.innerHTML = "Completed";
            mark.setAttribute('id', 'read');
        }
        updateStatus(e);    
        getTotalUnread();
    }
}


function removebook(e){
    let removeArr = document.getElementsByClassName('remove-btn');
    const index = Array.from(removeArr).indexOf(e.target);
    var temparray = JSON.parse(localStorage.getItem('library'));
    temparray.splice(index, 1);
    localStorage.setItem('library', JSON.stringify(temparray));
    getTotalBooks();
    getTotalUnread();
    //console.log("removed and updated"+localStorage.getItem('library'));
}

//updating read status
function updateStatus(e){
    let toggleArr = document.getElementsByClassName('toggle-btn');
    const index = Array.from(toggleArr).indexOf(e.target);

    let temparray = JSON.parse(localStorage.getItem('library'));
    temparray[index].status = !temparray[index].status;
    localStorage.setItem('library', JSON.stringify(temparray));
    //console.log("updated"+localStorage.getItem('library'));
}

//displays books on load
function getbooks(){
    var books =JSON.parse(localStorage.getItem('library')) || [];
    for(i=0; i<books.length; i++){
        displayBook(books[i].name, books[i].author, books[i].pages, books[i].status);
    }
    getTotalBooks();
    getTotalUnread();
}

function getTotalUnread(){
    var counter=0;
    var totalunread=0;
    var books = JSON.parse(localStorage.getItem('library'));
    if(books.length == 0)
    for(i=0; i<books.length; i++){
        if(books[i].status) counter++;
    }
    totalunread = books.length-counter;
    document.getElementById('total-unread').innerHTML = "Unread : "+ `${totalunread}`;
}

function getTotalBooks(){
    var counter=0;
    var books = JSON.parse(localStorage.getItem('library'));
    counter = books.length;
    document.getElementById('total').innerHTML = "Total Books : "+`${counter}`;
}

const clearbtn = document.getElementById('clear');
clearbtn.onclick = function(){
    var temparray = [];
    localStorage.setItem('library', JSON.stringify(temparray));
    window.location.reload();
}

window.onload = getbooks();
