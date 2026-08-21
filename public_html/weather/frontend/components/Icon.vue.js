const IconProto =
{    
    props: {
        filePath : { 
            type : String,
            default() {return ''}
        },
        imageExplanation: { type: String, default() { return '' } }
    },

    computed: {
        iconUrl() {
            const IconUrlBase = 'https://api.weather.gov'
            return (this.filePath.startsWith(IconUrlBase) ? '' : IconUrlBase) + this.filePath
        }
    },

    template:`
    <img class="img" :src="iconUrl" :title="imageExplanation">`
}