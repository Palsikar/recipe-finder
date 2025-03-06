document.getElementById("backBtn").addEventListener("click", () => {
    document.getElementById("recipeDetails").style.display = "none";
});

document.getElementById("closeBtn").addEventListener("click", () => {
    document.getElementById("recipeDetails").style.display = "none";
});

const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipedetailscontent = document.querySelector(".recipe-details-content");

const fetchRecipes = async (query) => { 
    recipeContainer.innerHTML = "<h2>Fetching recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `;
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv); 
    });
}

const fetchIngredients = (meal) => {
    let ingredientslist = "";
    for (let i = 1; i <= 20; i++) { 
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`]; 
            ingredientslist += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientslist;
}

const openRecipePopup = (meal) => {
    recipedetailscontent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" style="width:20%; border-radius:10px; margin-bottom: 10px;">
        <h3>Ingredients</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions.replace(/\n/g, '<br>')}</p>
    `;
    document.getElementById("recipeDetails").style.display = "block";
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetchRecipes(searchBox.value.trim());
});
