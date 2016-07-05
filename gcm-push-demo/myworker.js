self.addEventListener('push', function(event) {
  console.log('Push message received');
  var notificationTitle = 'New Message';
  const notificationOptions = {
    body: 'Push mesage received',
    icon: './images/icon-192x192.png',
    tag: 'simple-push-demo-notification',
    data: {
      url: 'http://ninjacoders.info'
    }
  };

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(
        notificationTitle, notificationOptions)
    ])
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  var clickResponsePromise = Promise.resolve();
  if (event.notification.data && event.notification.data.url) {
    clickResponsePromise = clients.openWindow(event.notification.data.url);
  }

  event.waitUntil(
    Promise.all([
      clickResponsePromise
    ])
  );
});