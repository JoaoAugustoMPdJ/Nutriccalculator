function calculateCalories() {
  var gender = document.getElementById("gender").value;
  var age = parseInt(document.getElementById("age").value);
  var height = parseInt(document.getElementById("height").value);
  var weight = parseInt(document.getElementById("weight").value);
  var goal = document.getElementById("goal").value;
  var activity = document.getElementById("activity").value;

  var bmr = (gender === "male") ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age) : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  var tdee = calculateTDEE(bmr, activity);
  var maintenanceCalories = calculateMaintenanceCalories(tdee, goal);

  var proteinRecommendation = calculateProteinRecommendation(weight);
  var carbRecommendation = calculateCarbRecommendation(maintenanceCalories);
  var fatRecommendation = calculateFatRecommendation(maintenanceCalories);

  var resultElement = document.getElementById("result");
  resultElement.innerHTML = "<h2>Resultados:</h2>" +
    "<p>Calorias Diárias: " + maintenanceCalories + " kcal</p>" +
    "<p>Proteínas Recomendadas: " + proteinRecommendation + "g</p>" +
    "<p>Carboidratos Recomendados: " + carbRecommendation + "g</p>" +
    "<p>Gorduras Recomendadas: " + fatRecommendation + "g</p>";
}

function calculateTDEE(bmr, activity) {
  var activityFactors = {
    sedentary: 1.2,
    active: 1.55,
    intense: 1.9
  };
  return Math.round(bmr * activityFactors[activity]);
}

function calculateMaintenanceCalories(tdee, goal) {
  var goalFactors = {
    lose: 0.8,
    maintain: 1,
    gain: 1.06 // Ajustado para 1.15 em vez de 1.2
  };
  return Math.round(tdee * goalFactors[goal]);
}

function calculateProteinRecommendation(weight) {
  var proteinRatio = 1.2; // Pode ajustar conforme necessário
  return Math.round(weight * proteinRatio);
}

function calculateCarbRecommendation(calories) {
  var carbPercentage = 0.45;
  return Math.round((calories * carbPercentage) / 4);
}

function calculateFatRecommendation(calories) {
  var fatPercentage = 0.25;
  return Math.round((calories * fatPercentage) / 9);
}
