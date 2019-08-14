
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDgDeSPqLPbvqysP8mibqzSE5lmxDA2N4",
    authDomain: "assignment-bc83c.firebaseapp.com",
    databaseURL: "https://assignment-bc83c.firebaseio.com",
    projectId: "assignment-bc83c",
    storageBucket: "assignment-bc83c.appspot.com",
    messagingSenderId: "115310898724",
    appId: "1:115310898724:web:fde5251d85285681"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainData = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);
    alert("train added!");
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");



    console.log(firstTrain);
    return false
})

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");
    console.log(remainder)
    console.log(minutes)
    console.log(arrival)
    $("#train-table >tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" +
        minutes + "</td></tr>");
})

