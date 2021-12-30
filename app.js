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


class workout {
      date = new Date()
      id = (Date.now() + ' ').slice(-10)
      constructor(coords, distance, duration) {
            this.coords = coords;
            this.distance = distance;
            this.duration = duration;
      }
}
class Running extends workout {
      constructor(coords, distance, duration, cadence) {
            super(coords, distance, duration, cadence)

            this.cadence = cadence;
            this.calcpase();
      }
      calcpase() {
            this.pace = this.duration / this.distance;
            return this.pace;
      }
};

class Cycling extends workout {
      constructor(coords, distance, duration, Elevation) {
            super(coords, distance, duration, Elevation)
            // super
            this.Elevation = Elevation;
            this.calcspeed();
      }
      calcspeed() {
            this.speed = this.distance / (this.duration / 60);
            return this.speed;
      }
}

const r1 = new Running([39, -12], 5.2, 24, 122);
const c1 = new Cycling([39, -12], 55, 24, 422);
console.log(r1, c1);


////////////////
// Application
class App {

      #map;
      #mapEvent;

      constructor() {
            this._getposition();
            form.addEventListener('keypress', this._newWorkout.bind(this))
            inputType.addEventListener('change', this._toggleElevation)
      }

      _getposition() {
            if (navigator.geolocation) {

                  navigator.geolocation.getCurrentPosition(this._loadmap.bind(this), function () {
                        onsole.log('Your Location Is Not On!!!');
                  })

            }
      };

      _loadmap(position) {
            const { latitude } = position.coords;
            const { longitude } = position.coords
            const coords = [latitude, longitude];
            this.#map = L.map('map').setView(coords, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map)

            this.#map.on('click', this._showForm.bind(this))
      };

      _showForm(mapE) {
            this.#mapEvent = mapE;
            inputDistance.focus()
            form.classList.remove('hidden')
      }

      _toggleElevation() {
            inputElevation.closest('.form__row').classList.toggle('hidden__input')
            inputCadence.closest('.form__row').classList.toggle('hidden__input')
      }

      _newWorkout(e) {
            if (e.key == 'Enter') {
                  form.classList.add('hidden')
                  const { lat, lng } = this.#mapEvent.latlng
                  L.marker([lat, lng]).addTo(this.#map)
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
                  inputCadence.value = inputDuration.value = inputElevation.value = inputDistance.value = ''
            }
      }
}

const app = new App()