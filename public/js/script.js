// Swiper js
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  // grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// Nav open close
const body = document.querySelector('body'),
      navMenu = body.querySelector('.menu-content'),
      navOpenBtn = body.querySelector('.navOpen-btn'),
      navCloseBtn = navMenu.querySelector('.navClose-btn');

if(navMenu && navOpenBtn){
  navOpenBtn.addEventListener("click", () =>{
    navMenu.classList.add("open");
    body.style.overflowY = "hidden";
  })
}

if(navMenu && navCloseBtn){
  navCloseBtn.addEventListener("click", () =>{
    navMenu.classList.remove("open");
    body.style.overflowY = "scroll";
  })
}

// Change header bg color
window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  if(scrollY > 5){
    document.querySelector("header").classList.add("header-active");
  }else{
    document.querySelector("header").classList.remove("header-active");
  }

  // Scroll up button
  const scrollUpBtn = document.querySelector('.scrollUp-btn');

  if(scrollY > 250){
    scrollUpBtn.classList.add("scrollUpBtn-active");
  }else{
    scrollUpBtn.classList.remove("scrollUpBtn-active");
  }
  
  
  // Nav link indicator

  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section =>{
    const sectionHeight = section.offsetHeight,
          sectionTop = section.offsetTop - 100;

          let navId = document.querySelector(`.menu-content a[href='#${section.id}']`);
          if(scrollY > sectionTop && scrollY <=  sectionTop + sectionHeight){
            navId.classList.add("active-navlink");           
          }else{
            navId.classList.remove("active-navlink");     
          }
          
          navId.addEventListener("click", () => {
            navMenu.classList.remove("open");
            body.style.overflowY = "scroll";
          })
  })
})  
  
  
  // Scroll Reveal Animation
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
  })
  
  sr.reveal(`.section-title, .section-subtitle, .section-description, .brand-image, .tesitmonial, .newsletter 
.logo-content, .newsletter-inputBox, .newsletter-mediaIcon, .footer-content, .footer-links`, {interval:100,})

sr.reveal(`.about-imageContent, .menu-items`, {origin: 'left'})
sr.reveal(`.about-details, .time-table`, {origin: 'right'})



// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}






document.getElementById('predict-btn').addEventListener('click', function() {
  var location = document.getElementById('location').value;

  // Replace 'YOUR_API_KEY' with your actual API key
  var apiKey = '24dbd2f2d56e4a2c89b55143232506';

  // Make a request to the weather API
  fetch('https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + location)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          var temperature = data.current.temp_c;
          var humidity = data.current.humidity;
          var rainfall = data.current.precip_mm;

          var crops = suggestCrops(temperature, humidity, rainfall);

          displayCrops(crops);
      })
      .catch(function(error) {
          console.log('Error:', error);
      });
});

function suggestCrops(temperature, humidity, rainfall) {
  // Implement your logic here to determine suitable crops based on weather conditions
  // You can use if-else statements or any other approach

  var crops = [];

  if (temperature >= 36 ) {
      crops.push('Rice');
  } 
  else if (temperature >= 32 ) {
      crops.push('Maize');
  } 
  else if (temperature >= 28 ) {
    crops.push('Soybean');
} 
else if (temperature >= 24 ) {
  crops.push('Wheat');
} 
else if (temperature >= 20 ) {
  crops.push('Barley');
} 
else if (temperature >= 0 ) {
  crops.push('Oats');
} 
  else {
      crops.push('No suitable crops found');
  }

  return crops;
}

function displayCrops(crops) {
  var cropList = document.getElementById('crop-list');
  cropList.innerHTML = '';

  crops.forEach(function(crop) {
    var listItem = document.createElement('li');
    listItem.classList.add('crop-item'); // Add a class to the list item

    // Create an image element
    var image = document.createElement('img');
    image.alt = crop; // Use the crop name as the alt text

    // Set the image source based on the crop
    if (crop === 'Oats') {
      image.src = '/static/images/homeImg1.jpg';
    } else if (crop === 'Barley') {
      image.src = '/static/images/barley.jpeg';
    } else if (crop === 'Wheat') {
      image.src = '/static/images/wheat.jpeg';
    } 
    else if (crop === 'Soybean') {
      image.src = '/static/images/soyabean.jpeg';
    }
    else if (crop === 'Maize') {
      image.src = '/static/images/maize.jpeg';
    }
    else {
      image.src = '/static/images/maize.jpeg'; // Default image if crop doesn't match any condition
    }
     

    var suggested = document.createElement('h2');
    var s = "suggested crop" ;
    suggested.textContent = s ;
    suggested.classList.add("ih2");

    // Create a span element to hold the crop name
    var cropName = document.createElement('span');
    cropName.textContent = crop;

    // Append the image and crop name to the list item

    listItem.appendChild(suggested);

    listItem.appendChild(image);
    listItem.appendChild(cropName);

    cropList.appendChild(listItem);
  });
}


document.getElementById('weather-btn').addEventListener('click', function() {
  var location = document.getElementById('location').value;

  // Replace 'YOUR_API_KEY' with your actual API key
  var apiKey = '24dbd2f2d56e4a2c89b55143232506';

  // Make a request to the weather API
  fetch('https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + location)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var temperature = data.current.temp_c;
      var humidity = data.current.humidity;
      var rainfall = data.current.precip_mm;

      // Display the weather information
      document.getElementById('temperature').textContent = temperature + "°C";
      document.getElementById('humidity').textContent = humidity + "%";
      document.getElementById('rainfall').textContent = rainfall + "mm";
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
});


