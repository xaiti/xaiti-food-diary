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
    var breakfastCal = document.querySelectorAll('.breakfast-cal');
    var breakfastFat = document.querySelectorAll('.breakfast-fat');
    var breakfastSatFat = document.querySelectorAll('.breakfast-sat-fat');
    var breakfastCarb = document.querySelectorAll('.breakfast-carb');
    var breakfastProtein = document.querySelectorAll('.breakfast-protein');
    var breakfastFiber = document.querySelectorAll('.breakfast-fiber');
    var breakfastSugar = document.querySelectorAll('.breakfast-sugar');

    var breakfastCalNum = 0; var breakfastFatNum = 0; var breakfastSatFatNum = 0;
    var breakfastCarbNum = 0; var breakfastProteinNum = 0; var breakfastFiberNum = 0; var breakfastSugarNum = 0;

    // add total values together for each food item
    for (var i = 0; i < breakfastCal.length; i++) {
        breakfastCalNum += Number(breakfastCal[i].childNodes[1].nodeValue);
        breakfastFatNum += Number(breakfastFat[i].innerHTML);
        breakfastSatFatNum += Number(breakfastSatFat[i].innerHTML);
        breakfastCarbNum += Number(breakfastCarb[i].innerHTML);
        breakfastProteinNum += Number(breakfastProtein[i].innerHTML);
        breakfastFiberNum += Number(breakfastFiber[i].innerHTML);
        breakfastSugarNum += Number(breakfastSugar[i].innerHTML);
    }

    document.querySelector('.total-breakfast-cal').childNodes[1].nodeValue = breakfastCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-breakfast-fat').innerHTML = breakfastFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-breakfast-sat-fat').innerHTML = breakfastSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-breakfast-carb').innerHTML = breakfastCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-breakfast-protein').innerHTML = breakfastProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-breakfast-fiber').innerHTML = breakfastFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-breakfast-sugar').innerHTML = breakfastSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total lunch values
    var lunchCal = document.querySelectorAll('.lunch-cal');
    var lunchFat = document.querySelectorAll('.lunch-fat');
    var lunchSatFat = document.querySelectorAll('.lunch-sat-fat');
    var lunchCarb = document.querySelectorAll('.lunch-carb');
    var lunchProtein = document.querySelectorAll('.lunch-protein');
    var lunchFiber = document.querySelectorAll('.lunch-fiber');
    var lunchSugar = document.querySelectorAll('.lunch-sugar');

    var lunchCalNum = 0; var lunchFatNum = 0; var lunchSatFatNum = 0;
    var lunchCarbNum = 0; var lunchProteinNum = 0; var lunchFiberNum = 0; var lunchSugarNum = 0;

    for (var i = 0; i < lunchCal.length; i++) {
        lunchCalNum += Number(lunchCal[i].childNodes[1].nodeValue);
        lunchFatNum += Number(lunchFat[i].innerHTML);
        lunchSatFatNum += Number(lunchSatFat[i].innerHTML);
        lunchCarbNum += Number(lunchCarb[i].innerHTML);
        lunchProteinNum += Number(lunchProtein[i].innerHTML);
        lunchFiberNum += Number(lunchFiber[i].innerHTML);
        lunchSugarNum += Number(lunchSugar[i].innerHTML);
    }

    document.querySelector('.total-lunch-cal').childNodes[1].nodeValue = lunchCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-lunch-fat').innerHTML = lunchFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-lunch-sat-fat').innerHTML = lunchSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-lunch-carb').innerHTML = lunchCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-lunch-protein').innerHTML = lunchProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-lunch-fiber').innerHTML = lunchFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-lunch-sugar').innerHTML = lunchSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total dinner values
    var dinnerCal = document.querySelectorAll('.dinner-cal');
    var dinnerFat = document.querySelectorAll('.dinner-fat');
    var dinnerSatFat = document.querySelectorAll('.dinner-sat-fat');
    var dinnerCarb = document.querySelectorAll('.dinner-carb');
    var dinnerProtein = document.querySelectorAll('.dinner-protein');
    var dinnerFiber = document.querySelectorAll('.dinner-fiber');
    var dinnerSugar = document.querySelectorAll('.dinner-sugar');

    var dinnerCalNum = 0; var dinnerFatNum = 0; var dinnerSatFatNum = 0;
    var dinnerCarbNum = 0; var dinnerProteinNum = 0; var dinnerFiberNum = 0; var dinnerSugarNum = 0;

    for (var i = 0; i < dinnerCal.length; i++) {
        dinnerCalNum += Number(dinnerCal[i].childNodes[1].nodeValue);
        dinnerFatNum += Number(dinnerFat[i].innerHTML);
        dinnerSatFatNum += Number(dinnerSatFat[i].innerHTML);
        dinnerCarbNum += Number(dinnerCarb[i].innerHTML);
        dinnerProteinNum += Number(dinnerProtein[i].innerHTML);
        dinnerFiberNum += Number(dinnerFiber[i].innerHTML);
        dinnerSugarNum += Number(dinnerSugar[i].innerHTML);
    }

    document.querySelector('.total-dinner-cal').childNodes[1].nodeValue = dinnerCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-dinner-fat').innerHTML = dinnerFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-dinner-sat-fat').innerHTML = dinnerSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-dinner-carb').innerHTML = dinnerCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-dinner-protein').innerHTML = dinnerProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-dinner-fiber').innerHTML = dinnerFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-dinner-sugar').innerHTML = dinnerSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total snack values
    var snackCal = document.querySelectorAll('.snack-cal');
    var snackFat = document.querySelectorAll('.snack-fat');
    var snackSatFat = document.querySelectorAll('.snack-sat-fat');
    var snackCarb = document.querySelectorAll('.snack-carb');
    var snackProtein = document.querySelectorAll('.snack-protein');
    var snackFiber = document.querySelectorAll('.snack-fiber');
    var snackSugar = document.querySelectorAll('.snack-sugar');

    var snackCalNum = 0; var snackFatNum = 0; var snackSatFatNum = 0;
    var snackCarbNum = 0; var snackProteinNum = 0; var snackFiberNum = 0; var snackSugarNum = 0;

    for (var i = 0; i < snackCal.length; i++) {
        snackCalNum += Number(snackCal[i].childNodes[1].nodeValue);
        snackFatNum += Number(snackFat[i].innerHTML);
        snackSatFatNum += Number(snackSatFat[i].innerHTML);
        snackCarbNum += Number(snackCarb[i].innerHTML);
        snackProteinNum += Number(snackProtein[i].innerHTML);
        snackFiberNum += Number(snackFiber[i].innerHTML);
        snackSugarNum += Number(snackSugar[i].innerHTML);
    }

    document.querySelector('.total-snack-cal').childNodes[1].nodeValue = snackCalNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-snack-fat').innerHTML = snackFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-snack-sat-fat').innerHTML = snackSatFatNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-snack-carb').innerHTML = snackCarbNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-snack-protein').innerHTML = snackProteinNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-snack-fiber').innerHTML = snackFiberNum.toFixed(1).replace(/[.,]0$/, "");
    document.querySelector('.total-snack-sugar').innerHTML = snackSugarNum.toFixed(1).replace(/[.,]0$/, "");

    // total values
    var totalCalNum = breakfastCalNum + lunchCalNum + dinnerCalNum + snackCalNum;
    var totalFatNum = breakfastFatNum + lunchFatNum + dinnerFatNum + snackFatNum;
    var totalSatFatNum = breakfastSatFatNum + lunchSatFatNum + dinnerSatFatNum + snackSatFatNum;
    var totalCarbNum = breakfastCarbNum + lunchCarbNum + dinnerCarbNum + snackCarbNum;
    var totalProteinNum = breakfastProteinNum +  lunchProteinNum + snackProteinNum + dinnerProteinNum;
    var totalFiberNum = breakfastFiberNum + lunchFiberNum + dinnerFiberNum + snackFiberNum;
    var totalSugarNum = breakfastSugarNum + lunchSugarNum + dinnerSugarNum + snackSugarNum;

    // cal panel
    var calGoal = 2000;
    var calIntake = document.querySelector('.cal-intake').childNodes[0];
    var calRemaining = document.querySelector('.cal-remaining').childNodes[1];

    calIntake.nodeValue = totalCalNum.toFixed(1).replace(/[.,]0$/, "");
    calRemaining.nodeValue = calGoal - totalCalNum;
    var progress = document.querySelector('.cal-progress-done');
    progress.setAttribute('data-done', (100 / calGoal) * calIntake.nodeValue);
    setTimeout(() => {
        progress.style.opacity = 1;
        progress.style.width = Number(progress.getAttribute('data-done')) >= 100 ? 100 + '%' : progress.getAttribute('data-done') + '%';
    }, 100);

    // nutrition panel
    document.querySelector('.total-fat').childNodes[0].nodeValue = totalFatNum.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-sat-fat').childNodes[0].nodeValue = totalSatFatNum.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-carb').childNodes[0].nodeValue = totalCarbNum.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-protein').childNodes[0].nodeValue = totalProteinNum.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-fiber').childNodes[0].nodeValue = totalFiberNum.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-sugar').childNodes[0].nodeValue = totalSugarNum.toFixed(1).replace(/[.,]0$/, "") + 'g';
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
                    meal: `food.${this.parentNode.parentNode.parentNode.getAttribute('data-meal')}`,
                    item_id: this.parentNode.parentNode.getAttribute('data-id'),
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
var waterInput = document.querySelector('.water-input');
document.querySelector('.water-button').onclick = () => {
    overlay.style.display = 'block';
    addWaterContainer.style.display = 'block';
    overlay.onclick = () => closeOverlayAND(addWaterContainer); // close add water container if click outside
    waterInput.focus(); // place cursor inside input box
}

// send water to backend
function updateWater(value) {
    var waterInputValue = Number(waterInput.value);
    // subtract waterInputValue if user selects the minus button
    if (value == 'minus') { waterInputValue = - waterInputValue }
    var addedWaterInML = document.querySelector('input[name="measurement"]:checked').value == 'ml' ? waterInputValue : waterInputValue * 1000;

    if (waterInputValue) {
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
    var newTotalWater_ml = Number(totalWater.getAttribute('data-water-ml')) + addedWaterInML;
    totalWater.setAttribute('data-water-ml', newTotalWater_ml);
    totalWater.childNodes[2].nodeValue = newTotalWater_ml <= 999 ? newTotalWater_ml : newTotalWater_ml / 1000;
    totalWater.childNodes[3].innerText = newTotalWater_ml <= 999 ? 'ml' : 'L';
    closeOverlayAND(addWaterContainer);
} updateWater();

// submit water button onclick
var submitWaterButton = document.querySelectorAll('.submit-water-button');
for (i = 0; i < submitWaterButton.length; i++) {
    submitWaterButton[i].onclick = function() { updateWater(this.getAttribute('data-value')) }
}
waterInput.addEventListener('keydown', function(e) {
    if(e.keyCode == 13) { updateWater('add') }
    if(e.keyCode == 46) { updateWater('minus') }
    if(e.keyCode == 76) { document.querySelector('#l').checked = true }
    if(e.keyCode == 77) { document.querySelector('#ml').checked = true }
})



// Push selected food to database //
var foodSearchContainer = document.querySelector('.food-search-container'); // global food search container variable

// meal buttons - show overlay/food search & declare global meal variable
function meal(meal) {
    overlay.style.display = 'block';
    foodSearchContainer.style.display = 'block';
    MEAL = meal;
    overlay.onclick = () => closeOverlayAND(foodSearchContainer); // close food search container if click outside
    document.querySelector('.food-search-box').focus(); // place cursor inside input box
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
    let api_url = 'https://api.nutritionix.com/v1_1/search/'+searchTerms+'?results=0:20&fields=item_name,brand_name,nf_calories,nf_total_fat,nt_saturated_fat,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_weight_grams,nf_serving_size_qty,nf_serving_size_unit&appId=246713f5&appKey=6328f24ae2491f74e8af49fbbc09bc64';
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
                            var id = data.item_id;
                            var item_name = data.item_name;
                            var brand_name = data.brand_name;
                            var serving_qty = Math.round(data.nf_serving_size_qty * 10) / 10;
                            var serving_unit = data.nf_serving_size_unit;
                            var serving_weight = data.nf_serving_weight_grams;
                            var cal = Math.round(data.nf_calories);
                            var fat = Math.round(data.nf_total_fat * 10) / 10;
                            var sat_fat = Math.round(data.nf_saturated_fat * 10) / 10;
                            var carb =  Math.round(data.nf_total_carbohydrate * 10) / 10;
                            var protein = Math.round(data.nf_protein * 10) / 10;
                            var fiber = Math.round(data.nf_dietary_fiber * 10) / 10;
                            var sugar = Math.round(data.nf_sugars * 10) / 10;

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
                                        id: id,
                                        item_name: item_name,
                                        brand_name: brand_name,
                                        serving_qty: serving_qty,
                                        serving_unit: serving_unit,
                                        serving_weight: serving_weight,
                                        cal: cal,
                                        fat: fat,
                                        sat_fat: sat_fat,
                                        carb: carb,
                                        protein: protein,
                                        fiber: fiber,
                                        sugar: sugar
                                    },
                                    date: diaryDate
                                })
                            })

                            // update the data to the table without refreshing the page
                            // get desired ul
                            var currentList = document.querySelector(`[data-meal='${MEAL}']`);
                            
                            // insert a new li at the end of the ul
                            var li = document.createElement("li");
                            li.className = 'food-item flex'; li.setAttribute('id', id)
                            li.innerHTML = `<span class="item-name">${item_name} <i class="remove-food remove-button icon"></i></span>
                                            <span class="item-brand-name">${brand_name}, <span class="serving-size">${serving_qty} ${serving_unit}</span></span>
                                            <span class="${MEAL}-cal item-cal"><i class="cal-info icon"></i>${cal}</span>`;

                            // create a second li for hidden food values
                            var hiddenLi = document.createElement("li");
                            hiddenLi.className = 'food-item-hidden-values';
                            hiddenLi.innerHTML = `<span class="${MEAL}-fat">${fat}</span>
                                                  <span class="${MEAL}-sat-fat">${sat_fat}</span>
                                                  <span class="${MEAL}-carb">${carb}</span>
                                                  <span class="${MEAL}-protein">${protein}</span>
                                                  <span class="${MEAL}-fiber">${fiber}</span>
                                                  <span class="${MEAL}-sugar">${sugar}</span>`;
                            
                            // append new li's to desired ul
                            currentList.appendChild(li);
                            currentList.appendChild(hiddenLi);

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