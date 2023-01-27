//Restaurant Object
const restaurantPrototype = {
    name: "",
    rating: 1,
};
function Restaurant(name, rating){
    this.name = name;
    this.rating = rating;
}
Object.assign(Restaurant.prototype, restaurantPrototype);

//Restaurant table functions
const restaurants = [];
var gRating = 1;

//Creates restaurant object, appends to restaurants array, and adds to inTable
function createRestaurant(rRating){
    var name = $( "#restaurants" ).val();
    var rating = rRating; //add ID here
    if (restaurants.length == 5){
        alert("Please choose only 5 restaurants!");
        return;
    }
    if (isBlankInput(name)){
        alert("Input is blank");
        return;
    }
    //check if they already input it!

    const restaurant = new Restaurant(name, rating);
    restaurants.push(restaurant);
    addTableElement(restaurants.length - 1, "inTBody");
    $( "#restaurants" ).val('');
}

function addTableElement(element, tbody){
    var tableBody = $(`#${tbody}`);
    var tr = $(`<tr/ id='tr${element}'>`).appendTo(tableBody);
    var button = `<button type='button' onclick="deleteTableElement(${element}, 'inTable')">Delete</button>`;
    tr.append("<td>" + restaurants[element].name + "</td>" + "<td>" + starDisplay(restaurants[element].rating) + "</td>" + "<td>" + button + "</td>");
    //Rating
}
function deleteTableElement(element, table) {
    $(`#tr${element}`).remove();
    restaurants.splice(element,1);
}

//Check Functions
function isBlankInput(input){
    return !input.replace(/\s/g, '').length;
}

//Rating Functions
function colorStars(starNumber){
    //Colors stars before orange
    for (let i = starNumber; i > 1; i--){
        document.getElementById(`star${i}`).style.color = "orange"; //jq doesn't work here :(
        //console.log(`Coloring orange star${i}`);
    }
    
    //Colors stars after black
    for (let i = starNumber + 1; i < 6; i++){
        document.getElementById(`star${i}`).style.color = "black"; //jq doesn't work here :(
        //console.log(`Coloring black star${i}`);
    }
}

//Builds and returns html string for stars in table
function starDisplay(rating){
    var starHtml = '<span class="fa fa-star checked"></span> ';
    for(let i = 2; i <= rating; i++){
        starHtml += '<span class="fa fa-star checked"></span> ';
    }
    for(let i = rating + 1; i <= 5; i++){
        starHtml += '<span class="fa fa-star"></span>';
    }
    //console.log(starHtml);
    return starHtml;
}

//Removes current table and rebuilds it with filter
function filterRating(city, zip, rating){
    console.log("Removing current table");
    $("tr[name='removeable']").remove();

    var tableHtml = "";
    const tableArrFiltered = [];
    for(i = 0; i < restaurants.length; i++){
        if (restaurants[i].rating >= rating){
            tableArrFiltered.push(restaurants[i]);
        }
    }
    if (tableArrFiltered.length == 0){
        $("#outTBody").append("<tr name='removeable'> <td> No restaurants in selected filter</td> </tr>");
        console.log("Empty table arr");
        return;
    }
    tableHtml += `<tr name='removeable'> <td> ${city} </td> <td> ${zip} </td> <td> ${tableArrFiltered[0].name} </td> <td> ${starDisplay(tableArrFiltered[0].rating)} </td> </tr>`;
    for (i = 1; i < tableArrFiltered.length; i++){
        tableHtml += `<tr name='removeable'> <td> </td> <td> </td> <td> ${tableArrFiltered[i].name} </td> <td> ${starDisplay(tableArrFiltered[i].rating)} </td> </tr>`;
    }
    $("#outTBody").append(tableHtml);
    console.log("Tbody appended" + tableHtml);
    return;
}

//Driver code
$(document).ready(function () {
    //Restaurant input functions
    $("#restaurants").keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13'){ //on enter key pressed
        createRestaurant(gRating);
    }
    });
    $("#addRestaurant").click(function(){ 
        createRestaurant(gRating);
    });

    //Star rating
    for(let i = 1; i <=5; i++){
        $(`#star${i}`).click(function(){
            gRating = i;
            colorStars(i);
        });
    }

    //Checks if values are valid and continues
    $("#submit").click(function(){
        let city = $("#city").val();
        let zip = $("#zip").val();
        //Check that everything is valid
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
        //-----------------------------
        //Checks passed.. Display Table
        $("#form").hide();
        $("#tableDisplay").show();
        $('#rating').on('change', function() {
            filterRating(city, zip, this.value);
          });
        filterRating(city, zip, 1); 
    });
});