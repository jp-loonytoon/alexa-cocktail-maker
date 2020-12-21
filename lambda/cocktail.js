/* 
    cocktails.js

	Uses the Cocktail DB API to access cocktail info.

	STEP 1 - Call the Cocktail DB API to get info about the cocktail
	STEP 2 - Return the relevant text to be included in the skill's response
*/

const axios = require('axios');
const config = require('./config.json');

const USER_AGENT = "cocktail-shaker/v1.0";
const RAPIDAPI_KEY = config.RAPIDAPI_KEY;

module.exports.speakCocktailInfo = speakCocktailInfo;
module.exports.USER_AGENT = USER_AGENT;


/**
 * @param {ingredients} a list of ingredients
 * @returns a string that spells out the ingredients
 */
function listOfIngredients(ingredients) {
	let list = "";

    for (let i in ingredients) {
        if (i < ingredients.length-1) {
            list += ingredients[i];
            list += ", ";
        } else {
            list += "and ";
            list += ingredients[i];
        }
    }
	list += ". ";

	return list;
}


/**
 * @param {drinkInfo} an element in the drinks list in the JSON response
 * @returns a list of ingredients for the cocktail
 */
function getIngredients(drinkInfo) {
    let ingredientList = [];
    let i = 1;

	let ingredientStr = "strIngredient" + i;
	let ingredient = drinkInfo[ingredientStr];

    while (ingredient !== null) {
        ingredientList.push(ingredient);
        i += 1;
		ingredientStr = "strIngredient" + i;
		ingredient = drinkInfo[ingredientStr];
	}

	return ingredientList;
}


/**
 * @param {name} the name of the cocktail you want to make
 * @returns a record containing info about the cocktail
 */
function getCocktailInfo(name) {
	return new Promise((resolve, reject) => {
		// the c record will store cocktail info
		const c = {
			name: name,
			id: 0,
			glass: "",
			ingredients: [],
			instructions: ""
		};

		const url = 'https://the-cocktail-db.p.rapidapi.com/search.php';

		// call the Cocktail DB API
		axios.get(url, {
			headers: {
				"x-rapidapi-key": RAPIDAPI_KEY,
				"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
				"accept": "application/json",
				"user-agent": USER_AGENT
			},
			params: { s: name }
		})
		.then(function(response) {
			if (response && response.status === 200 && response.data) {
				const drink = response.data.drinks[0];
				c.id = drink.idDrink;
				c.name = drink.strDrink;
				c.glass = drink.strGlass;
				c.ingredients = getIngredients(drink);
				c.instructions = drink.strInstructions;

				resolve(c);
			} else {
				console.log(`$$$$ ERROR = {response.data.error}`);
				reject(response.data.error);
			}
		})
		.catch(function(error) {
			if (error.response && error.response.status === 404) {
				console.log("No information available for that cocktail!!!");
				resolve(c);
			}
		});
	});
}


/**
 * @param {name} the name of the cocktail
 * @returns a string containing the text to speak
 */
function speakCocktailInfo(name) {
	return new Promise((resolve, reject) => {
		let spokenResponse = "";

		getCocktailInfo(name)
			.then((cocktailInfo) => {
				if (cocktailInfo.id > 0) {
					spokenResponse = `OK, you need: `;
					spokenResponse += listOfIngredients(cocktailInfo.ingredients);
					spokenResponse += cocktailInfo.instructions;
				} else {
					spokenResponse = `Sorry, I don't know how to make a ${cocktailInfo.name}`;
				}

				resolve(spokenResponse);
			})
			.catch((error) => {
				spokenResponse = `Sorry, there was a problem getting info for ${name}`;
				reject(spokenResponse);
			});
	});
}
