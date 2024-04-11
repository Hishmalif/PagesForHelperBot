let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37"

document.getElementById('jsonData').addEventListener('input', function () {
    tg.MainButton.setText("Send");
    tg.MainButton.show();
});

Telegram.WebApp.onEvent.onClick

Telegram.WebApp.onEvent("mainButtonClicked", function () {
        const json = document.getElementById("jsonData").value;
        let paramJson = [];

        for (let i = 0; i < x; i++) {
            let param = document.getElementById("param-json_" + --x);
            paramJson.push(param.value.trim());
        }

        let data = {
            json: json,
            paramJson: paramJson
        }
        tg.sendData(JSON.stringify(data));
    }
);