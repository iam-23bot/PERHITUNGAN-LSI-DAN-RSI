function calculateIndices() {
    // Get form values
    const pH = parseFloat(document.getElementById('ph').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const tds = parseInt(document.getElementById('tds').value);
    const calcium = parseInt(document.getElementById('calcium').value);
    const alkalinity = parseInt(document.getElementById('alkalinity').value);

   // Constants
const A = Math.log10(tds) - 1;
const B = -13.12 * Math.log10(temperature + 273) + 34.55;
const C = Math.log10(calcium) - 0.4;
const D = Math.log10(alkalinity);

// Calculate pH_sat
const pH_sat = (9.3 + A + B) - (C + D);

// Calculate LSI
const lsi = pH - pH_sat;

// Calculate RSI
const rsi = 2 * pH_sat - pH;

console.log('LSI:', lsi);
console.log('RSI:', rsi);

    // Display results
    document.getElementById('lsi-result').innerText = `LSI: ${lsi.toFixed(2)}`;
    document.getElementById('rsi-result').innerText = `RSI: ${rsi.toFixed(2)}`;

   function predictWaterTendency(lsi, rsi) {
    let lsiPrediction;
    if (lsi <= -2) {
        lsiPrediction = 'Serious Corrosion';
    } else if (lsi <= -0.5) {
        lsiPrediction = 'Slightly corrosive and non-scaling';
    } else if (lsi === 0) {
        lsiPrediction = 'Balanced, but potential for pitting corrosion';
    } else if (lsi <= 0.5) {
        lsiPrediction = 'Slightly corrosive and scaling';
    } else if (lsi >= 2) {
        lsiPrediction = 'Scaling and generally non-corrosive';
    } else {
        lsiPrediction = 'No specific tendency';
    }

    let rsiPrediction;
    if (rsi < 6) {
        rsiPrediction = 'Scale-forming';
    } else if (rsi >= 6 && rsi <= 7) {
        rsiPrediction = 'Neutral';
    } else if (rsi > 7) {
        rsiPrediction = 'Corrosive';
    } else {
        rsiPrediction = 'No specific tendency';
    }

    document.getElementById('lsi-prediction-result').innerText = `LSI Prediction: ${lsiPrediction}`;
    document.getElementById('rsi-prediction-result').innerText = `RSI Prediction: ${rsiPrediction}`;
}
