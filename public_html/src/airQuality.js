function parseMultiJson(txtData){
            const result={}
            let lastVar;
            for(let searchPosition=0;searchPosition<txtData.length;){
              let firstVar=txtData.indexOf('var',searchPosition)
              if(firstVar===-1){
                firstVar=txtData.length
              }
              searchPosition=firstVar+'var'.length
              let textIndex
              for(textIndex=firstVar-1;textIndex>=0&&/\s/.test(txtData[textIndex]);textIndex--){}
              if(textIndex<0||txtData[textIndex]===';'||firstVar===txtData.length){
                if(lastVar!==undefined){
                  const afterLastVar=lastVar+'var'.length
                  const firstEqualSign=txtData.indexOf('=',afterLastVar)
                  result[txtData.substring(afterLastVar,firstEqualSign).trim()]=JSON.parse(txtData.substring(firstEqualSign+1,firstVar===txtData.length&&txtData[textIndex]!==';'&&!txtData.substr(textIndex+1).trim()?undefined:textIndex))
                }
                lastVar=firstVar;
              }
            }
            return result
}

const getAirData = async() => {
  try{res=await post('https://air.cnemc.cn:18007/HourChangesPublish/GetAllAQIPublishLive')}catch(e){
      res=await post('https://air.cnemc.cn:18007/HourChangesPublish/GetAllAQIPublishLive')
  }console.log(res)
  return res
}

const getAirDataFromHistory = async() => {
  const mostRecentTime=new Date(now)
  mostRecentTime.setUTCHours(mostRecentTime.getUTCHours()-(mostRecentTime.getUTCMinutes()>20?0:1),0,0,0)
  const timeFormat=(new Date(mostRecentTime.getTime()+8*60*60000)).toISOString().substr(0,19).replace('T',' ')
  const loc='https://air.cnemc.cn:18007/HourChangesPublish/GetAQIHistoryByConditionHis?date='+timeFormat
  try{res=await post(loc)}catch(e){
      res=await post(loc)
  }
  return res
}

function calculateUSAPM25Index(concentration){
  if(concentration<=0){return}
  const NLevels=6
  const PM25Levels=[0,9,35,55,125,225,500]
  const IndexLevels=[0,50,100,150,200,300,500]
  for(let i=0;i<NLevels;i++){
    if(concentration>PM25Levels[i]&&concentration<=PM25Levels[i+1]){
      return Math.round(IndexLevels[i]+(concentration-PM25Levels[i])/(PM25Levels[i+1]-PM25Levels[i])*(IndexLevels[i+1]-IndexLevels[i]))
    }
  }
  return IndexLevels.pop()
}

function calculatePollutantIndex(concentration,pollutant){
  if(concentration<=0){return}
  const NLevels=7
  const PollutantScale={
    SO2:[0,50,150,475,800,1600,2100,2620],
    NO2:[0,40,80,180,280,565,750,940],
    PM10:[0,50,150,250,350,420,500,600],
    CO:[0,2,4,14,24,36,48,60],
    O3:[0,100,160,215,265,800,1000,1200]
  }
  const IndexLevels=[0,50,100,150,200,300,400,500]
  for(let i=0;i<NLevels;i++){
    if(concentration>PollutantScale[pollutant][i]&&concentration<=PollutantScale[pollutant][i+1]){
      return Math.round(IndexLevels[i]+(concentration-PollutantScale[pollutant][i])/(PollutantScale[pollutant][i+1]-PollutantScale[pollutant][i])*(IndexLevels[i+1]-IndexLevels[i]))
    }
  }
  return IndexLevels.pop()
}

function calculateHongKongAQI(HKStation){
  const live=HKStation.data.reduce((hrFormer,hrLatter)=>new Date(hrFormer.DateTime)>new Date(hrLatter.DateTime)?hrFormer:hrLatter,{DateTime:0})
  let pm25=live.PM25==='-'?-1:calculateUSAPM25Index(live.PM25)
  let pm10=live.PM10==='-'?-1:calculatePollutantIndex(live.PM10,'PM10')
  let SO2=live.SO2==='-'?-1:calculatePollutantIndex(live.SO2,'SO2')
  let NO2=live.NO2==='-'?-1:calculatePollutantIndex(live.NO2,'NO2')
  let O3=live.O3==='-'?-1:calculatePollutantIndex(live.O3,'O3')
  let AQI=Math.max(pm25,pm10,SO2,NO2,O3)
  return{
    Latitude:HKStation.location.latitude,
    Longitude:HKStation.location.longitude,
    AQI,
    PM25:live.PM25,
    PM25IsMaxPollution: AQI===pm25
  }
}

const CityIdentifierType={Name:0,AD:1}
const combineStationsByCity=(stationCollection,timeLimit=undefined,idType=CityIdentifierType.AD)=>{
  let citiesToData={}
  const CQStationGroups=(lat,lng)=>{
    if(lng>107.25&&lat>=29.75||lng>107&&lat<29.75){
      if(lat>30){return '万州'}
      else if(lng<108){return '涪陵'}
      else{return '黔江'}
    }else{return undefined}
  }
  const corrections={'3216A':{Longitude: "117.6622"}}
  for(let stationAir of stationCollection){
    if(timeLimit&&now-stationAir.TimePoint.replace('/Date(','').replace(')/','')>86400000){continue}
    let correctionsForStation;
    if(correctionsForStation=corrections[stationAir.StationCode]){
      for(const [key,value] of Object.entries(correctionsForStation)){
        stationAir[key]=value
      }
    }
    let groupKey=idType==CityIdentifierType.AD?
        `${stationAir.CityCode}`.substr(0,2)==='50'?CQStationGroups(stationAir.Latitude,stationAir.Longitude)??stationAir.CityCode:stationAir.CityCode
        :stationAir.Area==='重庆市'?CQStationGroups(stationAir.Latitude,stationAir.Longitude)??stationAir.Area:stationAir.Area
    let cityData
    if(!(cityData=citiesToData[groupKey])){
      cityData=citiesToData[groupKey]=[]
    }
    cityData.push({
      lat:stationAir.Latitude,
      lon:stationAir.Longitude,
      AQI:stationAir.AQI,
      PM25:stationAir.PM2_5
    })
  }
  return citiesToData
}

const getAirPollutionList=(callBack,airLayer) => {
  getAirData().then(async airResponse=>{
  let aqisByCity
  if(airResponse instanceof Array){aqisByCity=getAQIsByCity(combineStationsByCity(airResponse));}
  if(!aqisByCity||aqisByCity.length===0){
    airResponse=await getAirDataFromHistory()
    aqisByCity=getAQIsByCity(combineStationsByCity(airResponse,true,CityIdentifierType.Name))
  }
  for(let city of aqisByCity){
    callBack(city,airLayer)
  }
  })
  /*getSanshaAir().then(sanshaAirResponseData=>{
  const citiesToData={}
  if(sanshaAirResponseData){
    let sanshaCityData
    if(!(sanshaCityData=citiesToData['三沙'])){
      sanshaCityData=citiesToData['三沙']=[]
    }
    sanshaCityData.push(sanshaAirResponseData)
  }
  for(let city of getAQIsByCity(citiesToData)){
    callBack(city,airLayer)
  }
  })*/
  /*get('https://t8dqflx6ec.execute-api.us-west-2.amazonaws.com/api/v1/current-pollutants?country_id=3').then(awsAirResponse=>{
  const citiesToData={}
  const groups=['臺北市','臺中市','高雄市']
  for(let station of awsAirResponse.data) {
    if(!station.area.zh){continue}
    let groupKey
    if(!groups.includes(groupKey=station.additional_info.county.zh)){continue}
    let AQI=station.AQI
    let PM25=station.pm25
    let cityData
    if(!(cityData=citiesToData[groupKey])){
      cityData=citiesToData[groupKey]=[]
    }
    cityData.push({
      lat:station.lat,
      lon:station.lon,
      AQI,
      PM25
    })
  }
  for(let city of getAQIsByCity(citiesToData)){
    callBack(city,airLayer)
  }
  })*/
  fetch('http://homeustc.serv00.net/meAir/?url=https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=05c52d90-9a68-49cf-99d7-955d5247c0de').then(r=>r.json()).then(moeAirResponse=>{
  const citiesToData={}
  const groups=['臺北市','臺中市','高雄市']
  for(let station of moeAirResponse.records??moeAirResponse) {
    let groupKey
    if(!groups.includes(groupKey=station.county)){continue}
    let AQI=station.aqi
    let PM25=station["pm2.5"]
    let cityData
    if(!(cityData=citiesToData[groupKey])){
      cityData=citiesToData[groupKey]=[]
    }
    cityData.push({
      lat:station.latitude,
      lon:station.longitude,
      AQI,
      PM25
    })
  }
  for(let city of getAQIsByCity(citiesToData)){
    callBack(city,airLayer)
  }
  })
/*;(async()=>{const w123AirResponse=await(await fetch('http://corsproxy.io/?url=https://weather123.com.tw/getair')).text()
const ntuAirLocationsResponse=await(await fetch('http://corsproxy.io/?url=https://envecon.cloud.ntu.edu.tw/api/stations')).json()
let airList
for(let station in airList=sortW123Data(ntuAirLocationsResponse,w123AirResponse)){
  let airPoint
  if(airList[station].点){airPoint={}
  airPoint={名称:station,AQI:airList[station]['AQI'],PM25:airList[station]['PM25'],纬度:airList[station].点[0],经度:airList[station].点[1]}}
}})()
const sortW123Data=(locations,airs)=>{
const docParser=new DOMParser()

airDoc=docParser.parseFromString(airs,'text/html')
const aqiTab=airDoc.getElementById('view1')
const pm25Tab=airDoc.getElementById('view2')
const pm10Tab=airDoc.getElementById('view3')
const o3Tab=airDoc.getElementById('view4')
const airCollection={}
if(aqiTab){
  storeTableData(aqiTab,'AQI',airCollection)
}
if(pm25Tab){
  storeTableData(pm25Tab,'PM25',airCollection)
}

function storeTableData(tableElement,dataDescription,desitination){
  for(let station of tableElement.querySelectorAll('tr')){
    let items=station.querySelectorAll('td')
    if(items.length===5){
      let storageKey=`${items[2].innerHTML} ${items[1].innerHTML}`.replaceAll('（','(').replaceAll('）',')')
      if(!desitination[storageKey]){
        desitination[storageKey]={}
      }
      desitination[storageKey][dataDescription]=items[3].innerHTML
    }
  }
}

let coordinates={}
for(let station of locations){
  coordinates[station.device.replaceAll('（','(').replaceAll('）',')')]=[station.latitude,station.longitude]
}

for(let station in airCollection){
  let [cityName,stationName]=station.split(' ')
  let stationNameOnly=stationName.substring(stationName.indexOf('(')+1,stationName.indexOf(')'))
  if(coordinates[station]||coordinates[stationName]||coordinates[`${cityName} ${stationNameOnly}`]){
    airCollection[station]['点']=coordinates[station]??coordinates[stationName]??coordinates[`${cityName} ${stationNameOnly}`]
  }
}
return airCollection
}*/
  get('https://www.aqhi.gov.hk/js/data/past_24_pollutant.js'/*,{headers:{"Accept-Language":"zh-CN"}}*/).then(hkAirResponse=>{
  fetch('https://portal.csdi.gov.hk/server/services/common/epd_rcd_1633316466897_94368/MapServer/WFSServer?service=wfs&request=GetFeature&typenames=aqmn&outputFormat=geojson').then(r=>r.json()).then(hkStationLocationResponse=>{
  const past24hAir=parseMultiJson(hkAirResponse).station_24_data
  hkAirResponse={stations:past24hAir.map(s=>({data:s}))}
  const citiesToData={}
  for(let hkStation of hkAirResponse.stations){
    hkStation.location=hkStationLocationResponse.features.find(f=>f.properties.FacilityName_tc.startsWith(hkStation.data[0].StationNameCT)).properties
    let hkAQI=calculateHongKongAQI(hkStation)
    let cityData
    if(!(cityData=citiesToData['香港'])){
      cityData=citiesToData['香港']=[]
    }
    cityData.push({
      lat:hkAQI.Latitude,
      lon:hkAQI.Longitude,
      AQI:hkAQI.AQI,
      PM25:hkAQI.PM25
    })
  }
  for(let city of getAQIsByCity(citiesToData)){
    callBack(city,airLayer)
  }
  })
  })
  function getAQIsByCity(citiesToData){
  let cityAQIsWithUSAPM25=[]
  for(let [cityId,stationsByCity] of Object.entries(citiesToData)){
    let avgLat=0,avgLon=0,avgAQI=0,avgPM25=0;
    let cntLoc=0,cntAQI=0,cntPM25=0;
    for(let station of stationsByCity){
      const isNotNumber=literal=>typeof(literal)==='string'&&!literal.trim()||isNaN(literal)
      if(!isNotNumber(station.lat)&&!isNotNumber(station.lon)&&(!isNotNumber(station.AQI)||!isNotNumber(station.PM25))){
        cntLoc++;
        avgLat+=parseFloat(station.lat);avgLon+=parseFloat(station.lon);
        if(!isNotNumber(station.AQI)){cntAQI++;avgAQI+=parseFloat(station.AQI);}
        if(!isNotNumber(station.PM25)){cntPM25++;avgPM25+=parseFloat(station.PM25);}
      }
    }
    if(cntLoc>1){
      avgLat/=cntLoc*1.0;avgLon/=cntLoc*1.0;
    }else if(cntLoc===0){
      continue
    }
    if(cntAQI>1){avgAQI/=cntAQI*1.0;}
    if(cntPM25>1){avgPM25/=cntPM25*1.0}
    const cityPM25Index=calculateUSAPM25Index(avgPM25)
    cityAQIsWithUSAPM25.push({
      Latitude: avgLat,
      Longitude: avgLon,
      AQI: Math.round(cntAQI>0?Math.max(avgAQI, cityPM25Index):cityPM25Index),
      PM25IsMaxPollution: cityPM25Index&&cityPM25Index >= avgAQI
    })
  }
  return cityAQIsWithUSAPM25
  }
}

/*const getSanshaAir = async() => {
  const resRow = (await get('http://www.hainanqx.cn/ASHX/LiveData/AirPM.ashx?stationID=59981&',{
      "method": "GET"
    }))?.rows
  res=resRow?resRow[0]:undefined
  if(res&&(res.PM25||res.PM10)){
    const pm25Concentration=res.PM25?35*res.PM25/50.0:0
    const usaPM25Index=calculateUSAPM25Index(pm25Concentration)??-1
    const pm10Index=res.PM10?res.PM10:-1
    return{
      lat:res.LAT,lon:res.LON,
      AQI:Math.max(pm10Index,usaPM25Index),
      PM25:pm25Concentration,
      PM25IsMaxPollution:usaPM25Index>0&&pm10Index>0&&usaPM25Index>=pm10Index
    }
  }
}*/