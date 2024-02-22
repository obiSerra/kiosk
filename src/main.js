(() => {

    const data = {
        "title": "Roseto",
        "date": "04/25/2024",

    }

    const giornoGiorni = (n) => n === 1 ? "giorno" : "giorni";
    const settimanaSettimane = (n) => n === 1 ? "settimana" : "settimane";


    function run() {
        const today = new Date();
        const date2 = new Date(data.date);

        const diffTime = date2 - today
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const remWeeks = diffDays % 7;

        const diffSeconds = Math.ceil(diffTime / 1000);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        if (diffTime < 0) {
            document.querySelector(".days").innerHTML = `<strong>${data.title}</strong> è ARRIVATO!`;
            return;
        }

        document.querySelector(".init").innerHTML = "Mancano";
        if (diffHours <= 1) {
            document.querySelector(".days").innerHTML = `<strong> Manca meno di un'ora a ${data.title}`;
        }
        else if (diffHours < 24) {
            document.querySelector(".days").innerHTML = `<strong>${diffHours}</strong> ore a ${data.title}`;
        } else {
            document.querySelector(".days").innerHTML = `<strong>${diffDays}</strong> ${giornoGiorni(diffDays)} a ${data.title}`;
            if (diffWeeks > 0) {
                const rem = remWeeks !== 0 ? `e <strong>${remWeeks}</strong> ${giornoGiorni(remWeeks)}` : "";
                document.querySelector(".weeks").innerHTML = `ovvero <strong>${diffWeeks}</strong> ${settimanaSettimane(diffWeeks)} ${rem}`;
            }
        }

        document.querySelector(".seconds").innerHTML = `precisamente <strong>${diffSeconds.toLocaleString('it-IT')}</strong> secondi`;

    }
    run();
    setInterval(run, 1000);

})()