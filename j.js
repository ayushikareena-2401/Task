
function fillLocationDetails() {
    var location = document.getElementById('location').value;
    // You may need to replace the API key with your own if you're using Google Maps Geocoding API
    var geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=YOUR_API_KEY`;
    
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          var addressComponents = data.results[0].address_components;
          var city, state, country;
          
          for (var i = 0; i < addressComponents.length; i++) {
            var component = addressComponents[i];
            if (component.types.includes('locality')) {
              city = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')) {
              state = component.long_name;
            } else if (component.types.includes('country')) {
              country = component.long_name;
            }
          }
          
          document.getElementById('city').value = city;
          document.getElementById('state').value = state;
          document.getElementById('country').value = country;
        } else {
          console.error('No results found');
        }
      })
      .catch(error => {
        console.error('Error fetching location details:', error);
      });
  }