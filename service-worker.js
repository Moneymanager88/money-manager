self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("money-manager").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js"
      ]);
    })
  );
});
