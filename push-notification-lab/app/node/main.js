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

// TODO 3.8 - push a message using the web push library
var webPush = require('web-push');

var pushSubscription = {
    "endpoint":"https://android.googleapis.com/gcm/send/eQBFyLTptEo:APA91bHK9tizwgjyuvmv_QlLiu2fhljrYFzoLk1pDQ8p-wJZfObOdby-bRpsiBSbhR3F4LBm_jTouuJRgzALnmWKOC0byrEEfeqHJ2FiOz9209-6AhPZ_uLuNJA3WLJ4Sh8u8ZsS4xRz",
    "expirationTime":null,
    "keys":{
        "p256dh":"BBoythpVTFg0BljUSpJ1pVlHnNaVYnWlYl1dSY9e2eH8YdME9D4_5COYDxSjOZLmBt58-JND5AN3O_vQJN9iH8c",
        "auth":"L2PyFznmnPuWMNUP1MBJbg"
    }
}

// TODO 4.3a - include VAPID keys

var payload = 'Here is a payload!';

var options = {
  gcmAPIKey: 'AAAAWTjHNOU:APA91bHPL1UievxcS1vEQVgCi8DAwMWrYfvhBw_hhsbdVmfNygY_foQH57pgRuz5CKrcKGwcGooN__3M4XEEunm1AGmPO2thrP9HY2zu_iPo6xxHr9pLt5AqBuoAyYkSNvNBOywvEbGJ',
  TTL: 60,

  // TODO 4.3b - add VAPID details

};

console.log('sending push notifications ...');

webPush.sendNotification(
  pushSubscription,
  payload,
  options
);
