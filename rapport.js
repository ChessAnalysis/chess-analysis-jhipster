var page = require("webpage").create(),
    url = "http://localhost:8080/#/rapport";

function onPageReady() {
    page.render('src/main/webapp/scripts/app/rapport/rapport.pdf');

    phantom.exit();
}

page.open(url, function (status) {
    function checkReadyState() {
        setTimeout(function () {
            var readyState = page.evaluate(function () {
                return document.readyState;
            });

            if ("complete" === readyState) {
                onPageReady();
            } else {
                checkReadyState();
            }
        });
    }

    checkReadyState();
});