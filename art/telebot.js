let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37"

// Define the function to handle the button click event
function handleButtonClick() {
    const json = document.getElementById("jsonData").value;
    let paramJson = [];

    // Assuming x is defined elsewhere
    for (let i = 0; i < x; i++) {
        let param = document.getElementById("param-json_" + i); // corrected index
        paramJson.push(param.value.trim());
    }

    let data = {
        json: json,
        paramJson: paramJson
    };
    tg.sendData(JSON.stringify(data));
}

// Attach the event listener directly to the element
tg.MainButton.onClick = handleButtonClick;

// Show the button when input changes
document.getElementById('jsonData').addEventListener('input', function () {
    tg.MainButton.setText("Send");
    tg.MainButton.show();
});