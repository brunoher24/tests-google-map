let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(48, 2),
    zoom: 6,
    styles: nightMapStyle
  });
  
  map.addListener("click", e => {
    const marker = new google.maps.Marker({
      position: e.latLng,
      map: map,
    });
    marker.addListener("click", () => { 
      marker.setMap(null);
    });
  });

  const selectedCountries = [];
  fetch("./countries_.geojson")
  .then(res => res.json())
  .then(countries => {
    for(const countryName in countries) {
      const countryTerritoriesCoords = countries[countryName];
      const countryPolygons = countryTerritoriesCoords.map(territoryCoords => (
        new google.maps.Polygon({
          paths: territoryCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        })
      ));

      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.innerText = countryName;
      li.appendChild(btn);
      document.getElementById("countries-list").appendChild(li);
      
      btn.addEventListener("click", e => {
        const index = selectedCountries.indexOf(countryName);
        if(index > -1) {
          countryPolygons.forEach(polygon => polygon.setMap(null));
          selectedCountries.splice(index, 1);
          e.target.classList.remove("selected");
        } else {
          selectedCountries.push(countryName);
          countryPolygons.forEach(polygon => polygon.setMap(map));
          e.target.classList.add("selected");
        }
      });
    }
  });
}

// function getRandomFromInterval(min, max) { // min and max included 
//     return Math.random() * (max - min) + min;
// }

// function degreesToRadians(degrees) {
//     const degToRadFactor = Math.PI / 180;
//     return degrees * degToRadFactor;
// }

// function radiansToDegrees(radians) {
//     const radToDegFactor = 180 / Math.PI;
//     return radians * radToDegFactor;
// }

// function getBearing(pt1, pt2) {
//     const x = Math.cos(degreesToRadians(pt1.lat)) * Math.sin(degreesToRadians(pt2.lat)) - Math.sin(degreesToRadians(pt1.lat)) * Math.cos(degreesToRadians(pt2.lat)) * Math.cos(degreesToRadians(pt2.lng - pt1.lng));
//     const y = Math.sin(degreesToRadians(pt2.lng - pt1.lng)) * Math.cos(degreesToRadians(pt2.lat));

//     return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
// }

// const distanceAllowedInKm = 100;


// function findPointAtDistanceFrom(startPoint, initialBearingRadians, distanceKilometres) {  
//     const distance = distanceKilometres*(Math.ceil(distanceAllowedInKm/10)) * 1.5;
//     const radiusEarthKilometres = 6371.01;
//     const distRatio = distance / radiusEarthKilometres;
//     const distRatioSine = Math.sin(distRatio);
//     const distRatioCosine = Math.cos(distRatio);

//     const startLatRad = degreesToRadians(startPoint.lat);
//     const startLonRad = degreesToRadians(startPoint.lng);

//     const startLatCos = Math.cos(startLatRad);
//     const startLatSin = Math.sin(startLatRad);

//     const endLatRads = Math.asin((startLatSin * distRatioCosine) + (startLatCos * distRatioSine * Math.cos(initialBearingRadians)));

//     const endLonRads = startLonRad + Math.atan2(Math.sin(initialBearingRadians) * distRatioSine * startLatCos, distRatioCosine - startLatSin * Math.sin(endLatRads));

//     return {
//         lat: radiansToDegrees(endLatRads),
//         lng: radiansToDegrees(endLonRads)
//     };
// }
