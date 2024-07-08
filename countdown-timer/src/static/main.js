((kioskData) => {


    function postAjax(url, data, success) {
        var params = typeof data == 'string' ? data : Object.keys(data).map(
                function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
            ).join('&');
    
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        return xhr;
    }


    let timeCount = {
        now: parseInt(+new Date() / 1000, 10),
        remaining:  parseInt(document.getElementById('raw-time').innerText, 10)
    }

    function run() {
        const timeRemainingEl = document.getElementById('raw-time');
        timeRemainingEl.style.display = 'none';
        const now = parseInt(+new Date() / 1000, 10);

        const diffTime = now-timeCount.now;
        console.log(now, timeCount.now, timeCount.remaining, diffTime);
        timeCount.remaining = timeCount.remaining - diffTime;
        timeCount.now = now;

        document.querySelector("#timer").innerHTML = `<span class="tomato">${timeCount.remaining}</span>`;


        postAjax('/update', {time: timeCount.remaining}, (response) => {
            console.log(response);
        });

    }
    run();
    setInterval(run, 1000);

})(window.kioskData)