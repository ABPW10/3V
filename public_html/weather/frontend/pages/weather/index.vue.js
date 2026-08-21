const styleIndex=`<style scoped>
  body{
      background-color:#262836;
      
  }
  label{
      color: lightgray;
  }
  #head{
      color: lightgray;
  }
  
  #input{
      padding: 0 10px;
      overflow: hidden
  }
  
  .input{
      padding-right: 10px;
  }
  
  #container{
      columns: 6;
      column-gap: 0;
      padding: 10px 0;
      
      /* text-align: right;
      padding-right: 0%;*/
  }
  .item{
      width: 100%;
      height: 200px;
      overflow: hidden auto;
  }
  .hr-item{
      width: 100%;
      height: auto;
  }
  
  @media (min-width: 1000px){
  #weatherContent{
      columns: 2;
      column-gap: 10px;
  }
  #hrs-container{
      overflow: auto;
      max-height: 867px;
  }
  .hrs-container-s{
      max-height: 851.81px !important;
  }
  #container{
      padding-bottom: 0;
  }
  }
  </style>`
  
  
  const templateIndex=`
  <body>
      <article>
          <section id="input">
              <div>
                  <h2 id="head">
                    <span @click="searchCity = !searchCity">
                      {{ currentInfo.place === '' ? 'Weather' : currentInfo.place }}
                    </span>
                    <span style=float:right>
                      <input type="radio" id="degF" v-model="temperatureUnit" value="F" onchange="setTemperatureUnit(this.value)">
                      <label for="degF">F</label>
                      <input type="radio" id="degC" v-model="temperatureUnit" value="C" onchange="setTemperatureUnit(this.value)">
                      <label for="degC">C</label>
                    </span>
                  </h2>
              </div>
              <div v-if="searchCity" style=margin-bottom:1rem>
                  <span class="input">
                      <label for="cityInput">City: </label>
                      <input id="cityInput" name= "cityInput" v-model="city" placeholder="Enter City"
                          @keyup.enter="getForecast" onfocus="this.select()">
                  </span>
                  <span class="input">
                      <label for="stateInput">State: </label>
                      <select  id="stateInput" name="stateInput" v-model="state">
                          <option value="" hidden disabled selected>Select State</option>
                          <option value="AL">Alabama</option> 
                          <option value="AK">Alaska</option> 
                          <option value="AS">American Samoa</option> 
                          <option value="AZ">Arizona</option> 
                          <option value="AR">Arkansas</option> 
                          <option value="CA">California</option> 
                          <option value="CO">Colorado</option> 
                          <option value="CT">Connecticut</option> 
                          <option value="DE">Delaware</option> 
                          <option value="DC">District of Columbia</option> 
                          <option value="FL">Florida</option> 
                          <option value="GA">Georgia</option> 
                          <option value="GU">Guam</option> 
                          <option value="HA">Hawaii</option> 
                          <option value="ID">Idaho</option> 
                          <option value="IL">Illinois</option> 
                          <option value="IN">Indiana</option> 
                          <option value="IO">Iowa</option> 
                          <option value="KS">Kansas</option> 
                          <option value="KY">Kentucky</option> 
                          <option value="LA">Louisiana</option> 
                          <option value="ME">Maine</option> 
                          <option value="MP">Mariana Islands</option> 
                          <option value="MD">Maryland</option> 
                          <option value="MA">Massachusetts</option> 
                          <option value="MI">Michigan</option> 
                          <option value="MN">Minnesota</option> 
                          <option value="MS">Mississippi</option> 
                          <option value="MO">Missouri</option> 
                          <option value="MT">Montana</option> 
                          <option value="NE">Nebraska</option> 
                          <option value="NV">Nevada</option> 
                          <option value="NH">New Hampshire</option> 
                          <option value="NJ">New Jersey </option> 
                          <option value="NM">New Mexico</option> 
                          <option value="NY">New York</option> 
                          <option value="NC">North Carolina</option> 
                          <option value="ND">North Dakota</option> 
                          <option value="OH">Ohio</option> 
                          <option value="OK">Oklahoma</option> 
                          <option value="OR">Oregon</option> 
                          <option value="PA">Pennsylvania</option> 
                          <option value="PA">Puerto Rico</option> 
                          <option value="RI">Rhode Island</option> 
                          <option value="SC">South Carolina</option> 
                          <option value="SD">South Dakota</option> 
                          <option value="TN">Tennessee</option> 
                          <option value="TX">Texas</option> 
                          <option value="UT">Utah</option> 
                          <option value="VT">Vermont</option> 
                          <option value="VA">Virginia</option> 
                          <option value="VI">Virgin Islands</option> 
                          <option value="WA">Washington</option> 
                          <option value="WV">West Virginia</option> 
                          <option value="WI">Wisconsin</option> 
                          <option value="WY">Wyoming</option> 
                      </select>
                  </span>
                  <span class="input">
                      <label for="zipInput">ZIP: </label>
                      <input id="zipInput" name= "zipInput" v-model="zip" placeholder="Enter ZIP" style="width: 5em;"
                          @keyup.enter="getForecast" onfocus="this.select()">
                  </span>  
                  <span>
                      <button @click="getForecast"> Get Weather</button>
                  </span>
              </div>
          </section>
          <section id="weatherContent">
              
              <TodayWeatherContent v-if="forecast.length > 0" :todayWeather="forecast[0]" :tonightWeather="forecast[1]" :observations="currentInfo.observations" :air="currentInfo.air" />   
              <div id="container">
              
                  <DayWeatherContent class="item" v-for="day in futureFC" v-bind:key="day.number" :WeatherData="day" />
              
              </div>
              <div id="hrs-container" :class="currentInfo.observations?.timestamp ? '' : 'hrs-container-s'">
              
                  <HourWeatherContent class="hr-item" v-for="hour in hourlyForecast" :key="hour.number" :WeatherData="hour"
                      :timeZone="currentInfo.timeZone" />
                  
              </div>
          </section>
      </article>
  </body>
  `
  let setTemperatureUnit;
  const IndexPageProto=
  {
      data() {
          return{
              city: '',
              state: '',
              zip: '',
              forecast: [],
              hourlyForecast: [],
              currentInfo: { place: '', observations: {}, timeZone: '' },
              temperatureUnit: 'F',
              tempUnitRadioBtnLastChangeTime: 0,
              setLocalStorageTimeoutId: 0,
              searchCity: true
          }  
      },
      methods: {
          async getForecast(){
              const storedInfo = JSON.parse(localStorage.getItem(LocalStorageKey))
              if (this.forecast.length > 0 && storedInfo && storedInfo.city && this.city === storedInfo.city
                  && storedInfo.state && this.state === storedInfo.state
                  && storedInfo.zip && this.zip === storedInfo.zip) { return }
              try {
                  this.city = this.city.trim()
                  this.zip = this.zip.trim()
                  if (!this.city == '' || !this.state == '' || !this.zip == '') {
                      const g=this.$axios.get(`/weather/weather?city=${this.city}&state=${this.state}&zip=${this.zip}`);
                      
                      const {data} = (await g.next()).value
                      this.searchCity = false;
                      this.forecast = data.forecast.periods;
                      //console.log(this.forecast);
                      this.hourlyForecast = data.hourlyForecast;
                      this.currentInfo = { 
                          place: `${data.place.text} ${Math.round(data.forecast.elevation.value)} ${data.forecast.elevation.unitCode.split(':').pop()}${data.observations ? ` , Observation Time: ${new Date(data.observations.timestamp).toLocaleString()}` : ''}`,
                          observations: data.observations,
                          timeZone: data.place.timeZone,
                          air:undefined
                      }

                      document.title = data.place.text.substring(0, data.place.text.lastIndexOf('[')) + 'Weather'
                      localStorage.setItem(LocalStorageKey, JSON.stringify({
                          city: this.city, state: this.state, zip: this.zip, unit: storedInfo?.unit
                      }))

                      const allTemperatureCFields = document.getElementsByClassName('temperatureC')
                      for (let temperatureC of allTemperatureCFields){
                        temperatureC.remove()
                      }
                      this.$nextTick(() => { this.assignTemperatureColours();
                      if (this.temperatureUnit === 'C') {  this.switchTemperatureUnit('C')  }})
                      
                      const {air} = (await g.next()).value
                      this.currentInfo.air=air
                  }
              } catch (err) {
                  console.log(err);
                  this.forecast = this.hourlyForecast = [];
                  this.currentInfo = { place: '', observations: {}, timeZone: '' }
                  document.title = 'Weather'
              }
          },
          setTemperatureUnit(unit){
              const moment = Date.now()
              if (this.setLocalStorageTimeoutId !== 0 && moment - this.tempUnitRadioBtnLastChangeTime < 100) {
                  clearTimeout(this.setLocalStorageTimeoutId)
              }
              this.tempUnitRadioBtnLastChangeTime = moment
              this.setLocalStorageTimeoutId = setTimeout(() => {
                  const storedInfo = JSON.parse(localStorage.getItem(LocalStorageKey))
                  if (storedInfo?.unit === unit) { return }
                  localStorage.setItem(LocalStorageKey, JSON.stringify({
                      city: storedInfo?.city, state: storedInfo?.state, zip: storedInfo?.zip, unit
                  }))
              }, 100)
              this.switchTemperatureUnit(unit)
          },
          switchTemperatureUnit(unit){
              const allTemperatureFields = document.getElementsByClassName('temperature')
              for (let temperatureField of allTemperatureFields) {
                  if (temperatureField.innerHTML === 'F' || temperatureField.innerHTML === 'C') {
                      temperatureField.innerHTML = unit; continue;
                  }
                  if (unit === 'C') {
                      let temperatureNewValue;
                      if (temperatureField.nextElementSibling?.classList.contains('temperatureC')) {
                          temperatureNewValue = temperatureField.nextElementSibling.remove();
                      }
                          temperatureNewValue = temperatureField.cloneNode();
                          temperatureNewValue.classList.remove('temperature')
                          temperatureNewValue.classList.add('temperatureC')
                      
                      temperatureNewValue.innerHTML = Math.round(5/9.0*(temperatureField.innerHTML - 32))
                      if (temperatureField.style.display = 'none') {
                          temperatureNewValue.style.removeProperty('display')
                      } else {
                          temperatureField.style.display = 'none';
                      }
                      temperatureField.insertAdjacentElement('afterend', temperatureNewValue);
                  } else {
                      temperatureField.nextElementSibling.remove()
                      if (temperatureField.style.display = 'none') {
                          temperatureField.style.removeProperty('display')
                      }
                  }
              }
          },
          assignTemperatureColours(){
              const allTemperatureFields = document.getElementsByClassName('temperature')
              for (let i = 0; i < allTemperatureFields.length; i++) {
                  const temperatureField = allTemperatureFields[i];
                  const temperatureValue = temperatureField.innerHTML;
                  if (!isNaN(parseFloat(temperatureField.innerHTML))) {
                      temperatureField.style.color = this.getColourFromValue(temperatureValue)
                  }
              }
          },
          getColourFromValue(t){
              const colourValues = [
                  [-13,   0,  0,  139],
                  [5,     0,  0,  255],
                  [23,    173,216,230],
                  [41,    144,238,144],
                  [60,    247,247,103],
                  [82.5,  255,165,0],
                  [107.5, 255,0,  0]
              ]
              for (let i = 0; i < colourValues.length; i++ ) {
                if (i === 0 && t <= colourValues[i][0]) {
                  return `rgb(${colourValues[i].slice(1).map(v => v)})`;
                } else if (i > 0 && t <= colourValues[i][0] && t > colourValues[i - 1][0]) {
                  const coef = (t - colourValues[i - 1][0])/(colourValues[i][0] - colourValues[i - 1][0])
                  const r = Math.round(colourValues[i - 1][1] + coef*(colourValues[i][1] - colourValues[i - 1][1]))
                  const g = Math.round(colourValues[i - 1][2] + coef*(colourValues[i][2] - colourValues[i - 1][2]))
                  const b = Math.round(colourValues[i - 1][3] + coef*(colourValues[i][3] - colourValues[i - 1][3]))
                  return `rgb(${r},${g},${b})`;
                } else if (i === colourValues.length - 1 && t > colourValues[i][0]) {
                  return `rgb(${colourValues[i].slice(1).map(v => v)})`;
                }
              }
          },
          passCurrentWeather(){
              if(!_.isEmpty(this.forecast)){
                  const data = {
                      todayWeather: this.forecast[0],
                      tonightWeather: this.forecast[1]
                  }
                  return data;
              }
              return null;
          },
          inputCity(c){
              this.city = c.target.value;
          },
          inputState(s){
              this.state = s.target.value;
          },
          inputZip(z){
              this.zip = z.target.value;
          },
          async onMount()
          {            
              console.log(this.city + ', ' + this.state + ', ' + this.zip);
              if (!this.city == '' || !this.state == '' || !this.zip == '') {
                  console.log('Hit in if');
                  const {data} = await this.$axios.get(`/weather/weather?city=${this.city}&state=${this.state}&zip=${this.zip}`);
                  this.forecast = data.forecast.periods;
                  console.log(this.forecast);
              }
          }
      },
      mounted(){
          const storedInfo = JSON.parse(localStorage.getItem(LocalStorageKey));
          if(storedInfo?.city) { this.city = storedInfo.city }
          if(storedInfo?.state) { this.state = storedInfo.state }
          if(storedInfo?.zip) { this.zip = storedInfo.zip }
          if(storedInfo?.unit) { this.temperatureUnit = storedInfo.unit }
          this.getForecast()
          setTemperatureUnit = this.setTemperatureUnit;
      },
      computed: {
          futureFC(){
              let ffc = Array.from(this.forecast);
              ffc.shift();
              ffc.shift();
              return ffc;
          }
      },
      template:templateIndex
  }