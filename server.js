// Dependencies
var express = require('express');
var path = require('path');



// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Table arrays
// "Currently available" tables
var currentTables = [
    
];

// "Waiting list" tables
var waitingList = [

];

// Functions to push incoming POST requests to arrays
function pushToReservations(customer) {
    currentTables.push(customer);

}

function pushToWaitingList(customer){
    waitingList.push(customer);
}

function checkReservations(object) {
    if (currentTables.length < 5){
        //call push to waiting list
        pushToReservations(object);
    }
    else {
        pushToWaitingList(object);
    }
}

// POST requests
app.post("/api/reserve", function(req, res) {
    var newReservation = req.body;
    checkReservations(newReservation);
    res.json(newReservation);
});

// GET requests
// Displays currently available tables
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/view-tables", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
})

app.get("/make-reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "make-reservation.html"));
});

app.get("/api/current-tables", function(req, res) {
    return res.json(currentTables);
});

// Displays waiting list tables
app.get("/api/waiting-list", function(req, res) {
    return res.json(waitingList);
});

app.get("/js", function(req, res) {
    return res.sendFile(path.join(__dirname, "assets/post.js"))
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});