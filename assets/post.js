$("#add-btn").on("click", function (event) {
    event.preventDefault();
    console.log($('#name').val().trim());
    console.log($('#phone').val().trim());
    console.log($('#email').val().trim());
    console.log($('#userid').val().trim());
    var newCharacter = {
        name: $("#name").val().trim(),
        phone: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        userid: $("#userid").val().trim()
    };
    console.log(newCharacter);

    $.post("api/reserve", newCharacter)
    .then(function (data) {
        console.log("make-reservation.html", data);
        alert("Adding character...");
    });
});