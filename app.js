const checkbox = document.getElementById('checkbox');
const container = document.querySelector('.container');

checkbox.addEventListener('click', function() {
  if (this.checked) {
    container.style.display = 'flex';
  } else {
    container.style.display = 'none';
  }
});
