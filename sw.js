const CACHE_NAME = "Cat-Gallery-PWA-v3";
var urlToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css?family=Comfortaa:400,700",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/pages/about.html",
  "/pages/cat-playground.html",
  "/pages/filter-cat.html",
  "/pages/home.html",
  "/pawprint.png",
  "/images/cat1.jpg",
  "/images/cat2.jpg",
  "/images/cat3.jpg",
  "/images/cats.jpg",
  "/images/playground1.jpg",
  "/images/playground2.jpg",
  "/images/playground3.jpg",
  "/images/pawprint.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      cache.addAll(urlToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Use Asset from Cache: ", response.url);
          return response;
        }
        console.log(
          "ServiceWorker: Load asset From Server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " Deleted");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
