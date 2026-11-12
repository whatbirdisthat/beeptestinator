// Beeptestinator v0.41.6 · b1da081. Generated at build time — saves the whole app for use with no signal.
const CACHE = "beeptest-e9be31178f60";
const FILES = ["./","apple-touch-icon.png","assets/index-DO_Dy9yA.js","assets/index-DryC05si.css","icon-192.png","icon-512.png","icon.svg","manifest.webmanifest"];
const PAGE = new URL('./', self.location).href;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('beeptest-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.registration.scope)) return;
  // Any opening of the app, whatever its ?query, is the one saved page. ignoreVary: the module
  // script asks with an Origin header the saved copy was fetched without, and a server that
  // answers "Vary: Origin" would otherwise make the saved copy never match.
  const navigate = req.mode === 'navigate';
  event.respondWith(
    caches.open(CACHE)
      .then((c) => c.match(navigate ? PAGE : req, { ignoreSearch: navigate, ignoreVary: true }))
      .then((hit) => hit || fetch(req)),
  );
});
