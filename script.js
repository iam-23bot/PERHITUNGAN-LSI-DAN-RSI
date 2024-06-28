function calculateIndices() {
    // Get form values
    const pH = parseFloat(document.getElementById('ph').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const tds = parseInt(document.getElementById('tds').value);
    const calcium = parseInt(document.getElementById('calcium').value);
    const alkalinity = parseInt(document.getElementById('alkalinity').value);

    // Calculate LSI
    const tFactor = (Math.log10(temperature) - 1) / 10;
    const tdsFactor = Math.log10(tds) / 10;
    const calciumFactor = Math.log10(calcium) - 0.4;
    const alkalinityFactor = Math.log10(alkalinity);

    const lsi = pH + tFactor + tdsFactor + calciumFactor + alkalinityFactor - 12.1;

    // Calculate RSI
    const rsi = 2 * (12.1 - lsi);

    // Display results
    document.getElementById('lsi-result').innerText = `LSI: ${lsi.toFixed(2)}`;
    document.getElementById('rsi-result').innerText = `RSI: ${rsi.toFixed(2)}`;

    // Predict scaling or corrosion potential
    let prediction;
    if (lsi > 0) {
        prediction = 'Water is scale-forming (potential scaling).';
    } else if (lsi < 0) {
        prediction = 'Water is corrosive (potential corrosion).';
    } else {
        prediction = 'Water is balanced (neither scaling nor corrosive).';
    }

    document.getElementById('prediction-result').innerText = prediction;
}
