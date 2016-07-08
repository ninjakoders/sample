self.addEventListener('push', function(event) {  
  // Since there is no payload data with the first version  
  // of push messages, we'll grab some data from  
  // an API and use it to populate a notification  
  event.waitUntil(  
    //fetching data from ninjacoders api
    fetch("http://api.ninjacoders.info/notification").then(function(response) {  
      if (response.status !== 200) {  
        // Either show a message to the user explaining the error  
        // or enter a generic message and handle the
        // onnotificationclick event to direct the user to a web page  
        console.log('Looks like there was a problem. Status Code: ' + response.status);  
        throw new Error();  
      }
      console.log('response: ', response);
      // Examine the text in the response  
      return response.json().then(function(data) {  
        if (data.error || !data.notification) {  
          console.error('The API returned an error.', data.error);  
          throw new Error();  
        }  
        
        var title = data.notification.title;
        var notificationOptions = {
          body: data.notification.message,
          icon: data.notification.icon,
          tag:  data.notification.tag,
          data: {
            url: data.notification.url
          }
        };
         
        return self.registration.showNotification(title, notificationOptions);  
      });  
    }).catch(function(err) {  
      console.error('Unable to retrieve data', err);

      var title = 'New message';
      var message = 'Notificaiton received from ninjacoders';  
      var icon = 'http://api.ninjacoders.info/images/icon-192x192.png';  
      var notificationTag = 'notification-error';  
      return self.registration.showNotification(title, {  
          body: message,  
          icon: icon,  
          tag: notificationTag  
        });  
    })  
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