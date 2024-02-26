((kioskData) => {



    const giornoGiorni = (n) => n === 1 ? "giorno" : "giorni";
    const settimanaSettimane = (n) => n === 1 ? "settimana" : "settimane";

    if (!kioskData) {
        console.error("No data provided");
        return;
    }

    // TODO - select data based on the current date
    const data = kioskData[0]


    function run() {
        const today = new Date();


        const date2 = new Date(data.date);

        const diffTime = date2 - today

        const diffSeconds = Math.floor(diffTime / 1000);

        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        const diffWeeks = Math.floor(diffDays / 7);
        const remWeeks = diffDays % 7;

        try {
            document.querySelector(".current-time").innerHTML = new Date().toString().replace(/GMT.*$/, '');
        } catch (e) {
            console.error(e);
        }

        try {
            document.querySelector(".init").innerHTML = `<span class='f-xxl'>${data.line}</span>`;
            document.querySelector(".days").innerHTML = `<span class='f-xxxl'><span class="tomato">${diffDays}</span> Giorni</span> `;
            document.querySelector(".time").innerHTML = `<span class='f-l'><span class="tomato">${diffHours % 24}</span> Ore </span>
            <span class='f-l'><span class="tomato">${diffMinutes % 60}</span> Minuti </span>
            <span class='f-l'><span class="tomato">${(diffSeconds % 60)}</span> secondi </span>`;
        } catch (e) {
            console.error(e);
        }

        if (diffWeeks > 0) {
            const rem = remWeeks !== 0 ? `e <span class="tomato">${remWeeks}</span> ${giornoGiorni(remWeeks)}` : "";
            document.querySelector(".weeks").innerHTML = `<div class="f-s"> ovvero <span class="tomato">${diffWeeks}</span> ${settimanaSettimane(diffWeeks)} ${rem}</div>`;
        }

    }
    run();
    setInterval(run, 500);

})(window.kioskData)