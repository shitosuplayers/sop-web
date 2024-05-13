// Fetch JSON data from the file path
fetch('/data/events.json')
  .then(response => response.json())
  .then(data => {
    // Iterate over each event in the JSON data
    data.events.forEach(event => {
      // Create event container element
      const eventContainer = document.createElement('div');
      eventContainer.classList.add('event');

      // Create cover element and set background image
      const cover = document.createElement('div');
      cover.classList.add('cover');
      cover.style.backgroundImage = `url(${event.cover_image_url})`;
      cover.textContent = event.id.replace(/_/g, ' '); // Replace underscore with space
      eventContainer.appendChild(cover);

      // Create info container element
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('info-container');

      // Create date element
      const date = document.createElement('div');
      date.classList.add('date');
      date.textContent = event.date || 'Date TBD'; // Set date or placeholder if date is unknown
      infoContainer.appendChild(date);

      // Create status element
      const status = document.createElement('div');
      status.classList.add('status');
      status.textContent = event.status;
      infoContainer.appendChild(status);

      eventContainer.appendChild(infoContainer);

      // Append event container to the main section
      document.querySelector('main').appendChild(eventContainer);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
