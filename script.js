document.getElementById('predictForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const resDiv = document.getElementById('result');
    resDiv.innerHTML = "<p>Analyzing... please wait ⏳</p>";

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.error) {
            resDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
        } else {
            resDiv.innerHTML = `
                <h3>🌿 Prediction Result</h3>
                <p><b>Seed Type:</b> ${data.seed}</p>
                <p><b>Predicted Yield:</b> ${data.yield_prediction} tons/hectare</p>
                <p><b>Suitability:</b> ${data.suitability}</p>
                <p><b>Recommended Land:</b> ${data.recommended_land}</p>
            `;
        }
    } catch (error) {
        resDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
});
