const DayWeatherContentProto =
{
    style: [
        "~/assets/css/DayWeatherSS"
    ],
    
    props: {
        WeatherData : { 
            type : Object,
            default(rawData) {return {}}
        }
    },




    template:`
        <div class="day" v-if="!WeatherData.name.includes('Night')">
            <p class="periodTitle"><strong>{{WeatherData.name}}: </strong></p>
            <Icon :filePath="WeatherData.icon" :imageExplanation="WeatherData.detailedForecast" />
            <p class="temperature">{{WeatherData.temperature}}</p>
        </div>
        <div class="night" v-else>
            <p class="periodTitle"><strong>{{WeatherData.name}}: </strong></p>
            <Icon :filePath="WeatherData.icon" :imageExplanation="WeatherData.detailedForecast" />
            <p class="temperature">{{WeatherData.temperature}}</p>
        </div>
`
}