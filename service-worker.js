const CACHE = 'MyWonderland-static-v1';
const files = [
    "index.html",
    "wonderland.min.js",
    "vr-button.svg",
    "ar-button.svg",
    "WonderlandRuntime.wasm",
    "WonderlandRuntime.js",
    "WonderlandRuntime-simd.wasm",
    "WonderlandRuntime-simd.js",
    "WonderlandRuntime-threads.wasm",
    "WonderlandRuntime-threads.js",
    "WonderlandRuntime-threads.worker.js",
    "WonderlandRuntime-simd-threads.wasm",
    "WonderlandRuntime-simd-threads.js",
    "WonderlandRuntime-simd-threads.worker.js",
    ".DS_Store",
    "sfx/unclick.wav",
    "sfx/click.wav",
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(files) ));
});
self.addEventListener('activate', event => {
    console.log('Service worker initialized.');
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    const base = url.pathname.split('?')[0];
    if(url.origin == location.origin && files.includes(base)) {
        event.respondWith(caches.match(base));
    }
});
