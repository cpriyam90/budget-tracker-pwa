//Please see CREDITS/CITATIONS here - I have included these in my Readme as well.
//* Class activities for coding service workers file - class activity 05-Notetaker PWA
//* TA Charlie for explaining and helping code service workers, how to write a manifest, understand offline functionality for idb.js and for helping me deploy my application to heroku.
//* Module 18 lesson on NoSql and for coding idb.js file, lesson 4 - https://courses.bootcampspot.com/courses/1196/pages/18-dot-4-3-introducing-indexeddb?module_item_id=463159
//* Module 19 lesson 4 on PWA and service worker - https://courses.bootcampspot.com/courses/1196/pages/19-dot-4-3-introduction-to-service-workers?module_item_id=463581
//* Module 18 lesson 5 on linking MongoDB Atlas with Heroku - https://courses.bootcampspot.com/courses/1196/pages/18-dot-5-1-introduction?module_item_id=463209
//* Starter code provided in assignment to get started


const CACHE_NAME = 'my-site-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v2';

const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/index.js',
  '/css/style.css',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('Sucessful!');
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });

  self.addEventListener('activate', function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log('Removing old cache data', key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });

  self.addEventListener('fetch', function(evt) {
    if (evt.request.url.includes('/api/')) {
      evt.respondWith(
        caches
          .open(DATA_CACHE_NAME)
          .then(cache => {
            return fetch(evt.request)
              .then(response => {
               
                if (response.status === 200) {
                  cache.put(evt.request.url, response.clone());
                }
  
                return response;
              })
              .catch(err => {
            
                return cache.match(evt.request);
              });
          })
          .catch(err => console.log(err))
      );
  
      return;
    }
  
    evt.respondWith(
      fetch(evt.request).catch(function() {
        return caches.match(evt.request).then(function(response) {
          if (response) {
            return response;
          } else if (evt.request.headers.get('accept').includes('text/html')) {
         
            return caches.match('/');
          }
        });
      })
    );
  });
  