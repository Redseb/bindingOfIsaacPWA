//Responsible for registering the service worker (sw.js)
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('serice worker registered', reg))
        .catch((err) => console.log('ERROR: service worker not registered', err))
}