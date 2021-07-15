const BASE_URL = "https://www.themealdb.com/api/json/v1/1/random.php"
var button = document.querySelector("button");
var title = document.querySelector("h1");
var recipe = document.querySelector("p");
var country = document.querySelector("h3");
var category = document.querySelector(".category");
var ingredientsList = document.querySelector("ul#Ingredients");
var thumbnail = document.querySelector("img");

button.onclick = function () {    
    fetch(BASE_URL).then (response => {
        return response.json();
    }).then(response => {
        var meal = response.meals[0];
        title.textContent = meal.strMeal;
        recipe.textContent = meal.strInstructions;
        country.textContent = meal.strArea;
        category.textContent = meal.strCategory;
        thumbnail.src = meal.strMealThumb;

        var ingredients = [];
        for (var i=0; i<20; i++) {
            if (meal[`strIngredient${i}`]) {
                const measure = meal[`strMeasure${i}`];
                const value = meal[`strIngredient${i}`];
              ingredients.push(`${measure} - ${value}`);
            }
        }

ingredientsList.querySelectorAll("*").forEach(n => n.remove());

        ingredients.map(ingredient => {
            const listElement = document.createElement("li");
            const textNode = document.createTextNode(ingredient);

            listElement.appendChild(textNode);
            ingredientsList.appendChild(listElement);

        })
    })
}
