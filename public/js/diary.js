fetch('/my-diary').then(response => response.json())
    .then(data => {
        console.log(data)
    })

async function api(searchTerms) {
    // const searchTerms = document.querySelector('.food-search-box').value;
    let api_url = 'https://api.nutritionix.com/v1_1/search/'+searchTerms+'?results=0:05&fields=item_name,brand_name,nf_calories,nf_total_fat,nt_saturated_fat,nf_total_carbohydrate,nf_dietary_fiber,nf_sugars,nf_protein,nf_serving_weight_grams,nf_serving_size_qty,nf_serving_size_unit&appId=246713f5&appKey=6328f24ae2491f74e8af49fbbc09bc64'
    // console.log(searchTerms)
    // console.log(api_url)
    fetch(api_url).then(response => response.json())
        .then(data => {
            // hide search results container when text box is empty
            if (searchTerms == undefined || searchTerms == '') {
                document.querySelector('.search-results-container').style.display = 'none'
            } else {
                document.querySelector('.search-results-container').style.display = ''
            }

            // clear search results container everytime the url gets updated
            var searchResultsContainer = document.querySelector('.search-results-container');
            searchResultsContainer.innerHTML = ''

            // loop through each hit
            for (var i = 0; i < data.hits.length; i++) {
                // variables for each field & id
                // var itemID = data.hits[i]._id;
                var itemName = data.hits[i].fields.item_name
                var brandName = data.hits[i].fields.brand_name
                var servingSize = data.hits[i].fields.nf_serving_size_qty
                var servingUnit = data.hits[i].fields.nf_serving_size_unit
                var roundedSRcal = Math.round(data.hits[i].fields.nf_calories)

                // create item for each hit
                var searchResultItem = document.createElement('div');
                searchResultItem.className = 'search-result-item';

                // create id div for each item
                var searchResultID = document.createElement('div');
                searchResultID.className = 'search-result-item-id';
                searchResultID.innerHTML = data.hits[i]._id;
                searchResultID.style.display = 'none';

                // create name div for each item
                var searchResultName = document.createElement('div');
                searchResultName.className = 'search-result-item-name';
                searchResultName.innerHTML = itemName;

                // create sub info div for each item
                var searchResultSubInfo = document.createElement('div');
                searchResultSubInfo.className = 'search-result-item-sub-info';
                searchResultSubInfo.innerHTML = `${brandName}, ${servingSize} ${servingUnit}`
                
                // create container div to display callories for each item
                var searchResultCalContainer = document.createElement('div');
                searchResultCalContainer.className = 'search-result-item-cal-container';

                var searchResultCal = document.createElement('div');
                searchResultCal.className = 'search-result-item-cal';
                searchResultCal.innerHTML = roundedSRcal;

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


                // define overlay variables for showing/hiding food search
                var overlay = document.querySelector('.overlay');
                var foodSearchContainer = document.querySelector('.food-search-container');

                // ==================================================
                // ==================================================
                // ==================================================
                // Add foods to their slots

                // button variables
                var breakfastButton = document.querySelector('.breakfast-button');
                var lunchButton = document.querySelector('.lunch-button');
                var dinnerButton = document.querySelector('.dinner-button');
                var snackButton = document.querySelector('.snack-button');

                // breakfast button - show overlay/food search & create/append active div
                breakfastButton.onclick = function() {
                    overlay.style.display = 'block';
                    foodSearchContainer.style.display = 'block';

                    var breakfastActiveDiv = document.createElement('div');
                    breakfastActiveDiv.className = 'breakfast-active food-active';
                    breakfastButton.appendChild(breakfastActiveDiv);
                    var breakfastActive = document.querySelector('.breakfast-active'); // js doesn't seem to like this?
                    console.log(breakfastActive ? 'breakfast on da block' : 'breakfast? never heard of it mate');
                }

                // lunch button - show overlay/food search & create/append active div
                lunchButton.onclick = function() {
                    overlay.style.display = 'block';
                    foodSearchContainer.style.display = 'block';

                    var lunchActiveDiv = document.createElement('div');
                    lunchActiveDiv.className = 'lunch-active food-active';
                    lunchButton.appendChild(lunchActiveDiv);
                    console.log(document.querySelector('.lunch-active') ? 'lunch on da block' : 'lunch? never heard of it mate');
                }

                // dinner button - show overlay/food search & create/append active div
                dinnerButton.onclick = function() {
                    overlay.style.display = 'block';
                    foodSearchContainer.style.display = 'block';

                    var dinnerActiveDiv = document.createElement('div');
                    dinnerActiveDiv.className = 'dinner-active food-active';
                    dinnerButton.appendChild(dinnerActiveDiv);
                    console.log(document.querySelector('.dinner-active') ? 'dinner on da block' : 'dinner? never heard of it mate');
                }

                // snack button - show overlay/food search & create/append active div
                snackButton.onclick = function() {
                    overlay.style.display = 'block';
                    foodSearchContainer.style.display = 'block';

                    var snackActiveDiv = document.createElement('div');
                    snackActiveDiv.className = 'snack-active food-active';
                    snackButton.appendChild(snackActiveDiv);
                    console.log(document.querySelector('.snack-active') ? 'snack on da block' : 'snack? never heard of it mate');
                }

                searchResultItem.onclick = async function(e) {
                    var selectedItemID = e.currentTarget.querySelector('.search-result-item-id').innerHTML
                    var selectedItemURL = 'https://api.nutritionix.com/v1_1/item?id='+selectedItemID+'&appId=246713f5&appKey=6328f24ae2491f74e8af49fbbc09bc64'

                    // var bodyData;

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
                            var food_info = {
                                id: food_id,
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
                                fibre: food_fibre,
                                sugar: food_sugar
                            }

                            var bodyData = document.querySelector('.breakfast-active') ? JSON.stringify({ breakfast: {[food_name]: food_info} })
                                         : document.querySelector('.lunch-active') ? JSON.stringify({ lunch: {[food_name]: food_info} })
                                         : document.querySelector('.dinner-active') ? JSON.stringify({ dinner: {[food_name]: food_info} })
                                         : JSON.stringify({ snack: {[food_name]: food_info} })

                            console.log(bodyData)
                            fetch('/my-diary', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: bodyData
                            })

                            // get desired row
                            var currentRow = document.querySelector('.breakfast-active') ? document.querySelector('.food-diary').getElementsByTagName('tbody')[0]
                                           : document.querySelector('.lunch-active') ? document.querySelector('.food-diary').getElementsByTagName('tbody')[1]
                                           : document.querySelector('.dinner-active') ? document.querySelector('.food-diary').getElementsByTagName('tbody')[2]
                                           : document.querySelector('.food-diary').getElementsByTagName('tbody')[3];
                            
                            // insert a row at the end of table (desired row)
                            var newRow = currentRow.insertRow();

                            // insert a cell at the end of the row & append a text node to the cell
                            var nameC = newRow.insertCell();
                            var nameCon = document.createElement('div'); nameCon.style.textAlign = 'left';
                            var nameT = document.createTextNode(food_name);
                            nameCon.appendChild(nameT); nameC.appendChild(nameCon);

                            
                            var servingC = newRow.insertCell();
                            var servingT = document.createTextNode(food_serving_qty + ', ' + food_serving_unit);
                            servingC.appendChild(servingT);

                            var today = new Date();
                            var currentTime = today.getHours() + ':' + today.getMinutes();
                            var timeC = newRow.insertCell();
                            // var timeI = document.createElement('INPUT');
                            // timeI.setAttribute('type', 'text');
                            // timeI.setAttribute('value', currentTime);
                            // timeI.id = 'time';
                            var timeT = document.createTextNode(currentTime)
                            timeC.appendChild(timeT);

                            // time picker
                            // var timepicker = new TimePicker('time', {
                            //     lang: 'en',
                            //     theme: 'dark'
                            // });
                            // timepicker.on('change', function(evt) {
                            //     var value = (evt.hour || '00') + ':' + (evt.minute || '00');
                            //     evt.element.value = value;
                            // });


                            var tableNutritionData = document.createElement('div')
                            tableNutritionData.className = 'table-nutrition-data'
                            var gramSymbol = document.createElement('div');
                            gramSymbol.className = 'gram-symbol';
                            gramSymbol.innerHTML = 'g';

                            var calC = newRow.insertCell();
                            calC.className = document.querySelector('.breakfast-active') ? 'breakfast-cal-c'
                                           : document.querySelector('.lunch-active') ? 'lunch-cal-c'
                                           : document.querySelector('.dinner-active') ? 'dinner-cal-c'
                                           : 'snack-cal-c';
                            var calT = document.createTextNode(Math.round(food_cal));
                            calC.appendChild(calT);

                            var fatC = newRow.insertCell();
                            fatC.className = document.querySelector('.breakfast-active') ? 'breakfast-fat-c'
                                           : document.querySelector('.lunch-active') ? 'lunch-fat-c'
                                           : document.querySelector('.dinner-active') ? 'dinner-fat-c'
                                           : 'snack-fat-c';
                            var fatT = document.createTextNode(food_fat);
                            fatC.appendChild(fatT);

                            var satFatC = newRow.insertCell();
                            satFatC.className = document.querySelector('.breakfast-active') ? 'breakfast-sat-fat-c'
                                              : document.querySelector('.lunch-active') ? 'lunch-sat-fat-c'
                                              : document.querySelector('.dinner-active') ? 'dinner-sat-fat-c'
                                              : 'snack-sat-fat-c';
                            var satFatT = document.createTextNode(food_sat_fat);
                            satFatC.appendChild(satFatT);

                            var carbC = newRow.insertCell();
                            carbC.className = document.querySelector('.breakfast-active') ? 'breakfast-carb-c'
                                            : document.querySelector('.lunch-active') ? 'lunch-carb-c'
                                            : document.querySelector('.dinner-active') ? 'dinner-carb-c'
                                            : 'snack-carb-c';
                            var carbT = document.createTextNode(food_carb);
                            carbC.appendChild(carbT);

                            var proteinC = newRow.insertCell();
                            proteinC.className = document.querySelector('.breakfast-active') ? 'breakfast-protein-c'
                                               : document.querySelector('.lunch-active') ? 'lunch-protein-c'
                                               : document.querySelector('.dinner-active') ? 'dinner-protein-c'
                                               : 'snack-protein-c';
                            var proteinT = document.createTextNode(food_protein);
                            proteinC.appendChild(proteinT);

                            var fibreC = newRow.insertCell();
                            fibreC.className = document.querySelector('.breakfast-active') ? 'breakfast-fibre-c'
                                             : document.querySelector('.lunch-active') ? 'lunch-fibre-c'
                                             : document.querySelector('.dinner-active') ? 'dinner-fibre-c'
                                             : 'snack-fibre-c';
                            var fibreT = document.createTextNode(food_fibre);
                            fibreC.appendChild(fibreT);



                            // close search after selecting food item & remove active div
                            overlay.style.display = 'none';
                            foodSearchContainer.style.display = 'none';
                            document.querySelector('.food-active').remove();
                            console.log(document.querySelector('.breakfast-active') ? 'on da block' : 'never heard of it mate');

                            // total breakfast values
                            var breakfastCal = document.querySelectorAll('.breakfast-cal-c');
                            var breakfastFat = document.querySelectorAll('.breakfast-fat-c');
                            var breakfastSatFat = document.querySelectorAll('.breakfast-sat-fat-c');
                            var breakfastCarb = document.querySelectorAll('.breakfast-carb-c');
                            var breakfastProtein = document.querySelectorAll('.breakfast-protein-c');
                            var breakfastFibre = document.querySelectorAll('.breakfast-fibre-c');

                            var breakfastCalNum = 0; var breakfastFatNum = 0; var breakfastSatFatNum = 0
                            var breakfastCarbNum = 0; var breakfastProteinNum = 0; var breakfastFibreNum = 0;

                            for (var i = 0; i < breakfastCal.length; i++) {
                                breakfastCalNum += Number(breakfastCal[i].innerHTML);
                                breakfastFatNum += Number(breakfastFat[i].innerHTML);
                                breakfastSatFatNum += Number(breakfastSatFat[i].innerHTML);
                                breakfastCarbNum += Number(breakfastCarb[i].innerHTML);
                                breakfastProteinNum += Number(breakfastProtein[i].innerHTML);
                                breakfastFibreNum += Number(breakfastFibre[i].innerHTML);
                            }

                            document.querySelector('.breakfast-cal').innerHTML = breakfastCalNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.breakfast-fat').innerHTML = breakfastFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.breakfast-sat-fat').innerHTML = breakfastSatFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.breakfast-carb').innerHTML = breakfastCarbNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.breakfast-protein').innerHTML = breakfastProteinNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.breakfast-fibre').innerHTML = breakfastFibreNum.toFixed(1).replace(/[.,]0$/, "")

                            // total lunch values
                            var lunchCal = document.querySelectorAll('.lunch-cal-c');
                            var lunchFat = document.querySelectorAll('.lunch-fat-c');
                            var lunchSatFat = document.querySelectorAll('.lunch-sat-fat-c');
                            var lunchCarb = document.querySelectorAll('.lunch-carb-c');
                            var lunchProtein = document.querySelectorAll('.lunch-protein-c');
                            var lunchFibre = document.querySelectorAll('.lunch-fibre-c');

                            var lunchCalNum = 0; var lunchFatNum = 0; var lunchSatFatNum = 0
                            var lunchCarbNum = 0; var lunchProteinNum = 0; var lunchFibreNum = 0;

                            for (var i = 0; i < lunchCal.length; i++) {
                                lunchCalNum += Number(lunchCal[i].innerHTML);
                                lunchFatNum += Number(lunchFat[i].innerHTML);
                                lunchSatFatNum += Number(lunchSatFat[i].innerHTML);
                                lunchCarbNum += Number(lunchCarb[i].innerHTML);
                                lunchProteinNum += Number(lunchProtein[i].innerHTML);
                                lunchFibreNum += Number(lunchFibre[i].innerHTML);
                            }

                            document.querySelector('.lunch-cal').innerHTML = lunchCalNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.lunch-fat').innerHTML = lunchFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.lunch-sat-fat').innerHTML = lunchSatFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.lunch-carb').innerHTML = lunchCarbNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.lunch-protein').innerHTML = lunchProteinNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.lunch-fibre').innerHTML = lunchFibreNum.toFixed(1).replace(/[.,]0$/, "")

                            // total dinner values
                            var dinnerCal = document.querySelectorAll('.dinner-cal-c');
                            var dinnerFat = document.querySelectorAll('.dinner-fat-c');
                            var dinnerSatFat = document.querySelectorAll('.dinner-sat-fat-c');
                            var dinnerCarb = document.querySelectorAll('.dinner-carb-c');
                            var dinnerProtein = document.querySelectorAll('.dinner-protein-c');
                            var dinnerFibre = document.querySelectorAll('.dinner-fibre-c');

                            var dinnerCalNum = 0; var dinnerFatNum = 0; var dinnerSatFatNum = 0
                            var dinnerCarbNum = 0; var dinnerProteinNum = 0; var dinnerFibreNum = 0;

                            for (var i = 0; i < dinnerCal.length; i++) {
                                dinnerCalNum += Number(dinnerCal[i].innerHTML);
                                dinnerFatNum += Number(dinnerFat[i].innerHTML);
                                dinnerSatFatNum += Number(dinnerSatFat[i].innerHTML);
                                dinnerCarbNum += Number(dinnerCarb[i].innerHTML);
                                dinnerProteinNum += Number(dinnerProtein[i].innerHTML);
                                dinnerFibreNum += Number(dinnerFibre[i].innerHTML);
                            }

                            document.querySelector('.dinner-cal').innerHTML = dinnerCalNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.dinner-fat').innerHTML = dinnerFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.dinner-sat-fat').innerHTML = dinnerSatFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.dinner-carb').innerHTML = dinnerCarbNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.dinner-protein').innerHTML = dinnerProteinNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.dinner-fibre').innerHTML = dinnerFibreNum.toFixed(1).replace(/[.,]0$/, "")

                            // total snack values
                            var snackCal = document.querySelectorAll('.snack-cal-c');
                            var snackFat = document.querySelectorAll('.snack-fat-c');
                            var snackSatFat = document.querySelectorAll('.snack-sat-fat-c');
                            var snackCarb = document.querySelectorAll('.snack-carb-c');
                            var snackProtein = document.querySelectorAll('.snack-protein-c');
                            var snackFibre = document.querySelectorAll('.snack-fibre-c');

                            var snackCalNum = 0; var snackFatNum = 0; var snackSatFatNum = 0
                            var snackCarbNum = 0; var snackProteinNum = 0; var snackFibreNum = 0;

                            for (var i = 0; i < snackCal.length; i++) {
                                snackCalNum += Number(snackCal[i].innerHTML);
                                snackFatNum += Number(snackFat[i].innerHTML);
                                snackSatFatNum += Number(snackSatFat[i].innerHTML);
                                snackCarbNum += Number(snackCarb[i].innerHTML);
                                snackProteinNum += Number(snackProtein[i].innerHTML);
                                snackFibreNum += Number(snackFibre[i].innerHTML);
                            }

                            document.querySelector('.snack-cal').innerHTML = snackCalNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.snack-fat').innerHTML = snackFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.snack-sat-fat').innerHTML = snackSatFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.snack-carb').innerHTML = snackCarbNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.snack-protein').innerHTML = snackProteinNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.snack-fibre').innerHTML = snackFibreNum.toFixed(1).replace(/[.,]0$/, "")

                            // total total values
                            var totalCalNum = breakfastCalNum + lunchCalNum + dinnerCalNum + snackCalNum
                            var totalFatNum = breakfastFatNum + lunchFatNum + dinnerFatNum + snackFatNum
                            var totalSatFatNum = breakfastSatFatNum + lunchSatFatNum + dinnerSatFatNum + snackSatFatNum
                            var totalCarbNum = breakfastCarbNum + lunchCarbNum + dinnerCarbNum + snackCarbNum
                            var totalProteinNum = breakfastProteinNum +  lunchProteinNum + snackProteinNum + snackProteinNum
                            var totalFibreNum = breakfastFibreNum + lunchFibreNum + dinnerFibreNum + snackFibreNum

                            document.querySelector('.total-cal').innerHTML = totalCalNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.total-fat').innerHTML = totalFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.total-sat-fat').innerHTML = totalSatFatNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.total-carb').innerHTML = totalCarbNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.total-protein').innerHTML = totalProteinNum.toFixed(1).replace(/[.,]0$/, "")
                            document.querySelector('.total-fibre').innerHTML = totalFibreNum.toFixed(1).replace(/[.,]0$/, "")
                        })
                }
            }

            // close food search container if click outside & remove active div
                overlay.onclick = function(e) {
                    overlay.style.display = 'none';
                    foodSearchContainer.style.display = 'none';
                    document.querySelector('.food-active').remove();
                }

        });
}
api();