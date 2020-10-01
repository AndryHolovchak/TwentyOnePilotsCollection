self.addEventListener("install", function (event) {
  event.waitUntil(caches.open("mp3-cache"));
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    caches
      /* This method returns a promise that resolves to a cache entry matching
           the request. Once the promise is settled, we can then provide a response
           to the fetch request.
        */
      .match(event.request)
      .then(function (cached) {
        /* Even if the response is in our cache, we go to the network as well.
             This pattern is known for producing "eventually fresh" responses,
             where we return cached responses immediately, and meanwhile pull
             a network response and store that in the cache.
             Read more:
             https://ponyfoo.com/articles/progressive-networking-serviceworker
          */
        let networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);

        /* We return the cached response immediately if there is one, and fall
             back to waiting on the network as usual.
          */
        return cached || networked;

        function fetchedFromNetwork(response) {
          return response;
        }

        /* When this method is called, it means we were unable to produce a response
             from either the cache or the network. This is our opportunity to produce
             a meaningful response even when all else fails. It's the last chance, so
             you probably want to display a "Service Unavailable" view or a generic
             error response.
          */
        function unableToResolve() {
          /* There's a couple of things we can do here.
               - Test the Accept header and then return one of the `offlineFundamentals`
                 e.g: `return caches.match('/some/cached/image.png')`
               - You should also consider the origin. It's easier to decide what
                 "unavailable" means for requests against your origins than for requests
                 against a third party, such as an ad provider
               - Generate a Response programmaticaly, as shown below, and return that
            */
          /* Here we're creating a response programmatically. The first parameter is the
               response body, and the second one defines the options for the response.
            */
          return new Response("<h1>Service Unavailable</h1>", {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/html",
            }),
          });
        }
      })
  );
});
