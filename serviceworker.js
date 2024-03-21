// codice del ServiceWorker
// STEP1
// dobbiamo impostare il nome alla cache dedicata alla web app
const CACHE_NAME = "temperature-converter-v1";
// dobbiamo aggiungere un eventListner per l'evento install che si occuperò
// di accedere alla cache e memorizzare i file necessari.
// l'evento install è il primo evento del SW
// qui andiamo a scegliere quali file inserire nelal cache
self.addEventListener("install", (event) => {
    // waitUntil prende un closure (una funzione anonima)
    event.waitUntil((async () => {
        // caches è l'API per accedere alla cache
        // caches.open(X) accede alla cache con nome X, se non esiste la crea
        const cache = await caches.open(CACHE_NAME);
        // cache.addAll(A) aggiunge alla cache gli elementi nell'array A;
        // aggiungere un elemento significa accedere alla risorsa e immagazzinarla
        cache.addAll([
            "/", 
            "/converter.js",
            "/converter.css"
        ]);
    })() // invoco la funzione data come parametro a waitUntil
  );
});

// STEP 2: per ogni evento fetch accedo alla cache e controllo 
// se la risorsa richiesta nell'evento fetch è immagazzinata nella cache,
// se sì la restituisco,
// se non è nella cache allora provo a richiederla al server e la aggiungo alla cache
self.addEventListener("fetch", (event) => {
    event.respondWith((async () => {
        // accede alla cache
        const cache = await caches.open(CACHE_NAME);
        // controlla se la cache ha questa risorsa
        const cachedResponse = await cache.match(event.request);
        // se sì la restituisco
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // altrimenti la richiedo al server
                const fetchResponse = await fetch(event.request);
                // e la immagazzino nella cache
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
            } catch (e) {
                // errore
            }
        }
    })()
  );
});
