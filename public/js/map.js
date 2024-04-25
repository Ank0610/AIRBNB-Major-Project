
  
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates,
        //center: [85.368752, 26.121473], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    const marker = new mapboxgl.Marker({ color: "red" }) 
  .setLngLat(listing.geometry.coordinates)            
  .setPopup(                                        
    new mapboxgl.Popup({ offset: 25 }).setHTML(`<h6>${listing.title}</h6><p><b>${listing.location}, ${listing.country}</b></p><p>Exact location will be provided after booking!</p>`)) 
  .addTo(map);