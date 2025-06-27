const CACHE_NAME = "netshoes-cache-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./busca.html",
  "./categoria.html",
  "./carrinho.html",
  "./finalizar.html",
  "./static/css/bootstrap.min.css",
  "./static/css/estilo.css",
  "./static/js/bootstrap.bundle.min.js",
  "./static/js/carrinho.js",
  "./static/uploads/banner1.jpg",
  "./static/uploads/banner2.jpg",
  "./static/uploads/banner3.jpg",
  "./static/uploads/favicon.png",
  "./static/uploads/icon-192.png",
  "./static/uploads/finalizado.png",
  "./static/uploads/tenis-corrida.jpg",
  "./static/uploads/tenis1.jpg",
  "./static/uploads/roupa.jpg",
  "./static/uploads/shorts.jpg",
  "./static/uploads/mochila.jpg",
  "./static/uploads/jaqueta.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
