import express from "express";
import bodyParser from "body-parser";
const app = express();

const port = 3000;

const bookStore = {
  book1: { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  book2: { id: 2, title: "1984", author: "George Orwell" },
  book3: { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" }
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(bookStore);
  console.log(Object.keys(bookStore).length);
});

app.post("/new", (req, res) => {
    const bookId = `book${Object.keys(bookStore).length + 1}`;
    const newBook = {
        id: Object.keys(bookStore).length + 1,
        title: req.body.title,
        author: req.body.author,
    };
    bookStore[bookId] = newBook;
    res.send(bookStore);
});

app.put("/update",(req,res)=>{
    const idToUpdate = parseInt(req.body.id);
    if (idToUpdate > Object.keys(bookStore).length){
        res.status(404).send("Book not found!!");
    }
    const book = Object.keys(bookStore).find(key =>bookStore[key].id === idToUpdate);
    const updatedTitle = req.body.title?req.body.title:bookStore[book].title;
    const updatedAuthor = req.body.author?req.body.author:bookStore[book].author;
    bookStore[book] = {id:idToUpdate,
        title:updatedTitle,
        author:updatedAuthor
    };
    res.send(bookStore);
})

app.delete("/delete",(err,req,res)=>{
    const idToDelete = parseInt(req.body.id);
    if (idToDelete > Object.keys(bookStore).length){
        res.status(404).send("Book not found!!");
        console.error(err.message);
    }
    const bookToDelete = Object.keys(bookStore).find(key=> bookStore[key].id === idToDelete);
    delete bookStore[bookToDelete];
    console.log(bookStore);
    res.send(bookStore);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
