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
      type = 'running';
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
      type = 'cycling';
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


const form = document.querySelector('form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class App {

      #map;
      #mapEvent;
      #workouts = [];

      constructor() {
            this._getposition();
            form.addEventListener('keypress', this._newWorkout.bind(this))
            inputType.addEventListener('change', this._toggleElevation)
      }

      _getposition() {
            if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(this._loadmap.bind(this), function () {
                        alert('Kindly On your location');
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
            inputDistance.focus()
            this.#mapEvent = mapE;
            form.classList.remove('hidden')
      }

      _toggleElevation() {
            inputElevation.closest('.form__row').classList.toggle('hidden__input')
            inputCadence.closest('.form__row').classList.toggle('hidden__input')
      }

      _newWorkout(e) {
            // const validation = (...inputs) => inputs.every(inp => Number.isFinite(inp));
            // const allpositive = (...inputs) => inputs.every(inp => inp < 0);

            // Get Data From user
            const type = inputType.value;
            const Distance = +inputDistance.value;
            const Duration = +inputDuration.value;
            const { lat, lng } = this.#mapEvent.latlng;
            let workout;

            //if it is runing then, creat runing objcet
            if (type === 'Running') {

                  const cadence = +inputCadence.value;
                  if (!Number.isFinite(Distance) || !Number.isFinite(Duration) || !Number.isFinite(cadence) || Number(cadence) < 0 || Number(Distance) < 0 || Number(Duration) < 0) {
                        return alert('Enter valid positive Number!!!');
                  }

                  workout = new Running([lat, lng], Distance, Duration, cadence);

            }

            // if it is cycaling then, creat cycaling objcet
            if (type === 'cycaling') {

                  const Elevation = +inputElevation.value;

                  if (!Number.isFinite(Distance) || !Number.isFinite(Duration) || !Number.isFinite(Elevation) || Number(Distance) < 0 || Number(Duration) < 0) {
                        return alert('Enter valid positive Number!!!');
                  }
                  workout = new Cycling([lat, lng], Distance, Duration, Elevation);
            }


            //add new object in workout array
            console.log(workout);
            this.#workouts.push(workout);

            //rander workout on map  as marker
            if (e.key == 'Enter') {
                  form.classList.add('hidden')
                  L.marker(workout.coords).addTo(this.#map)
                        .bindPopup(
                              L.popup({
                                    maxwidth: 250,
                                    minwidth: 100,
                                    autoClose: false,
                                    closeOnClick: false,
                                    className: `${workout.type}-popup`,

                              }),
                        ).setPopupContent('workout!!!')
                        .openPopup();
                  //reabder work out as list


                  //hide form + clean
                  inputCadence.value = inputDuration.value = inputElevation.value = inputDistance.value = ''
            }
      }
}

const app = new App