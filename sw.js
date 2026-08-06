// Odda · Service worker
// Hace dos cosas: que la app arranque aunque no haya cobertura, y
// recibir los avisos que llegan cuando la app está cerrada.

const CACHE = 'odda-v1';
const BASE  = self.registration.scope;

// Solo se guarda la portada. El resto (ESPN, Supabase) siempre va a la red:
// unos datos de partidos cacheados serían peores que no tener nada.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll([BASE, BASE + 'index.html']))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Red primero para el documento; si falla, lo que haya guardado.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode !== 'navigate') return;
  e.respondWith(
    fetch(req)
      .then(r => {
        const copia = r.clone();
        caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(req).then(r => r || caches.match(BASE + 'index.html')))
  );
});

// ── Avisos enviados desde el servidor ──
// El cuerpo llega como JSON: {titulo, cuerpo, url}
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = {}; }
  const titulo = d.titulo || 'Odda';
  e.waitUntil(
    self.registration.showNotification(titulo, {
      body: d.cuerpo || '',
      icon: d.icon || (BASE + 'icon-192.png'),
      badge: d.badge || (BASE + 'icon-192.png'),
      tag: d.tag || 'odda',
      renotify: true,
      data: { url: d.url || BASE }
    })
  );
});

// Al tocar el aviso, se abre la pestaña que ya estuviera abierta
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const destino = (e.notification.data && e.notification.data.url) || BASE;
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(lista => {
      for (const c of lista) {
        if (c.url.indexOf(BASE) === 0 && 'focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(destino);
    })
  );
});
