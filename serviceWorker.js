// array de recursos que queremos cachear
const assets = [
    "index.html",
    "styles/styles.min.css",
    "js/app.js"
];

// instalamos el service worker
self // es el service worker
    .addEventListener("install", installEvent => {
        installEvent.waitUntil(
            caches.open("my-todo-list-0").then(cache => {
                cache.addAll(assets)
            })
        )
    });

self.addEventListener("fetch", fetchEvent => {
    //console.log("📡 Fetch Event: ", fetchEvent);
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            //console.log("  📦 From Cache: ", caches, caches.match(fetchEvent.request), res);
            return res || fetch(fetchEvent.request)
        })
    )
})