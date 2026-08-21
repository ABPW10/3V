const HourWeatherContentProto =
{    
    props: {
        WeatherData : { 
            type : Object,
            default(rawData) {return {}}
        },
        timeZone: { type: String, default() { return Intl.DateTimeFormat().resolvedOptions().timeZone } }
    },




    template:`
    <div :class="WeatherData.isDaytime?'day':'night'" >
        <table style=width:100%;text-align:center;border-spacing:0>
            <tr>
                <td style=width:30%><strong>{{ new Date(WeatherData.startTime).toLocaleTimeString(undefined, { hour:'numeric', timeZone }) }}</strong></td>
                <td style=width:35%><Icon :filePath="WeatherData.icon.replace(',0','')" :imageExplanation="WeatherData.shortForecast" /></td>
                <td style=width:35% class="temperature">{{WeatherData.temperature}}</td>
            </tr>
        </table>
    </div>`
}