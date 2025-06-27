const CACHE_NAME = "netshoes-cache-v2"; // Troque o número a cada atualização importante

const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./busca.html",
  "./categoria.html",
  "./carrinho.html",
  "./finalizar.html",
  "./manifest.json",
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

// Instalação e pré-cache
self.addEventListener("install", (event) => {
  console.log("🔧 Instalando Service Worker e armazenando arquivos...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Ativação: remove caches antigos
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker ativado.");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log("🗑️ Deletando cache antigo:", name);
            return caches.delete(name);
          })
      )
    )
  );
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("✅ Requisição servida do cache:", event.request.url);
        return response;
      }
      console.log("🌐 Requisição buscada da internet:", event.request.url);
      return fetch(event.request);
    })
  );
});
