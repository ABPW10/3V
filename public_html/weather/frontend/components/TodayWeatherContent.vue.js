const TodayWeatherContentProto =
{
    css: [
         '~/assets/css/TodayWeatherSS'
    ],
    props: {
        todayWeather: {
            type : Object,
            default(rawProps) { return { msg: ''}}
        },
        tonightWeather: {
            type : Object,
            default(rawProps) { return { msg: ''}}
        },
        observations: {
            type : Object,
            default(rawProps) { return { msg: ''}}
        },
        air: {
            type : Object,
            default(rawProps) { return { msg: ''}}
        }
    },

    computed:{aqiColour(){
      const n=this.air.aqi
      if(n>=0){
        if(n<=50){return 'lime'}
        else if(n<=100){return 'gold'}
        else if(n<=150){return '#ff6b00'}
        else if(n<=200){return 'red'}
        else if(n<=250){return 'maroon'}
        else if(n<=300){return 'purple'}
        else{return 'black'}
      }}},

    template:`
<section>
    <div class="container">
        <img :src="observations.icon" :title="observations.textDescription" style="float: left;">
        <div :class="observations.timestamp ? 'head-expand' : 'head'">
            <h2><span v-if="observations.timestamp">
                {{ observations.textDescription }}
                <span class="temperature">{{ Math.round(1.8 * observations.temperature.value + 32) }}</span>
                <span class="temperature">F</span></span>
                <span v-else> Weather: </span>
                <span style="float: right;">
                    <div style="display: inline-block; position: relative; text-align: center;">
                        <span v-if="air.aqi" :style="\`background: \${aqiColour}; border-radius: 16px; color: white; min-width: 32px; display: block; line-height: 1.3; padding: 1px;\`">{{ air.aqi }}</span>
                        <span v-if="air.maxPollutant" style="font-size: small; position: absolute; left: 50%; bottom: 0; transform: translate(-50%, 87.5%); line-height: normal;">{{ \`\${air.maxPollutant}\` }}</span>
                    </div>
                    <span :style="\`color: \${aqiColour};\`">{{ air.aqiDescription }}</span>
                </span></h2>
        </div>
        <div id="content" style="clear: left;">
            <div :class="(todayWeather.isDaytime?'TodayColumn':'TonightColumn') + (observations.timestamp?' compact':'')">
                <h3 > {{todayWeather.name}}: </h3>
                <Icon :filePath="todayWeather.icon" :imageExplanation="todayWeather.shortForecast" />
                <p class="temperature" style=display:none>{{ todayWeather.temperature }}</p>
                <p v-if="todayWeather !== { msg: ''}">{{todayWeather.detailedForecast}}</p>
            </div>

            <div :class="(tonightWeather.isDaytime?'TodayColumn':'TonightColumn') + (observations.timestamp?' compact':'')">
                <h3> {{tonightWeather.name}}: </h3>
                <Icon :filePath="tonightWeather.icon" :imageExplanation="tonightWeather.shortForecast" />
                <p class="temperature" style=display:none>{{ tonightWeather.temperature }}</p>
                <p v-if="tonightWeather !== { msg: ''}">{{tonightWeather.detailedForecast}}</p>      
            </div>
        </div>
    </div>
</section>
`
}