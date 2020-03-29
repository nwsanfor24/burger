$(function() {
    $(".change-devour").on("click", function(event) {
        let id = $(this).data("id");
        let newDevour = $(this).attr("data-newdevour");

        let newDevourState = {
            devoured: newDevour
        };

        //PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function() {
                console.log("Changed devoured to", newDevour);

                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        let newBurger = {
            name: $("#br").val().trim(),
            devoured: $("[name=group1]:checked").val().trim()
        };

        //Send POST request
        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Created new burger");

                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function(event) {
        let id = $(this).data("id");

        //Send DELETE request
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("Deleted burger", id);

                location.reload();
            }
        );
    });
});