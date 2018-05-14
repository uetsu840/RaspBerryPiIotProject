var fnGetUserInfo = function () {
    console.log("success")
    getUserInfo()
        .then((userInfo) => createView(userInfo))
        .then((view) => displayView(view))
        .catch((error) => {
            console.error(`エラーが発生しました (${error})`);
        });
}


function main() {
    setInterval(fnGetUserInfo, 1000);
}

function getUserInfo() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", `https://api.iot-test.suzaku-ok.jp/status`)        
        request.addEventListener("load", (event) => {
            if (event.target.status !== 200) {
                reject(new Error(`${event.target.status}: ${event.target.statusText}`));
            }
            console.log(event.target.responseText)
            const userInfo = JSON.parse(event.target.responseText);
            resolve(userInfo);
        });
        request.addEventListener("error", () => {
            reject(new Error("ネットワークエラー"));
        });
        request.send();
    });
}

function getUserId() {
    const value = document.getElementById("userId").value;
    return encodeURIComponent(value);
}

function createView(deviceInfo) {
    return escapeHTML`
    <h4>${deviceInfo.timestamp}</h4>
    <dl>
        <dt>State_Val0</dt>
        <dd>${deviceInfo.state.reported.State_Val0}</dd>
        <dt>State_Val1</dt>
        <dd>${deviceInfo.state.reported.State_Val1}</dd>
        <dt>State_Val2</dt>
        <dd>${deviceInfo.state.reported.State_Val2}</dd>
        <dt>State_Val2</dt>
        <dd>${deviceInfo.state.reported.State_Val3}</dd>
    </dl>
    `;
}

function displayView(view) {
    const result = document.getElementById("result");
    result.innerHTML = view;
}

function escapeSpecialChars(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escapeSpecialChars(value) + string;
        } else {
            return result + String(value) + string;
        }
    });
}