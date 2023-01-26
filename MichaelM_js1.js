const restaurants = [];

function addTableElement(element, tbody){
    var tableBody = $(`#${tbody}`);
    var tr = $(`<tr/ id='tr${element}'>`).appendTo(tableBody);
    var button = `<button type='button' onclick="deleteTableElement(${element}, 'inTable')">Delete</button>`;
    tr.append("<td>" + restaurants[element] + button + "</td>");
}
function deleteTableElement(element, table){
    $(`#tr${element}`).remove();
    restaurants.splice(element,1);
}
function isBlankInput(input){
    return !input.replace(/\s/g, '').length;
}

$(document).ready(function () {
    $("#restaurants").keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13'){ //on enter key pressed
        if (restaurants.length == 5){
            alert("Please choose only 5 restaurants!");
            return;
        }
        var restaurant = $( "#restaurants" ).val();
        if (isBlankInput(restaurant)){
            alert("Input is blank");
        }
        restaurants.push(restaurant);
        addTableElement(restaurants.length - 1, "inTBody");
        $( "#restaurants" ).val('');
    }
    });
    $("#addRestaurant").click(function(){ 
        var restaurant = $( "#restaurants" ).val();
        if (restaurants.length == 5){
            alert("Please choose only 5 restaurants!");
            return;
        }
        if (isBlankInput(restaurant)){
            alert("Input is blank");
            return;
        }
        restaurants.push(restaurant);
        addTableElement(restaurants.length - 1, "inTBody");
        $( "#restaurants" ).val('');
    });
    $("#submit").click(function(){
        let city = $("#city").val();
        let zip = $("#zip").val();
        if (isBlankInput(city)){
            alert("City input is blank");
            return;
        }
        if (zip.length != 5 || isBlankInput(zip) || isNaN(zip)){
            alert("Please input a valid zipcode");
            return;
        }
        if (restaurants.length < 1){
            alert("Please choose at least one restaurant");
            return;
        }
        $("#form").hide();
        $("#outTable").show();
        $("#outTBody").append(`<tr> <td> ${city} </td> <td> ${zip} </td> <td> ${restaurants[0]} </td> </tr>`);
        for (i = 1; i < restaurants.length; i++){
            $("#outTBody").append(`<tr> <td> </td> <td> </td> <td> ${restaurants[i]} </td> </tr>`);
        }
    });
});