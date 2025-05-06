var fullName;
var studentId;
var userName;
var program;
var categories = new Array();
var book = new Array();
var rowID;

class Category {
    constructor(categoryGroup, logo) {
        this.categoryGroup = categoryGroup;
        this.logo = logo;
    }
}

class Books {
    constructor(bookID, title, isbn, pageCount, thumbnailUrl, longDescription, authors, category) {
        this.bookID = bookID; this.title = title; this.isbn = isbn; this.pageCount = pageCount;
        this.thumbnailUrl = thumbnailUrl; this.longDescription = longDescription;
        this.authors = authors; this.category = category;
    }
}

$(document).ready(function () {
    //console.log("in doc ready");

    $.ajax({
        type: "GET", url: "data/A2-JSON.json",
        dataType: "json",
        success: loadArrays
    }); // end of ajax call

}); // end of document ready

function loadArrays(data) {
    fullName = data.PersonalData.FullName;
    studentId = data.PersonalData.StudentID;
    userName = data.PersonalData.UserName;
    program = data.PersonalData.Program;

    // load categories and book detail in the section using JQuery
    for (let cat of data.Categories) {
        categories.push(new Category(cat.categoryGroup, cat.logo));
    }
    console.log(categories);

    for (let books of data.BookDetail) {
        book.push(new Books(books.bookID, books.title,
            books.isbn, books.pageCount,
            books.thumbnailUrl, books.longDescription,
            books.authors, books.category));
    }
    console.log(book);

    // save data to local storage
    localStorage.setItem("name", fullName);
    localStorage.setItem("id", studentId);
    localStorage.setItem("username", userName);
    localStorage.setItem("program", program);

    mainScreen(data);

} // end of loadArrays

// mainScreen function
function mainScreen(data) {
    $("#heading").html(
        `
        SYST24444 / Assignment #2 / Winter 2022<br>
        ${fullName} / ${studentId}<hr>
        `
    );
    $("#heading").addClass("header");

    for (let x = 0; x < categories.length; x++) {
        $("#catList").append(
            `
            <a id='${x}' href='pages/bookdetail.html'>${categories[x].categoryGroup}</a>
            <p><img src='images/${categories[x].logo}' width='226'></p>
            `
        );
        $("#catList").addClass("container");
        $("a").addClass("button");
    }

    $("footer").html(
        `
        <hr>My Sheridan User Name: ${userName}<br>
        My Program: ${program}
        `
    );
    $("footer").addClass("footer");
}

// Save data to local storage
$(document).on("click", "#catList > a", function () {
    localStorage.setItem(
        "rowID",
        $(this).closest("a").attr("id")
    );
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("bookdetails", JSON.stringify(book));
});