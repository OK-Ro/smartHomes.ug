// Function to hide the container
const hideContainer = () => {
  container.style.display = 'none';
};

// Function to handle click on menu items
const handleMenuItemClick = (event) => {
  event.preventDefault();

  const targetSectionId = event.currentTarget.getAttribute('href').substring(1);
  const targetSection = document.getElementById(targetSectionId);
  const headerOffset = 520; // Change this value based on your header's height
  const elementPosition = targetSection.getBoundingClientRect().top;
  const offsetPosition = elementPosition - headerOffset;

  window.scrollBy({
    top: offsetPosition,
    behavior: 'smooth'
  });


  // Hide the container after clicking a menu item on small screens
  if (window.matchMedia('(max-width: 768px)').matches) {
    hideContainer();
  }
};

// Function to handle checkbox click
const handleCheckboxClick = () => {
  container.style.display = checkbox.checked ? 'flex' : 'none';
};

// Function to handle contact form submission
const handleFormSubmit = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(form);
  const url = 'https://formspree.io/f/mqkvaqbo';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (response.ok) {
      form.reset();
      confirmationMessage.style.display = 'block';

      // Hide the confirmation message after 3 seconds (adjust the duration as needed)
      setTimeout(() => {
        confirmationMessage.style.display = 'none';
      }, 3000);
    } else {
      throw new Error('Failed to send the message.');
    }
  } catch (error) {
    console.error(error);
    // You can display an error message here if needed.
  }

  return false; // Return false to prevent the default form submission
};

// Function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Event listeners
const checkbox = document.getElementById('checkbox');
const container = document.querySelector('.container');
const menuItems = document.querySelectorAll('#menu li a');
const form = document.querySelector('.form');
const confirmationMessage = document.getElementById('confirmation-message');

checkbox.addEventListener('click', handleCheckboxClick);

menuItems.forEach((menuItem) => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    menuItem.addEventListener('click', handleMenuItemClick);
  } else {
    menuItem.removeEventListener('click', handleMenuItemClick);
  }
});

form.addEventListener('submit', handleFormSubmit);

// DOMContentLoaded event listener for other actions
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const whatsappPopup = document.getElementById("whatsappPopup");
    whatsappPopup.style.display = "block";

    // Play the notification sound
    const notificationSound = document.getElementById("notificationSound");
    notificationSound.play();
  }, 2000);
});

// Copyright notice
const currentYear = new Date().getFullYear();
const copyrightElement = document.getElementById('copyright');
copyrightElement.textContent = `© ${currentYear} smart homes Ug, all rights reserved`;

function showAboutSection() {
  console.log("About Us menu item clicked!"); // Add this line to log a message
  
  // Hide the Home section
  var homeSection = document.getElementById("home");
  if (homeSection) {
      homeSection.style.display = 'none';
  }
  
  // Display the About Us section
  var aboutSection = document.getElementById("about");
  if (aboutSection) {
      aboutSection.style.display = 'block';
  }
  
}


function showServicesSection() {
  console.log("Services menu item clicked!"); // Log a message
  
  // Hide the other sections
  var homeSection = document.getElementById("home");
  var aboutSection = document.getElementById("about");
  var clientsSection = document.getElementById("clients");
  if (homeSection) {
      homeSection.style.display = 'none';
  }
  if (aboutSection) {
      aboutSection.style.display = 'none';
  }
  if (clientsSection) {
      clientsSection.style.display = 'none';
  }
  
  // Display the Services section
  var servicesSection = document.getElementById("serv");
  if (servicesSection) {
      servicesSection.style.display = 'block';
  }
}

function showClientsSection() {
  console.log("Clients menu item clicked!"); // Log a message
  
  // Hide the other sections
  var homeSection = document.getElementById("home");
  var aboutSection = document.getElementById("about");
  var servicesSection = document.getElementById("serv");
  if (homeSection) {
      homeSection.style.display = 'none';
  }
  if (aboutSection) {
      aboutSection.style.display = 'none';
  }
  if (servicesSection) {
      servicesSection.style.display = 'none';
  }
  
  // Display the Clients section
  var clientsSection = document.getElementById("clients");
  if (clientsSection) {
      clientsSection.style.display = 'block';
  }
}

function showHomeSection() {
  console.log("Home menu item clicked!"); // Log a message
  
  // Hide the other sections
  var aboutSection = document.getElementById("about");
  var servicesSection = document.getElementById("serv");
  var clientsSection = document.getElementById("clients");
  
  // Display the Home section
  var homeSection = document.getElementById("home");
  if (homeSection) {
    homeSection.style.display = 'block';
  }
  
  // Hide the other sections
  if (aboutSection) {
    aboutSection.style.display = 'none';
  }
  if (servicesSection) {
    servicesSection.style.display = 'none';
  }
  if (clientsSection) {
    clientsSection.style.display = 'none';
  }
}


document.addEventListener("DOMContentLoaded", function() {
  var videos = document.querySelectorAll("video");

  videos.forEach(function(video) {
      video.addEventListener("ended", function() {
          this.currentTime = 0;
          this.play();
      });
  });
});
