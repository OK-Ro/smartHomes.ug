// Function to hide the container
const hideContainer = () => {
  container.style.display = 'none';
};

// Function to handle click on menu items
const handleMenuItemClick = (event) => {
  event.preventDefault();

  const targetSectionId = this.getAttribute('href').substring(1);
  const targetSection = document.getElementById(targetSectionId);
  const headerOffset = 50; // Change this value based on your header's height
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

const checkbox = document.getElementById('checkbox');
const container = document.querySelector('.container');
const menuItems = document.querySelectorAll('#menu li a');
const contactForm = document.querySelector('.form');

// Add click event listener to the checkbox
checkbox.addEventListener('click', function() {
  if (this.checked) {
    container.style.display = 'flex';
  } else {
    container.style.display = 'none';
  }
});

// Add click event listeners to menu items based on screen size
menuItems.forEach((menuItem) => {
  if (window.matchMedia('(max-width: 768px)').matches) {
    menuItem.addEventListener('click', handleMenuItemClick);
  } else {
    // If not a small screen, remove the event listener
    menuItem.removeEventListener('click', handleMenuItemClick);
  }
});

const form = document.querySelector('.form');
const confirmationMessage = document.getElementById('confirmation-message');

// Event listener for contact form submission
form.addEventListener('submit', async (event) => {
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
});

const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const newsletterConfirmationMessage = document.getElementById('confirmationMessage');

// Event listener for newsletter form submission
newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value;
  if (isValidEmail(email)) {
    displayConfirmationMessage();
  } else {
    alert('Please enter a valid email address.');
  }
});

// Function to display the confirmation message for newsletter form
function displayConfirmationMessage() {
  newsletterForm.reset();
  newsletterConfirmationMessage.style.display = 'block';
  setTimeout(() => {
    newsletterConfirmationMessage.style.display = 'none';
  }, 3000); // Hide the confirmation message after 3 seconds (you can adjust the time as needed)
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const whatsappPopup = document.getElementById("whatsappPopup");
    whatsappPopup.style.display = "block";

    // Play the notification sound
    const notificationSound = document.getElementById("notificationSound");
    notificationSound.play();
  }, 2000);
});


const currentYear = new Date().getFullYear();
const copyrightElement = document.getElementById('copyright');
copyrightElement.textContent = `© ${currentYear} smart homes Ug, all rights reserved`;
