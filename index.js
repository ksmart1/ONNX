const numerical_cols = ["Bidder_Tendency", "Bidding_Ratio", "Successive_Outbidding", "Last_Bidding", "Auction_Bids", "Starting_Price_Average", "Early_Bidding", "Winning_Ratio", "Bidder_ID_encoded"];

async function runExample() {
    // Retrieve input values from text boxes
    let x = [];
    x[0] = parseFloat(document.getElementById('box1').value);
    x[1] = parseFloat(document.getElementById('box2').value);
    x[2] = parseFloat(document.getElementById('box3').value);
    x[3] = parseFloat(document.getElementById('box4').value);
    x[4] = parseFloat(document.getElementById('box5').value);
    x[5] = parseFloat(document.getElementById('box6').value);
    x[6] = parseFloat(document.getElementById('box7').value);
    x[7] = parseFloat(document.getElementById('box8').value);
    x[8] = parseFloat(document.getElementById('box9').value);
   

    // Load scaling parameters
    const scalingParams = {
        "Bidder_Tendency": {"min": 0.0, "max": 1.0, "mean": 0.14253164558164555},
        "Bidding_Ratio": {"min": 0.011764706, "max": 1.0, "mean": 0.12762658230696203},
        "Successive_Outbidding": {"min": 0.0, "max": 1.0, "mean": 0.10379746835443038},
        "Last_Bidding": {"min": 0.0, "max": 0.999900463, "mean": 0.46319265099414564},
        "Auction_Bids": {"min": 0.0, "max": 0.788235294, "mean": 0.23164239491455701},
        "Starting_Price_Average": {"min": 0.0, "max": 0.999935281, "mean": 0.4727389408066455},
        "Early_Bidding": {"min": 0.0, "max": 0.999900463, "mean": 0.4307506928971044},
        "Winning_Ratio": {"min": 0.0, "max": 1.0, "mean": 0.36768389861598105},
        "Bidder_ID_encoded": {"min": 0.0, "max": 1053.0, "mean": 556.9689873417722}
    };

    // Scale input features
    for (let i = 0; i < x.length; i++) {
        const feature = numerical_cols[i];
        const min = scalingParams[feature].min;
        const max = scalingParams[feature].max;
        const mean = scalingParams[feature].mean;

        // Perform min-max scaling
        x[i] = (x[i] - mean) / (max - min);
        console.log(x[i])
    }

    // Create tensor from scaled input
    const tensorX = new onnx.Tensor(x, 'float32', [1, 9]);
    console.log("TensonX: " + tensorX);

    // Load the ONNX model
    const session = new onnx.InferenceSession();
    // Changed the model name
    await session.loadModel("./DLshillOrNot_2.onnx");

    // Run inference
    const outputMap = await session.run([tensorX]);
    const outputData = outputMap.get('16');

    // Display inference result
    const predictions = document.getElementById('predictions');
    console.log(predictions);
    predictions.innerHTML = `Classification: ${outputData.data[0].toFixed(2)}`;

}
