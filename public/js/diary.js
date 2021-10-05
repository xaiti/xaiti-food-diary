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
    var breakfastItem = document.querySelectorAll('.breakfast-item');
    var totalBreakfastCal = 0; var totalBreakfastFat = 0; var totalBreakfastSatFat = 0;
    var totalBreakfastCarb = 0; var totalBreakfastProtein = 0; var totalBreakfastFiber = 0; var totalBreakfastSugar = 0;
    for (i = 0; i < breakfastItem.length; i++) {
        var breakfastItemData = JSON.parse(breakfastItem[i].dataset.nutrients);
        totalBreakfastCal += Number(breakfastItemData.cal); // some default nutritionix values aren't numbers
        totalBreakfastFat += Number(breakfastItemData.fat); totalBreakfastSatFat += Number(breakfastItemData.sat_fat);
        totalBreakfastCarb += Number(breakfastItemData.carb); totalBreakfastProtein += Number(breakfastItemData.protein);
        totalBreakfastFiber += Number(breakfastItemData.fiber); totalBreakfastSugar += Number(breakfastItemData.sugar);
    }
    var totalBreakfastNutrients = {
        "cal" : totalBreakfastCal,
        "fat" : totalBreakfastFat,
        "sat_fat" : totalBreakfastSatFat,
        "carb" : totalBreakfastCarb,
        "fiber" : totalBreakfastProtein,
        "protein" : totalBreakfastFiber,
        "sugar" : totalBreakfastSugar
    }
    var breakfastHeader = document.querySelector('.breakfast-header');
    breakfastHeader.setAttribute('data-total_nutrients', JSON.stringify(totalBreakfastNutrients));
    document.querySelector('.total-breakfast-cal').childNodes[1].nodeValue = Math.round(totalBreakfastCal);

    // total lunch values
    var lunchItem = document.querySelectorAll('.lunch-item');
    var totalLunchCal = 0; var totalLunchFat = 0; var totalLunchSatFat = 0;
    var totalLunchCarb = 0; var totalLunchProtein = 0; var totalLunchFiber = 0; var totalLunchSugar = 0;
    for (i = 0; i < lunchItem.length; i++) {
        var lunchItemData = JSON.parse(lunchItem[i].dataset.nutrients);
        totalLunchCal += Number(lunchItemData.cal); // some default nutritionix values aren't numbers
        totalLunchFat += Number(lunchItemData.fat); totalLunchSatFat += Number(lunchItemData.sat_fat);
        totalLunchCarb += Number(lunchItemData.carb); totalLunchProtein += Number(lunchItemData.protein);
        totalLunchFiber += Number(lunchItemData.fiber); totalLunchSugar += Number(lunchItemData.sugar);
    }
    var totalLunchNutrients = {
        "cal" : totalLunchCal,
        "fat" : totalLunchFat,
        "sat_fat" : totalLunchSatFat,
        "carb" : totalLunchCarb,
        "fiber" : totalLunchProtein,
        "protein" : totalLunchFiber,
        "sugar" : totalLunchSugar
    }
    var lunchHeader = document.querySelector('.lunch-header');
    lunchHeader.setAttribute('data-total_nutrients', JSON.stringify(totalLunchNutrients));
    document.querySelector('.total-lunch-cal').childNodes[1].nodeValue = Math.round(totalLunchCal);

    // total dinner values
    var dinnerItem = document.querySelectorAll('.dinner-item');
    var totalDinnerCal = 0; var totalDinnerFat = 0; var totalDinnerSatFat = 0;
    var totalDinnerCarb = 0; var totalDinnerProtein = 0; var totalDinnerFiber = 0; var totalDinnerSugar = 0;
    for (i = 0; i < dinnerItem.length; i++) {
        var dinnerItemData = JSON.parse(dinnerItem[i].dataset.nutrients);
        totalDinnerCal += Number(dinnerItemData.cal); // some default nutritionix values aren't numbers
        totalDinnerFat += Number(dinnerItemData.fat); totalDinnerSatFat += Number(dinnerItemData.sat_fat);
        totalDinnerCarb += Number(dinnerItemData.carb); totalDinnerProtein += Number(dinnerItemData.protein);
        totalDinnerFiber += Number(dinnerItemData.fiber); totalDinnerSugar += Number(dinnerItemData.sugar);
    }
    var totalDinnerNutrients = {
        "cal" : totalDinnerCal,
        "fat" : totalDinnerFat,
        "sat_fat" : totalDinnerSatFat,
        "carb" : totalDinnerCarb,
        "fiber" : totalDinnerProtein,
        "protein" : totalDinnerFiber,
        "sugar" : totalDinnerSugar
    }
    var dinnerHeader = document.querySelector('.dinner-header');
    dinnerHeader.setAttribute('data-total_nutrients', JSON.stringify(totalDinnerNutrients));
    document.querySelector('.total-dinner-cal').childNodes[1].nodeValue = Math.round(totalDinnerCal);

    // total snack values
    var snackItem = document.querySelectorAll('.snack-item');
    var totalSnackCal = 0; var totalSnackFat = 0; var totalSnackSatFat = 0;
    var totalSnackCarb = 0; var totalSnackProtein = 0; var totalSnackFiber = 0; var totalSnackSugar = 0;
    for (i = 0; i < snackItem.length; i++) {
        var snackItemData = JSON.parse(snackItem[i].dataset.nutrients);
        totalSnackCal += Number(snackItemData.cal); // some default nutritionix values aren't numbers
        totalSnackFat += Number(snackItemData.fat); totalSnackSatFat += Number(snackItemData.sat_fat);
        totalSnackCarb += Number(snackItemData.carb); totalSnackProtein += Number(snackItemData.protein);
        totalSnackFiber += Number(snackItemData.fiber); totalSnackSugar += Number(snackItemData.sugar);
    }
    var totalSnackNutrients = {
        "cal" : totalSnackCal,
        "fat" : totalSnackFat,
        "sat_fat" : totalSnackSatFat,
        "carb" : totalSnackCarb,
        "fiber" : totalSnackProtein,
        "protein" : totalSnackFiber,
        "sugar" : totalSnackSugar
    }
    var snackHeader = document.querySelector('.snack-header');
    snackHeader.setAttribute('data-total_nutrients', JSON.stringify(totalSnackNutrients));
    document.querySelector('.total-snack-cal').childNodes[1].nodeValue = Math.round(totalSnackCal);

    // total food values
    var totalCal = totalBreakfastCal + totalLunchCal + totalDinnerCal + totalSnackCal;
    var totalFat = totalBreakfastFat + totalLunchFat + totalDinnerFat + totalSnackFat;
    var totalSatFat = totalBreakfastSatFat + totalLunchSatFat + totalDinnerSatFat + totalSnackSatFat;
    var totalCarb = totalBreakfastCarb + totalLunchCarb + totalDinnerCarb + totalSnackCarb;
    var totalProtein = totalBreakfastProtein +  totalLunchProtein + totalSnackProtein + totalDinnerProtein;
    var totalFiber = totalBreakfastFiber + totalLunchFiber + totalDinnerFiber + totalSnackFiber;
    var totalSugar = totalBreakfastSugar + totalLunchSugar + totalDinnerSugar + totalSnackSugar;

    // cal panel
    var calGoal = document.querySelector('#cal-goal').value;
    var calIntake = document.querySelector('.cal-intake').childNodes[0];
    var calRemaining = document.querySelector('.cal-remaining').childNodes[1];

    calIntake.nodeValue = totalCal.toFixed(1).replace(/[.,]0$/, "");
    calRemaining.nodeValue = (calGoal - totalCal).toFixed(1).replace(/[.,]0$/, "");
    var progress = document.querySelector('.cal-progress-done');
    progress.setAttribute('data-done', (100 / calGoal) * calIntake.nodeValue);
    var doneP = Number(progress.getAttribute('data-done'));
    setTimeout(() => {
        progress.style.opacity = 1;
        progress.style.width = doneP >= 100 ? 100 + '%' : progress.getAttribute('data-done') + '%';
        progress.style.background = doneP > 125 ? 'var(--button-color-dark)'
            : doneP > 110 ? 'var(--button-color)'
            : doneP >= 100 ? 'skyblue'
            : 'var(--nutritionix-color)';
    }, 100);
    // if (Number(progress.getAttribute('data-done')) > 100) {
    //     progress.style.background = 'red';
    // }

    // nutrition panel
    document.querySelector('.total-fat').childNodes[0].nodeValue = totalFat.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-sat-fat').childNodes[0].nodeValue = totalSatFat.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-carb').childNodes[0].nodeValue = totalCarb.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-protein').childNodes[0].nodeValue = totalProtein.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-fiber').childNodes[0].nodeValue = totalFiber.toFixed(1).replace(/[.,]0$/, "") + 'g';
    document.querySelector('.total-sugar').childNodes[0].nodeValue = totalSugar.toFixed(1).replace(/[.,]0$/, "") + 'g';
} totalFoodValues();



// Serving qty //
function servingQty() {
    var qty = document.querySelectorAll('.serving-qty');
    for (i = 0; i < qty.length; i++) {
        qty[i].onchange = function() {
            // get desired parent node
            var topParent = this.parentNode.parentNode.parentNode.parentNode;

            // get and parse the given_nutrients dataset
            var gn = JSON.parse(topParent.dataset.given_nutrients);

            // make an object for the updated nutrients
            var updatedNutrients = {
                "serving_qty" : this.value,
                "cal" : this.value * gn.cal / gn.serving_qty,
                "fat" : this.value * gn.fat / gn.serving_qty,
                "sat_fat" : this.value * gn.sat_fat / gn.serving_qty,
                "carb" : this.value * gn.carb / gn.serving_qty,
                "fiber" : this.value * gn.fiber / gn.serving_qty,
                "protein" : this.value * gn.protein / gn.serving_qty,
                "sugar" : this.value * gn.sugar / gn.serving_qty
            }

            // update the nutrients dataset
            topParent.setAttribute('data-nutrients', JSON.stringify(updatedNutrients));

            // send the new nutrients to the backend
            fetch('/update-nutrients', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    meal: topParent.parentNode.dataset.meal,
                    item_id: topParent.dataset.id,
                    nutrients: updatedNutrients,
                    date: diaryDate
                })
            });

            // update food values without page refresh
            topParent.childNodes[3].childNodes[1].nodeValue = Math.round(updatedNutrients.cal);
            totalFoodValues();
        }
    }
} servingQty();



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
                    meal: `food.${this.parentNode.parentNode.parentNode.parentNode.dataset.meal}`,
                    item_id: this.parentNode.parentNode.parentNode.dataset.id,
                    date: diaryDate
                })
            });
            // remove food item from dom
            this.parentNode.parentNode.parentNode.remove();
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



// Calorie goal //
var settingsContainer = document.querySelector('.settings-container');
document.querySelector('.settings-button').onclick = () => {
    overlay.style.display = 'block';
    settingsContainer.style.display = 'flex';
    document.querySelector('#cal-goal').focus();
    overlay.onclick = () => closeOverlayAND(settingsContainer);
}

document.querySelector('#cal-goal').onchange = function() {
    fetch('/cal-goal', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            calGoal: this.value
        })
    });
    totalFoodValues();
    closeOverlayAND(settingsContainer);
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
});



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

// get all the food data
async function api(searchTerms) {
    // fetch request with search terms to the backend and recieve the data from the api
    fetch('/nutritionix-api', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: searchTerms
        })
    }).then(response => response.json())
        .then(data => {
            // hide search results container when text box is empty
            var searchResultsContainer = document.querySelector('.search-results-container');
            if (searchTerms == undefined || searchTerms == '') {
                searchResultsContainer.style.display = '';
            } else {
                searchResultsContainer.style.display = 'block';
            }
            // clear search results container everytime the textbox gets updated            
            searchResultsContainer.innerHTML = '';

            // loop through each hit
            for (i = 0; i < data.hits.length; i++) {
                // variables for each field & id
                var fields = {
                    id: data.hits[i]._id,
                    item_name: data.hits[i].fields.item_name,
                    brand_name: data.hits[i].fields.brand_name,
                    serving_qty: data.hits[i].fields.nf_serving_size_qty,
                    serving_unit: data.hits[i].fields.nf_serving_size_unit,
                    serving_weight: data.hits[i].fields.nf_serving_weight_grams,
                    cal: Math.round(data.hits[i].fields.nf_calories),
                    fat: Math.round(data.hits[i].fields.nf_total_fat * 10) / 10,
                    sat_fat: Math.round(data.hits[i].fields.nf_saturated_fat * 10) / 10,
                    carb:  Math.round(data.hits[i].fields.nf_total_carbohydrate * 10) / 10,
                    protein: Math.round(data.hits[i].fields.nf_protein * 10) / 10,
                    fiber: Math.round(data.hits[i].fields.nf_dietary_fiber * 10) / 10,
                    sugar: Math.round(data.hits[i].fields.nf_sugars * 10) / 10
                }
                
                // create div for each search result & give it attributes for each hits data
                var searchResultItem = document.createElement('div');
                searchResultItem.className = 'search-result-item';
                for (var key in fields) {
                    if (fields.hasOwnProperty(key)) {
                        // console.log(key + " -> " + fields[key]);
                        searchResultItem.setAttribute(`data-${key}`, fields[key]);
                        searchResultItem.setAttribute(`data-fields`, {
                            key: fields[key]
                        });
                    }
                }

                // format search result items
                searchResultItem.innerHTML = `
                    <div>
                        <div class="search-result-item-name">${fields.item_name}</div>
                        <div class="search-result-item-sub-info">${fields.brand_name}, ${fields.serving_qty} ${fields.serving_unit}</div>
                    </div>
                    <div class="search-result-item-cal-container">
                        <div class="search-result-item-cal">${fields.cal}</div>
                        <div class="search-result-item-cal-text">cal</div>
                    </div>
                `;
                // append search result items to it's container
                searchResultsContainer.appendChild(searchResultItem);

                // search result item on click
                searchResultItem.onclick = async function(e) {
                    var nutrients = {
                        serving_qty: e.currentTarget.dataset.serving_qty,
                        cal: e.currentTarget.dataset.cal,
                        fat: e.currentTarget.dataset.fat,
                        sat_fat: e.currentTarget.dataset.sat_fat,
                        carb: e.currentTarget.dataset.carb,
                        protein: e.currentTarget.dataset.protein,
                        fiber: e.currentTarget.dataset.fiber,
                        sugar: e.currentTarget.dataset.sugar
                    };

                    // send food data to backend
                    fetch('/add-food', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            meal: `food.${MEAL}`,
                            food_id: e.currentTarget.dataset.id,
                            food_item: {
                                id: e.currentTarget.dataset.id,
                                item_name: e.currentTarget.dataset.item_name,
                                brand_name: e.currentTarget.dataset.brand_name,
                                serving_qty: e.currentTarget.dataset.serving_qty,
                                serving_unit: e.currentTarget.dataset.serving_unit,
                                serving_weight: e.currentTarget.dataset.serving_weight,
                                nutrients: nutrients,
                                given_nutrients: nutrients
                            },
                            date: diaryDate
                        })
                    });

                    // update the data to the table without refreshing the page
                    // get desired ul
                    var currentList = document.querySelector(`[data-meal='${MEAL}']`);
                    
                    // insert a new li at the end of the ul
                    var li = document.createElement('li');
                    li.className = `food-item ${MEAL}-item flex`; li.setAttribute('data-id', e.currentTarget.dataset.id);
                    li.setAttribute('data-nutrients', JSON.stringify(nutrients)); li.setAttribute('data-given_nutrients', JSON.stringify(nutrients));
                    li.innerHTML = `
                        <div>
                            <div class="item-name">${e.currentTarget.dataset.item_name}<i class="remove-food remove-button icon"></i></div>
                            <span class="item-brand-name">${e.currentTarget.dataset.brand_name}, <span class="serving"><input type="text" class="serving-qty" value="${e.currentTarget.dataset.serving_qty}"> ${e.currentTarget.dataset.serving_unit}</span></span>
                        </div>
                        <div class="${MEAL}-cal item-cal flex"><i class="cal-info icon"></i>${e.currentTarget.dataset.cal}</div>
                    `;
                    
                    // append new li to desired ul
                    currentList.appendChild(li);

                    // close search after selecting food item
                    closeOverlayAND(foodSearchContainer);

                    // Update total food values
                    totalFoodValues();

                    // Update remove food item buttons
                    removeFoodItem();

                    // Upate serving_qty without refresh
                    servingQty();
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
                serving_unit: '7"',
                serving_weight: 118,
                nutrients: {
                    serving_qty: 1,
                    cal: 105,
                    fat: 0.4,
                    sat_fat: 0.1,
                    carb: 27,
                    protein: 1.3,
                    fiber: 3.1,
                    sugar: 14.4
                },
                given_nutrients: {
                    serving_qty: 1,
                    cal: 105,
                    fat: 0.4,
                    sat_fat: 0.1,
                    carb: 27,
                    protein: 1.3,
                    fiber: 3.1,
                    sugar: 14.4
                }
            },
            date: diaryDate
        })
    });
    reload();
});