self.addEventListener('install', function (event) {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

setInterval(function () {
    fetch(window.location.href)
        .then(response => response.text())
        .then(data => {
            // If you want to do something with the fetched data:
            console.log(data);
        });
}, 1000);