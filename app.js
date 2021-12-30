const months = ['January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'];

const form = document.querySelector('form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map;
let mapEvent;
if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function (position) {

            const { latitude } = position.coords;
            const { longitude } = position.coords;

            console.log(`https: //www.google.com/maps/@${latitude},${longitude}`);
            console.log(latitude, longitude);

            const coords = [latitude, longitude];

            map = L.map('map').setView(coords, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);


            map.on('click', function (mapE) {
                  mapEvent = mapE;
                  inputDistance.focus()
                  form.classList.remove('hidden')



            });
      },
            function () {
                  alert('your location is not Avtive!!!')
            });
}

form.addEventListener('keypress', function (e) {
      if (e.key == 'Enter') {
            form.classList.add('hidden')
            const { lat, lng } = mapEvent.latlng
            L.marker([lat, lng]).addTo(map)
                  .bindPopup(
                        L.popup({
                              maxwidth: 250,
                              minwidth: 100,
                              autoClose: false,
                              closeOnClick: false,
                              className: 'running-popup',

                        }),
                  ).setPopupContent('workout!!!')
                  .openPopup();
            inputCadence.value = inputDuration.value = inputElevation.value = inputDistance.value = '';
      }
});

inputType.addEventListener('change', function () {

      inputElevation.closest('.form__row').classList.toggle('hidden__input');
      inputCadence.closest('.form__row').classList.toggle('hidden__input');

});