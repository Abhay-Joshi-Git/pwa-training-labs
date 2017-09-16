/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function() {
  'use strict';

  // TODO 2 - cache the application shell
  var filesToCache = [
    '.',
    'style/main.css',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
    'images/still_life-1600_large_2x.jpg',
    'images/still_life-800_large_1x.jpg',
    'images/still_life_small.jpg',
    'images/still_life_medium.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
  ];

  var staticCacheName_old = 'static-cache-v1';
  var staticCacheName = 'pages-cache-v2';

  self.addEventListener('install', function(event) {
    console.log('in install , adding app cache');
    event.waitUntil(
      caches.open(staticCacheName)
        .then(function(cache) {
          return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
  });

  // TODO 3 - intercept network requests
  self.addEventListener('fetch', function(event) {
    console.log('in fetch, req -', event.request, event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('found response in cache', response);
          return response;
        }
        console.log('calling network req');
        return fetch(event.request)
        // TODO 4 - add response to cache
        .then(function(response) {
            console.log(response);
            if (response.ok) {
              return caches.open(staticCacheName).then(function(cache) {
                if (event.request.url.indexOf('test') < 0) {
                  cache.put(event.request.url, response.clone());
                }
                return response;
              })
            } else if (response.status === 404) {
              console.log('returning 404 page');
              return caches.match('pages/404.html').then(function(response) {
                return response;
              })
            }
          })
      })
      .catch(function() {
        // TODO 6 - load offline page
        return caches.match('pages/offline.html').then(function(response) {
          return response;
        })
      })
    )
  })

  // TODO 7 - delete unused caches
  self.addEventListener('activate', function(event) {
    console.log('Activating new service worker...');
  
    var cacheWhitelist = [staticCacheName];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            console.log('cacheName', cacheName);
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('deleting cache', cacheName)
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

})();
