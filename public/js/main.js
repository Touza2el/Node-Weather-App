const searchForm = document.querySelector('.search-form');
const inputSearch = document.querySelector('.input-search');
const messageOne = document.querySelector('.message-1');
const messageTwo = document.querySelector('.message-2');
const messageThree = document.querySelector('.message-3');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = inputSearch.value;

  messageOne.textContent = 'Loading ...';
  messageTwo.textContent = '';
  messageThree.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      const { error } = data;
      if (error) {
        return (messageOne.textContent = error);
      } else {
        const { address, location, forecast } = data;
        messageOne.textContent = address;
        messageTwo.textContent = location;
        messageThree.textContent = forecast;
      }
    });
  });
  inputSearch.value = '';
});
