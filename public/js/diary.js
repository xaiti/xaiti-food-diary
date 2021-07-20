// Date function //
var urlOrigin = window.location.origin;
var url = window.location.href;
var urlDate = url.substring(url.lastIndexOf('/') + 1);
if (urlDate == 'my-diary') { urlDate = new Date() }
var date = new Date(urlDate);

function newDate() {
    diaryDate = new Date(date.setUTCHours(0,0,0,0)); // for sending date to backend

    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();

    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayName = dayNames[date.getDay()];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthName = monthNames[date.getMonth()]; // if needed later

    // if user is viewing todays diary, change 'dayName' to 'today'
    var now = new Date();
    today = new Date(now.setUTCHours(0,0,0,0));
    if (today.getTime() == diaryDate.getTime()) { dayName = 'Today' }

    dayDDMM = `${dayName}, ${day}/${month}`;
    yyyymmdd = `${year}-${month}-${day}`;
    document.querySelector('.date').innerHTML = dayDDMM;
} newDate();

var prevDayButton = document.querySelector('.previous-day');
prevDayButton.addEventListener('click', function() {
    date.setDate(date.getDate() - 1);
    newDate();
    this.nextElementSibling.innerHTML = dayDDMM;
    window.location.href = diaryDate.getTime() == today.getTime() ? `${urlOrigin}/my-diary` : `${urlOrigin}/my-diary/${yyyymmdd}`;
})

var nextDayButton = document.querySelector('.next-day');
nextDayButton.addEventListener('click', function() {
    date.setDate(date.getDate() + 1);
    newDate();
    this.previousElementSibling.innerHTML = dayDDMM;
    window.location.href = diaryDate.getTime() == today.getTime() ? `${urlOrigin}/my-diary` : `${urlOrigin}/my-diary/${yyyymmdd}`;
})



// Total food values //
function totalFoodValues() {
    // total breakfast values
    var breakfastCal = document.querySelectorAll('.breakfast-cal-c');
    var breakfastFat = document.querySelectorAll('.breakfast-fat-c');
    var breakfastSatFat = document.querySelectorAll('.breakfast-sat-fat-c');
    var breakfastCarb = document.querySelectorAll('.breakfast-carb-c');
    var breakfastProtein = document.querySelectorAll('.breakfast-protein-c');
    var breakfastFiber = document.querySelectorAll('.breakfast-fiber-c');
    var breakfastSugar = document.querySelectorAll('.breakfast-sugar-c');

    var breakfastCalNum = 0; var breakfastFatNum = 0; var breakfastSatFatNum = 0;
    var breakfastCarbNum = 0; var breakfastProteinNum = 0; var breakfastFiberNum = 0; var breakfastSugarNum = 0;

    for (var i = 0; i < breakfastCal.length; i++) {
        breakfastCalNum += Number(breakfastCal[i].innerHTML);
        breakfastFatNum += Number(breakfastFat[i].innerHTML);
        breakfastSatFatNum += Number(breakfastSatFat[i].innerHTML);
        breakfastCarbNum += Number(breakfastCarb[i].innerHTML);
        breakfastProteinNum += Number(breakfastProtein[i].innerHTML);
        breakfastFiberNum += Number(breakfastFiber[i].innerHTML);
        breakfastSugarNum += Number(breakfastSugar[i].innerHTML);
    }

    document.querySelector('.breakfast-cal').innerHTML = breakfastCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.breakfast-fat').innerHTML = breakfastFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.breakfast-sat-fat').innerHTML = breakfastSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.breakfast-carb').innerHTML = breakfastCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.breakfast-protein').innerHTML = breakfastProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.breakfast-fiber').innerHTML = breakfastFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.breakfast-sugar').innerHTML = breakfastSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total lunch values
    var lunchCal = document.querySelectorAll('.lunch-cal-c');
    var lunchFat = document.querySelectorAll('.lunch-fat-c');
    var lunchSatFat = document.querySelectorAll('.lunch-sat-fat-c');
    var lunchCarb = document.querySelectorAll('.lunch-carb-c');
    var lunchProtein = document.querySelectorAll('.lunch-protein-c');
    var lunchFiber = document.querySelectorAll('.lunch-fiber-c');
    var lunchSugar = document.querySelectorAll('.lunch-sugar-c');

    var lunchCalNum = 0; var lunchFatNum = 0; var lunchSatFatNum = 0;
    var lunchCarbNum = 0; var lunchProteinNum = 0; var lunchFiberNum = 0; var lunchSugarNum = 0;

    for (var i = 0; i < lunchCal.length; i++) {
        lunchCalNum += Number(lunchCal[i].innerHTML);
        lunchFatNum += Number(lunchFat[i].innerHTML);
        lunchSatFatNum += Number(lunchSatFat[i].innerHTML);
        lunchCarbNum += Number(lunchCarb[i].innerHTML);
        lunchProteinNum += Number(lunchProtein[i].innerHTML);
        lunchFiberNum += Number(lunchFiber[i].innerHTML);
        lunchSugarNum += Number(lunchSugar[i].innerHTML);
    }

    document.querySelector('.lunch-cal').innerHTML = lunchCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.lunch-fat').innerHTML = lunchFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.lunch-sat-fat').innerHTML = lunchSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.lunch-carb').innerHTML = lunchCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.lunch-protein').innerHTML = lunchProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.lunch-fiber').innerHTML = lunchFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.lunch-sugar').innerHTML = lunchSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total dinner values
    var dinnerCal = document.querySelectorAll('.dinner-cal-c');
    var dinnerFat = document.querySelectorAll('.dinner-fat-c');
    var dinnerSatFat = document.querySelectorAll('.dinner-sat-fat-c');
    var dinnerCarb = document.querySelectorAll('.dinner-carb-c');
    var dinnerProtein = document.querySelectorAll('.dinner-protein-c');
    var dinnerFiber = document.querySelectorAll('.dinner-fiber-c');
    var dinnerSugar = document.querySelectorAll('.dinner-sugar-c');

    var dinnerCalNum = 0; var dinnerFatNum = 0; var dinnerSatFatNum = 0;
    var dinnerCarbNum = 0; var dinnerProteinNum = 0; var dinnerFiberNum = 0; var dinnerSugarNum = 0;

    for (var i = 0; i < dinnerCal.length; i++) {
        dinnerCalNum += Number(dinnerCal[i].innerHTML);
        dinnerFatNum += Number(dinnerFat[i].innerHTML);
        dinnerSatFatNum += Number(dinnerSatFat[i].innerHTML);
        dinnerCarbNum += Number(dinnerCarb[i].innerHTML);
        dinnerProteinNum += Number(dinnerProtein[i].innerHTML);
        dinnerFiberNum += Number(dinnerFiber[i].innerHTML);
        dinnerSugarNum += Number(dinnerSugar[i].innerHTML);
    }

    document.querySelector('.dinner-cal').innerHTML = dinnerCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.dinner-fat').innerHTML = dinnerFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.dinner-sat-fat').innerHTML = dinnerSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.dinner-carb').innerHTML = dinnerCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.dinner-protein').innerHTML = dinnerProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.dinner-fiber').innerHTML = dinnerFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.dinner-sugar').innerHTML = dinnerSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total snack values
    var snackCal = document.querySelectorAll('.snack-cal-c');
    var snackFat = document.querySelectorAll('.snack-fat-c');
    var snackSatFat = document.querySelectorAll('.snack-sat-fat-c');
    var snackCarb = document.querySelectorAll('.snack-carb-c');
    var snackProtein = document.querySelectorAll('.snack-protein-c');
    var snackFiber = document.querySelectorAll('.snack-fiber-c');
    var snackSugar = document.querySelectorAll('.snack-sugar-c');

    var snackCalNum = 0; var snackFatNum = 0; var snackSatFatNum = 0;
    var snackCarbNum = 0; var snackProteinNum = 0; var snackFiberNum = 0; var snackSugarNum = 0;

    for (var i = 0; i < snackCal.length; i++) {
        snackCalNum += Number(snackCal[i].innerHTML);
        snackFatNum += Number(snackFat[i].innerHTML);
        snackSatFatNum += Number(snackSatFat[i].innerHTML);
        snackCarbNum += Number(snackCarb[i].innerHTML);
        snackProteinNum += Number(snackProtein[i].innerHTML);
        snackFiberNum += Number(snackFiber[i].innerHTML);
        snackSugarNum += Number(snackSugar[i].innerHTML);
    }

    document.querySelector('.snack-cal').innerHTML = snackCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.snack-fat').innerHTML = snackFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.snack-sat-fat').innerHTML = snackSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.snack-carb').innerHTML = snackCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.snack-protein').innerHTML = snackProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.snack-fiber').innerHTML = snackFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.snack-sugar').innerHTML = snackSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total values
    var totalCalNum = breakfastCalNum + lunchCalNum + dinnerCalNum + snackCalNum;
    var totalFatNum = breakfastFatNum + lunchFatNum + dinnerFatNum + snackFatNum;
    var totalSatFatNum = breakfastSatFatNum + lunchSatFatNum + dinnerSatFatNum + snackSatFatNum;
    var totalCarbNum = breakfastCarbNum + lunchCarbNum + dinnerCarbNum + snackCarbNum;
    var totalProteinNum = breakfastProteinNum +  lunchProteinNum + snackProteinNum + dinnerProteinNum;
    var totalFiberNum = breakfastFiberNum + lunchFiberNum + dinnerFiberNum + snackFiberNum;
    var totalSugarNum = breakfastSugarNum + lunchSugarNum + dinnerSugarNum + snackSugarNum;

    document.querySelector('.total-cal').innerHTML = totalCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-fat').innerHTML = totalFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-sat-fat').innerHTML = totalSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-carb').innerHTML = totalCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-protein').innerHTML = totalProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-fiber').innerHTML = totalFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-sugar').innerHTML = totalSugarNum.toFixed(1).replace(/[.,]0$/, "");
} totalFoodValues();



// Remove food item from table & database //
function removeFoodItem() {
    var removeButton = document.querySelectorAll('.remove-food');
    for (i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener('click', function() {
            // send the food item we want to remove to the backend
            fetch('/remove-food-item', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    meal: this.parentNode.parentNode.parentNode.getAttribute('data-meal'),
                    item_id: this.getAttribute('data-id'),
                    date: diaryDate
                })
            });
            // remove food item from dom
            this.parentNode.parentNode.remove();
            totalFoodValues();
        });
    }
} removeFoodItem();



// Global overlay variable //
var overlay = document.querySelector('.overlay');
function closeOverlayAND(container) {
    overlay.style.display = '';
    container.style.display = '';
}



// Push added water to database //
var addWaterContainer = document.querySelector('.add-water-container');
var waterButton = document.querySelector('.water-button');
waterButton.onclick = () => {
    overlay.style.display = 'block';
    addWaterContainer.style.display = 'block';
    overlay.onclick = () => closeOverlayAND(addWaterContainer); // close add water container if click outside
}

// send water to backend
function updateWater(value) {
    var addWaterInput = Number(document.querySelector('.add-water-input').value);
    // subtract addWaterInput if user selects the minus button
    if (value == 'minus') { addWaterInput = - addWaterInput }
    var addedWaterInML = document.querySelector('input[name="measurement"]:checked').value == 'ml' ? addWaterInput : addWaterInput * 1000;

    if (addWaterInput) {
        fetch('/add-water', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                water: addedWaterInML,
                date: diaryDate
            })
        });
    }
    
    // update table without refreshing the page
    var totalWater = document.querySelector('.total-water');
    var newTotalWater = Number(totalWater.getAttribute('data-water-ml')) + addedWaterInML;
    totalWater.setAttribute('data-water-ml', newTotalWater);
    totalWater.innerHTML = newTotalWater + 'ml';
    closeOverlayAND(addWaterContainer);

    // if total water is 1000ml or more, change measurement to L
    if (Number(totalWater.getAttribute('data-water-ml')) >= 1000) {
        totalWater.innerHTML = newTotalWater / 1000 + 'L';
    }
} updateWater();

// submit water button onclick
var submitWaterButton = document.querySelectorAll('.submit-water-button');
for (i = 0; i < submitWaterButton.length; i++) {
    submitWaterButton[i].onclick = function() { updateWater(this.getAttribute('data-value')) }
}



// Push selected food to database //
var foodSearchContainer = document.querySelector('.food-search-container'); // global food search container variable

// meal buttons - show overlay/food search & declare global meal variable
function meal(meal) {
    overlay.style.display = 'block';
    foodSearchContainer.style.display = 'block';
    MEAL = meal;
    overlay.onclick = () => closeOverlayAND(foodSearchContainer); // close food search container if click outside
}
document.querySelector('.breakfast-button').onclick = () => {
    meal('breakfast');
}
document.querySelector('.lunch-button').onclick = () => {
    meal('lunch');
}
document.querySelector('.dinner-button').onclick = () => {
    meal('dinner');
}
document.querySelector('.snack-button').onclick = () => {
    meal('snack');
}

// api for getting all the food
async function api(searchTerms) {
    let api_url = 'https://api.nutritionix.com/v1_1/search/'+searchTerms+'?results=0:05&fields=item_name,brand_name,nf_calories,nf_total_fat,nt_saturated_fat,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_weight_grams,nf_serving_size_qty,nf_serving_size_unit&appId=246713f5&appKey=6328f24ae2491f74e8af49fbbc09bc64';
    fetch(api_url).then(response => response.json())
        .then(data => {
            // hide search results container when text box is empty
            if (searchTerms == undefined || searchTerms == '') {
                document.querySelector('.search-results-container').style.display = '';
            } else {
                document.querySelector('.search-results-container').style.display = 'block';
            }

            // clear search results container everytime the url gets updated
            var searchResultsContainer = document.querySelector('.search-results-container');
            searchResultsContainer.innerHTML = '';

            // loop through each hit
            for (var i = 0; i < data.hits.length; i++) {
                // variables for each field & id
                var item_id = data.hits[i]._id;
                var item_name = data.hits[i].fields.item_name;
                var brand_name = data.hits[i].fields.brand_name;
                var serving_size = data.hits[i].fields.nf_serving_size_qty;
                var serving_unit = data.hits[i].fields.nf_serving_size_unit;
                var cal = Math.round(data.hits[i].fields.nf_calories);

                // create item for each hit
                var searchResultItem = document.createElement('div');
                searchResultItem.className = 'search-result-item';

                // create id div for each item
                var searchResultID = document.createElement('div');
                searchResultID.className = 'search-result-item-id';
                searchResultID.innerHTML = item_id;
                searchResultID.style.display = 'none';

                // create name div for each item
                var searchResultName = document.createElement('div');
                searchResultName.className = 'search-result-item-name';
                searchResultName.innerHTML = item_name;

                // create sub info div for each item
                var searchResultSubInfo = document.createElement('div');
                searchResultSubInfo.className = 'search-result-item-sub-info';
                searchResultSubInfo.innerHTML = `${brand_name}, ${serving_size} ${serving_unit}`;
                
                // create container div to display callories for each item
                var searchResultCalContainer = document.createElement('div');
                searchResultCalContainer.className = 'search-result-item-cal-container';

                var searchResultCal = document.createElement('div');
                searchResultCal.className = 'search-result-item-cal';
                searchResultCal.innerHTML = cal;

                var searchResultCalText = document.createElement('div');
                searchResultCalText.className = 'search-result-item-cal-text';
                searchResultCalText.innerHTML = 'cal';

                // append all the divs to the results container
                searchResultsContainer.appendChild(searchResultItem);
                searchResultItem.appendChild(searchResultID);
                searchResultItem.appendChild(searchResultName);
                searchResultItem.appendChild(searchResultSubInfo);
                searchResultItem.appendChild(searchResultCalContainer);
                searchResultCalContainer.appendChild(searchResultCal);
                searchResultCalContainer.appendChild(searchResultCalText);

                // search result item on click
                searchResultItem.onclick = async function(e) {
                    var selecteditem_id = e.currentTarget.querySelector('.search-result-item-id').innerHTML;
                    var selectedItemURL = 'https://api.nutritionix.com/v1_1/item?id='+selecteditem_id+'&appId=246713f5&appKey=6328f24ae2491f74e8af49fbbc09bc64';

                    // get all the data for selected food item
                    fetch(selectedItemURL).then(response => response.json())
                        .then(data => {
                            var food_id = data.item_id;
                            var food_name = data.item_name;
                            var food_brand_name = data.brand_name;
                            var food_serving_qty = Math.round(data.nf_serving_size_qty * 10) / 10;
                            var food_serving_unit = data.nf_serving_size_unit;
                            var food_serving_weight = data.nf_serving_weight_grams;
                            var food_cal = Math.round(data.nf_calories);
                            var food_fat = Math.round(data.nf_total_fat * 10) / 10;
                            var food_sat_fat = Math.round(data.nf_saturated_fat * 10) / 10;
                            var food_carb =  Math.round(data.nf_total_carbohydrate * 10) / 10;
                            var food_protein = Math.round(data.nf_protein * 10) / 10;
                            var food_fibre = Math.round(data.nf_dietary_fiber * 10) / 10;
                            var food_sugar = Math.round(data.nf_sugars * 10) / 10;

                            // send food data to backend
                            fetch('/my-diary', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    meal: `food.${MEAL}`,
                                    food_item: {
                                        id: food_id,
                                        item_name: food_name,
                                        brand_name: food_brand_name,
                                        serving_qty: food_serving_qty,
                                        serving_unit: food_serving_unit,
                                        serving_weight: food_serving_weight,
                                        brand_name: food_brand_name,
                                        cal: food_cal,
                                        fat: food_fat,
                                        sat_fat: food_sat_fat,
                                        carb: food_carb,
                                        protein: food_protein,
                                        fiber: food_fibre,
                                        sugar: food_sugar
                                    },
                                    date: diaryDate
                                })
                            })

                            // update the data to the table without refreshing the page
                            // get desired row
                            var i = MEAL == 'breakfast' ? 0 : MEAL == 'lunch' ? 1 : MEAL == 'dinner' ? 2 : 3
                            var currentRow = document.querySelector('.food-diary').getElementsByTagName('tbody')[i];
                            
                            // insert a row at the end of table (desired row)
                            var newRow = currentRow.insertRow();

                            // insert a cell at the end of the row & append a text node to the cell
                            var nameC = newRow.insertCell(); nameC.className = 'name-con';
                            nameC.innerHTML = `${food_name}<div class="remove-food remove-button icon" data-id="${food_id}"></div>`;
                            
                            var servingC = newRow.insertCell();
                            servingC.innerHTML = `${food_serving_qty}, ${food_serving_unit}`;

                            var calC = newRow.insertCell();
                            calC.className = `${MEAL}-cal-c`
                            calC.innerHTML = food_cal;

                            var fatC = newRow.insertCell();
                            fatC.className = `${MEAL}-fat-c`
                            fatC.innerHTML = food_fat;

                            var satFatC = newRow.insertCell();
                            satFatC.className = `${MEAL}-sat-fat-c`
                            satFatC.innerHTML = food_sat_fat;

                            var carbC = newRow.insertCell();
                            carbC.className = `${MEAL}-carb-c`
                            carbC.innerHTML = food_carb;

                            var proteinC = newRow.insertCell();
                            proteinC.className = `${MEAL}-protein-c`
                            proteinC.innerHTML = food_protein;

                            var fibreC = newRow.insertCell();
                            fibreC.className = `${MEAL}-fiber-c`
                            fibreC.innerHTML = food_fibre;

                            var sugarC = newRow.insertCell();
                            sugarC.className = `${MEAL}-sugar-c`
                            sugarC.innerHTML = food_sugar;

                            // close search after selecting food item
                            closeOverlayAND(foodSearchContainer);

                            // Update total food values
                            totalFoodValues();

                            // Update remove food item buttons
                            removeFoodItem();
                        });
                }
            }
        });
}



// Add dummy data to database //
// reload page function
var reload = () => setTimeout(() => {
    window.location.reload(true);
}, 100);

var nameHeader = document.querySelector('.name-header');
nameHeader.addEventListener('click', function() {
    fetch('/dummy', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            snack: {
                id: 'bitofgreenonthetopright',
                item_name : 'banananana',
                brand_name: 'not ripe',
                serving_qty: 1,
                serving_unit: '7"',
                serving_weight: 118,
                cal: 105,
                fat: 0.4,
                sat_fat: 0.1,
                carb: 27,
                protein: 1.3,
                fiber: 3.1,
                sugar: 14.4
            },
            date: diaryDate
        })
    });
    reload();
});