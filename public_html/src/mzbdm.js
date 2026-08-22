performB=(url,headers=undefined,body=undefined,method=undefined)=>new Promise(resolve => {
  var xhr = new XMLHttpRequest()

  xhr.open('POST', 'https://rvaxukg9.lc-cn-n1-shared.com/1.1/functions/NetworkRequestNoLimit')

  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  xhr.setRequestHeader('X-LC-Id', 'rvaxuKG9LziG2D5p2YXFCWQM-gzGzoHsz')
  xhr.setRequestHeader('X-LC-Key', 'thYLuE0HkGzcAp6AiLbiI6Dx')

  xhr.send(JSON.stringify({url,headers,body,method}))

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result=JSON.parse(xhr.responseText).result
      try {
        result=JSON.parse(result)
      } catch (error) {
        
      }
      resolve(result)
    }
  }
})

getB=(url, options=undefined)=>performB(url,options?.headers,undefined,options?.method)
postB=(url, options=undefined)=>performB(url,options?.headers,options?.body,'POST')
//民政部地名信息库叠加层，配置Leaflet支持标注文字去重叠，如用OpenLayers，则开箱即支持该特性
//Leaflet vector tile label decluttering, if used OpenLayers, there is built-in support for which
var parentClass=L.LayerGroup
	L.LayerGroup.Collision.prototype.addLayer= function(layer) {
		if ( !('options' in layer) || !('icon' in layer.options)) {
			return;
		}

		this._originalLayers.push(layer);
		if (this) {
			this._maybeAddLayerToRBush( layer );
		}
	}
	L.LayerGroup.Collision.prototype.clearLayers= function() {
		this._rbush = new RBush();
		this._originalLayers = [];
		this._visibleLayers  = [];
		this._staticLayers   = [];
		this._cachedRelativeBoxes = [];
		parentClass.prototype.clearLayers.call(this);
	}
	L.LayerGroup.Collision.prototype._positionBox= function(offset, box) {

		return {
			minX:box[0] + offset.x - this._margin,
			minY:box[1] + offset.y - this._margin,
			maxX:box[2] + offset.x + this._margin,
			maxY:box[3] + offset.y + this._margin,
		}
	}
  L.LayerGroup.Collision.prototype.removeLayer= function(layer) {
    if(this._cachedRelativeBoxes[layer._leaflet_id]){
		const tilePos=layer._renderer.getContainer()._leaflet_pos
		const iconAnchor=layer.options.icon.options.iconAnchor
		const adjustedLayerPoint={x:tilePos.x+layer._point.x-iconAnchor[0],y:tilePos.y+layer._point.y-iconAnchor[1]}
		this._rbush.remove(this._positionBoxes(adjustedLayerPoint,this._cachedRelativeBoxes[layer._leaflet_id])[0],(t,s)=>t.minX==s.minX&&t.minY==s.minY&&t.maxX==s.maxX&&t.maxY==s.maxY);
		delete this._cachedRelativeBoxes[layer._leaflet_id];
    }
		parentClass.prototype.removeLayer.call(this,layer);
		var i;

		i = this._originalLayers.indexOf(layer);
		if (i !== -1) { this._originalLayers.splice(i,1); }

		i = this._visibleLayers.indexOf(layer);
		if (i !== -1) { this._visibleLayers.splice(i,1); }

		i = this._staticLayers.indexOf(layer);
		if (i !== -1) { this._staticLayers.splice(i,1); }
	}
	L.LayerGroup.Collision.prototype._maybeAddLayerToRBush= function(layer) {
		var z    = map.getZoom();
		var bush = this._rbush;

		var boxes = this._cachedRelativeBoxes[layer._leaflet_id];
		var visible = false;
		if (!boxes) {
			// Add the layer to the map so it's instantiated on the DOM,
			//   in order to fetch its position and size.
      parentClass.prototype.addLayer.call(this, layer);
			visible = true;
      const iconSize=layer.options.icon.options.iconSize
			var box = [0,0,iconSize[0],iconSize[1]]//this._getIconBox(layer._path);
			boxes = []//this._getRelativeBoxes(layer._path.children, box);
			boxes.push(box);
			this._cachedRelativeBoxes[layer._leaflet_id] = boxes;
		}
		const tilePos=layer._renderer.getContainer()._leaflet_pos
		const iconAnchor=layer.options.icon.options.iconAnchor
		const adjustedLayerPoint={x:tilePos.x+layer._point.x-iconAnchor[0],y:tilePos.y+layer._point.y-iconAnchor[1]}
		boxes = this._positionBoxes(adjustedLayerPoint,boxes);

		var collision = false;
		for (var i=0; i<boxes.length && !collision; i++) {
			collision = bush.search(boxes[i]).length > 0;
		}

		if (!collision) {
			if (!visible) {
				parentClass.prototype.addLayer.call(this, layer);
			}
			this._visibleLayers.push(layer);layer._updatePath()
			bush.load(boxes);
		} else {
			parentClass.prototype.removeLayer.call(this, layer);layer._path=document.createComment('');
		}
	}
let lastZ=undefined
const roundDown=z=>Math.round(z-0.0001)
L.LayerGroup.Collision.prototype._onZoomEnd= function(e) {
  const z=e?.target._tileZoom
  if(roundDown(lastZ)!==roundDown(z)){
    this.clearLayers()
  }
  if(lastZ!=z){lastZ=z}
	}
L.VectorGrid.prototype._clampZoom=function(zoom) {
		const options = this.options;
    zoom=roundDown(this._map.getZoom())
		if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
			return options.minNativeZoom;
		}

		if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
			return options.maxNativeZoom;
		}

		return zoom;
	}
PointSymbolizer.prototype.render=function(renderer, style) {
		this.options={icon:style.icon}
		this._renderer=renderer
		this._radius = L.CircleMarker.prototype.options.radius;
		  collisionLayer.addLayer(this);
	}
var collisionLayer = L.LayerGroup.collision({margin:2});

		collisionLayer._onZoomEnd();
function placeNameStyle(c,n){
          const fs=7+c+(c<5?c<4?1:0.5:0)
          const l=n.length
          const dy=7.5+c*0.5
          const h=fs+dy,w=fs*l
          const cy=h-dy/2
          let m=''
          switch(c){
            case 2:m=`<circle cx="${w/2}" cy="${cy}" r="2" stroke="black" stroke-width="1" fill="white" /><path stroke="black" fill="none" stroke-linecap="round" d="M${w/2},${cy}Z" stroke-width="1.5"></path>`;break
            case 3:m=`<circle cx="${w/2}" cy="${cy}" r="2.5" stroke="black" stroke-width="1" fill="white" /><path stroke="black" fill="none" stroke-linecap="round" d="M${w/2},${cy}Z" stroke-width="1.5"></path>`;break
            case 4:m=`<circle cx="${w/2}" cy="${cy}" r="3" stroke="black" stroke-width="1" fill="white" />
<circle cx="${w/2}" cy="${cy}" r="1.5" stroke="black" stroke-width="1" fill="none" />`;break
            case 5:m=`<circle cx="${w/2}" cy="${cy}" r="3.25" stroke="black" stroke-width="1" fill="white" />
<circle cx="${w/2}" cy="${cy}" r="1.75" stroke="black" stroke-width="1" fill="url(#repeatedLines)" />
  <defs>
    <pattern id="repeatedLines" patternUnits="userSpaceOnUse" width="3" height="3">
      <path d="M 0 3 L 3 0" stroke="black" stroke-width="1"/>
    </pattern>
  </defs>`;break
            default:m=`<circle cx="${w/2}" cy="${cy}" r="1.5" stroke="black" stroke-width="1" fill="white" />`;break
          }
          return{icon:L.icon({iconUrl:"data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" height="${h}" width="${w}">
${m}
<text paint-order="stroke fill" fill="white" stroke="black" stroke-width="1.67" x="50%" y="100%" font-size="${fs}px" text-anchor="middle" alignment-baseline="baseline" dy="-${dy}">${n}</text>
</svg>`))),iconSize:[w,h],iconAnchor:[w/2,cy]})}
}
const tileUnload=e=>{
  if(e.tile.children[0]){
		  for(let fe of e.tile.children[0].children){
		    for(let l of collisionLayer.getLayers()){if(l.getElement()==fe){collisionLayer.removeLayer(l);}}
		  }
  }
		}
    map.createPane('vtAnnotationPane').style.zIndex = 206;
Blob.prototype.json=async function(){const result=JSON.parse(await this.text());return result}
getB('https://dmfw.mca.gov.cn/js/map/mainData/mainData.json').then(r=>new Blob([new Uint8Array(r.content.data)], { type: r.contentType }).json()).then(geoJsonData=>{
const mainData=L.vectorGrid.slicer(geoJsonData,{
    vectorTileLayerStyles: {
        sliced: function(p, z) {
          if(z<p.minl||z>p.maxl){return[]}
          if(p.dmlb!='21200'){return[]}
          return placeNameStyle(5,p.tsmc)
        }
    },minZoom:1,maxZoom: 18,indexMaxZoom:12,className:'placenames',buffer:0,pane:'vtAnnotationPane'
  }).addTo(map).on('tileunload',tileUnload).on('loading', collisionLayer._onZoomEnd, collisionLayer);
})
let loadTileTimeout=undefined
let allowLoad=false
let delayLoad=undefined
const pbfUrl='https://dmfw.mca.gov.cn/map_vec/annolayer/{z}/{y}/{x}.pbf'
const pbfTiles=L.vectorGrid.protobuf(pbfUrl,{
    vectorTileLayerStyles: {
        "public.k_21_xzqy_p":p=>placeNameStyle(p.weight/100.0,p.tsmc),
        "public.k_23_jtys_l":[],
        "public.k_27_dw_p":[],
        "public.k_11_zr_l":[],
        "public.k_24_sjj_p":[],
        "public.k_22_jmd_p":[],
        "public.k_11_zr_p":[],
        "public.k_23_jtys_p":[]
    },updateWhenZooming:false,updateWhenIdle:true,updateInterval:2000,bounds:[[3,73],[54,136]],className:'placenames',pane:'vtAnnotationPane'
		}).on('loading',delayLoad=()=>{
		  clearTimeout(loadTileTimeout)
		  if(!allowLoad){pbfTiles.setUrl('',true)}
		    loadTileTimeout=setTimeout(()=>{
		  if(pbfTiles._url==''){
		    if(pbfTiles._tileZoom>5){
      const originalZoom=map.getZoom()
      const originalGetZoom=map.getZoom
      if(originalZoom%1!==0){map.getZoom=()=>roundDown(originalZoom)}
      pbfTiles.setUrl(pbfUrl)
      if(originalZoom%1!==0){map.getZoom=originalGetZoom;map.setZoom(originalZoom)}
		    }else{pbfTiles._removeAllTiles()}
		  }
        },1000)
		}).on('tileloadstart',e=>{
    e.tile.isReallyLoaded=e.target._url!==''
  })
pbfTiles.createTile=function(coords,done){
  if(this._url==''){return L.GridLayer.prototype.createTile()}else{return L.VectorGrid.Protobuf.prototype.createTile.call(this,coords,done)}
}
pbfTiles._isCurrentTile = function(coords, tileBounds) {

		if (!this._map) {
			return true;
		}

		var zoom = this._map._animatingZoom ? this._map._animateToZoom : this._map._zoom;
		var currentZoom = roundDown(zoom) === coords.z;

		var currentBounds = this._map.getBounds(); 
		
		let withinBounds=false
		for(let i=-this.options.keepBuffer;i<=this.options.keepBuffer;i++){
		for(let j=-this.options.keepBuffer;j<=this.options.keepBuffer;j++){
		const mutateCoords=L.point({x:coords.x+i,y:coords.y+j});mutateCoords.z=coords.z
		var tileBounds = this._tileCoordsToBounds(mutateCoords);
		withinBounds = currentBounds.overlaps(tileBounds);
		if(withinBounds){break}
		}
		if(withinBounds){break}
		}

		return currentZoom && withinBounds;

	}
pbfTiles._getVectorTilePromise= function(coords, tileBounds) {
		var data = {
			s: this._getSubdomain(coords),
			x: coords.x,
			y: coords.y,
			z: coords.z
// 			z: this._getZoomForUrl()	/// TODO: Maybe replicate TileLayer's maxNativeZoom
		};
		if (this._map && !this._map.options.crs.infinite) {
			var invertedY = this._globalTileRange.max.y - coords.y;
			if (this.options.tms) { // Should this option be available in Leaflet.VectorGrid?
				data['y'] = invertedY;
			}
			data['-y'] = invertedY;
		}

		if (!this._isCurrentTile(coords, tileBounds)) {
			return Promise.resolve({layers:[]});
		}

		var tileUrl = L.Util.template(this._url, L.extend(data, this.options));

		return getB(tileUrl, this.options.fetchOptions).then(function(response){
		response.ok=true;response.blob=()=>new Promise(res=>res(new Blob([new Uint8Array(response.content.data)],{type:response.contentType})))
			if (!response.ok || !this._isCurrentTile(coords)) {
				return {layers:[]};
			} 

			return response.blob().then( function (blob) {

				var reader = new FileReader();
				return new Promise(function(resolve){
					reader.addEventListener("loadend", function() {
						// reader.result contains the contents of blob as a typed array
						// blob.type === 'application/x-protobuf'
						var pbf = new Pbf( reader.result );
						return resolve(new VectorTile( pbf ));

					});
					reader.readAsArrayBuffer(blob);
				});
			});

		}.bind(this)).then(function(json){

			// Normalize feature getters into actual instanced features
			for (var layerName in json.layers) {
				var feats = [];

				for (var i=0; i<json.layers[layerName].length; i++) {
					var feat = json.layers[layerName].feature(i);
					feat.geometry = feat.loadGeometry();
					feats.push(feat);
				}

				json.layers[layerName].features = feats;
			}

			return json;
		});
	}
  pbfTiles.addTo(map).on('tileunload',tileUnload)
  pbfTiles.redraw=function () {
    if(this._url!==''){allowLoad=true}
		if (this._map) {
		for (const key of Object.keys(this._tiles)) {
		  if(!this._tiles[key].el.isReallyLoaded){
			this._removeTile(key);}
		}
			var tileZoom = this._clampZoom(this._map.getZoom());
			if (tileZoom !== this._tileZoom) {
				this._tileZoom = tileZoom;
				this._updateLevels();
			}
			this._update();
		}
		allowLoad=false
		return this;
	}
	map.on('zoom move',delayLoad)
    const vtOutOfBoundStyle=document.createElement('style')
    vtOutOfBoundStyle.textContent='.placenames svg{overflow:visible}'
    document.body.appendChild(vtOutOfBoundStyle)
fetch('https://api.tianditu.gov.cn/v2/administrative?keyword=台湾省&tk=bdbbba21b624d7f141c1f97c3d0fd7ef').then(r=>r.json()).then(j=>{
  const TWCities=[
{市:"台北市",站号:"58968",天气:"340101",省:"TW",拼音:"taibei"},
{市:"台中市",站号:"59158",天气:"340401",省:"TW",拼音:"taizhong"},
{市:"高雄市",站号:"59554",天气:"340201",省:"TW",拼音:"gaoxiong"},
{市:"台南市",站号:"59358",天气:"340203",省:"TW",拼音:"tainan"},
{市:"新北市",省:"TW",拼音:"xinbei"},
{市:"桃园市",站号:"58965",天气:"340102",省:"TW",拼音:"taoyuan"},
{市:"基隆市",站号:"58964",省:"TW",拼音:"jilong"},
{市:"新竹市",站号:"59152",天气:"340103",省:"TW",拼音:"xinzhu"},
{市:"嘉义市",站号:"59354",天气:"340202",省:"TW",拼音:"jiayi"},
{市:"彰化县",天气:"340403",省:"TW",拼音:"zhanghua"},
{市:"嘉义县",省:"TW",拼音:"jiayixian"},
{市:"屏东县",天气:"340205",省:"TW",拼音:"pingdong"},
{市:"新竹县",省:"TW",拼音:"xinzhuxian"},
{市:"苗栗县",天气:"340402",省:"TW",拼音:"miaoli"},
{市:"云林县",天气:"340406",省:"TW",拼音:"yunlin"},
{市:"宜兰县",站号:"59162",天气:"340104",省:"TW",拼音:"yilan"},
{市:"南投县",天气:"340404",省:"TW",拼音:"nantou"},
{市:"澎湖县",省:"TW",拼音:"penghu"},
{市:"台东县",站号:"59562",天气:"340204",省:"TW",拼音:"taidong"},
{市:"花莲县",站号:"59362",天气:"340405",省:"TW",拼音:"hualian"}
  ].map(c=>c.市)
  const features=[]
  const geoJsonData={type:'FeatureCollection',features}
  for(let c of j.data.district[0].children.sort((source,target)=>TWCities.indexOf(source.name)-TWCities.indexOf(target.name))){
    features.push({
      geometry:{type:'Point',coordinates:[c.center.lng,c.center.lat]},
      properties:{name:c.name,grade:TWCities.indexOf(c.name)<6?4:3}
    })
  }
fetch('http://vwwv.royalwebhosting.net/php/db.php',{method:'POST',body:JSON.stringify({q:'SELECT 乡镇街道,经度,纬度 FROM 台湾省 WHERE 等级=0 UNION SELECT 乡镇街道,经度,纬度 FROM 厦门市和泉州市 WHERE 等级=0 AND 地市区县="泉州市金门县"'})}).then(流量=>流量.json()).then(数据=>{
  for(let c of 数据){
    features.push({
      geometry:{type:'Point',coordinates:[c[1],c[2]]},
      properties:{name:c[0].replace('民族',''),grade:2}
    })
  }
L.vectorGrid.slicer(geoJsonData,{
    vectorTileLayerStyles: {
        sliced: function(p, z) {
          if(p.grade>2&&z<14-p.grade*2||p.grade==2&&z<9){return[]}
          return placeNameStyle(p.grade,p.name)
        }
    },minZoom:1,maxZoom: 18,indexMaxZoom:12,className:'placenames',buffer:0,pane:'vtAnnotationPane'
  }).addTo(map).on('tileunload',tileUnload);
})
})
const 西藏基本与增补=[
["达旺",[91.86891,27.591427],0],
["德让宗",[92.272926,27.343827],0],
["邦迪拉",[92.422796,27.266657],0],
["尼乌木",[94.151911,28.158634],0],
["哥里西娘",[93.476389,28.363333],0],
["木比丁",[93.25,28.43],2],
["格刀",[95.01219,28.692245],0],
["南英",[94.425,28.515],0],
["里戛",[95.040787,28.437294],0],
["巴昔卡",[95.325,28.075],0],
["瓦弄",[97.017725,28.129533],0],
["阿帕龙",[95.8428,28.437574],0],
["乌间岭",[[91,52,25],[27,34,54]],1],
["梅楚卡",[[94,8,4],[28,36,3]],1],
["申隔宗",[[92,7,2],[27,27,1]],1],
["打陇宗",[[92,11,58],[27,10,29]],1],
["马尼岗",[[94,16,42],[28,47,3]],1],
["都登",[[94,53,6],[28,59,54]],1],
["米培",[[95,48,35],[28,56,54]],1],
["古里",[[96,38,20],[28,8,43]],1],
["打坝",[[97,0,42],[28,16,56]],1],
["马加",[[93,25,41],[28,33,40]],1],
["邦钦",[[91,43,32],[27,43,58]],1],
["江卡宗",[[91,51,52],[27,34,2]],1],
["达东",[[94,22,32],[28,31,49]],1],
["古玉通",[[97,1,5],[28,17,55]],1],
["赤朗错",[[91,46,27],[27,32,33]],1],
["白则林",[[92,8,57],[27,3,17]],1],
["李错",[[92,13,12],[27,22,44]],1],
["济罗",[[93,49,16],[27,35,34]],1],
["邦勾",[[94,45,12],[28,53,10]],1],
["莫新",[[94,47,30],[28,48,33]],1],
["更仁",[[94,58,28],[29,8,12]],1],
["仁更",[[95,16,19],[28,8,33]],1],
["贝空曲宗",[[96,18,57],[28,48,6]],1],
["达普好工",[[96,36,38],[28,19,13]],1],
["塔克新",[[93,12,18],[28,25,57]],1],
["鲁古塘",[[92,11,9],[27,35,42]],1],
["同马",[[92,16,27],[27,43,39]],1],
["拉曼",[[93,57,26],[28,46,27]],1],
["陆松",[[95,46,32],[28,20,17]],1],
["登坑曲宗",[[96,55,7],[28,19,13]],1],
['拉乌错',[91.9333,27.575],2],
['麦吐',[92.5725,27.3475],2],
['嘎勒',[94.3025,28.7425],2],
['巴加西仁',[94.3965,28.5745],2],
['西金',[94.784,28.8975],2],
['德能',[97.027,28.1385],2],
['沙体',[96.9625,28.0075],2],
['亚比',[96.9425,27.904],2],
['乌达古里',[92.117,26.868],2],
['雪参堆',[91.731,27.742],3],
['穆曲',[91.717,27.711],3],
['鲁鹏',[91.715,27.72],3],
['雪参麦',[91.714,27.7315],3],
['拉孜卡门',[91.73,27.71],3],
['雪参乃郭尔',[],3],
['穆科夏松',[91.6625,27.58],3],
['翁拉',[91.72,27.52],3],
['白玛卡尔',[91.793,27.57],3],
['桑隆',[91.6625,27.5335],3],
['卡崩',[91.73,27.49],3],
['萨哲',[91.8,27.575],3],
['通连',[91.801,27.5733],3],
['喜耳底',[91.723,27.6475],3],
['替喜',[91.694,27.6175],3],
['河立迈',[],3],
['荷拉顶',[91.716,27.612],3],
['吉甫',[91.69,27.58],3],
['叶尔巴',[91.691,27.565],3],
['夏尔巴',[91.695,27.5545],3],
['旭',[91.648,27.6045],3],
['本',[],3],
['栋马林',[91.658,27.52],3],
['不来听',[91.661,27.5063],3],
['努拉',[],3],
['卡而丁',[],3],
['色如',[],3],
['夏尔',[],3],
['硕羌夏乌',[],3],
['曲',[92.207,27.429],3],
['桑迪',[92.277,27.405],3],
['朗西亭邦',[92.3875,27.342],3],
['略马东',[92.125,27.42],3],
['绒囊堆',[],3],
['绒囊麦',[],3],
['协尔杜边',[92.26,27.128],3],
['热空奎单',[92.394,27.313],3],
['奎单',[92.41,27.32],3],
['仆童',[92.235,27.235],3],
['木新',[92.2055,27.1737],3],
['商郎',[92.193,27.172],3],
['卡拉当',[92.1175,27.11],3],
['夏崩',[92.115,27.102],3],
['昂戛林',[92.145,27.036],3],
['听布',[92.1,27.66],3],
['果波',[],3],
['马永',[94.96,29.0925],3],
['波拉',[94.9475,29.097],3],
['果布',[94.91,29.051],3],
['吉多',[94.911,28.986],3],
['安密',[94.938,28.969],3],
['古更',[94.99,28.9555],3],
['列仁',[95.01,28.936],3],
['入贡',[95.027,28.919],3],
['月东',[95.065,28.893],3],
['蒙哥扎',[95.077,28.8875],3],
['扎西岗',[95.103,28.874],3],
['仁金',[94.834,28.954],3],
['杭金',[94.82925,28.93625],3],
['米金',[94.773,28.853],3],
['列果',[94.8955,28.8265],3],
['古金博洛',[],3],
['江波',[94.859,28.79667],3],
['班多',[94.897,28.7525],3],
['扬新',[],3],
['育金',[],3],
['嘎哥',[95.057,28.5685],3],
['许木',[95.07,28.602],3],
['哥布克',[95.1265,28.577],3],
['支根',[95.065,28.545],3],
['朵果',[],3],
['么布',[],3],
['达平',[],3],
['西木岗',[94.2875,28.825],3],
['西木荣',[],3],
['普洛木',[94.28,28.8],3],
['雅陆光东',[94.2575,28.814],3],
['巴布荣',[],3],
['列马西坡',[94.244,28.833],3],
['千果',[],3],
['海米',[94.355,28.7475],3],
['英固',[],3],
['邦龙',[94.28,28.735],3],
['岗龙',[94.289,28.725],3],
['基青',[94.296,28.716],3],
['央让',[94.31,28.6933],3],
['邦日',[94.285,28.686],3],
['嘎若',[94.3385,28.66],3],
['比地',[94.355,28.628],3],
['岗德',[94.3889,28.6275],3],
['龙达',[94.4,28.6035],3],
['拉龙',[94.075,28.633],3],
['大吉岭',[94.085,28.615],3],
['德庆塘',[94.105,28.625],3],
['辛巴尔',[94.1075,28.611],3],
['多吉岭',[94.1625,28.6025],3],
['德金邦嘎',[94.1515,28.585],3],
['热工',[94.215,28.555],3],
['仰崩',[94.256,28.533],3],
['林崩西',[94.28,28.536],3],
['嘎波',[94.3133,28.535],3],
['达固',[94.404,28.4905],3],
['达东更东',[94.416,28.518],3],
['洋布',[94.442,28.509],3],
['尔日功',[94.4525,28.5095],3],
['亚卜克',[94.478,28.5115],3]
]
  let features=[]
  let geoJsonData={type:'FeatureCollection',features}
  for(const p of 西藏基本与增补){
    const coordinates=p[1]
    if(coordinates.length===0){continue}
    if(coordinates[0] instanceof Array){
      let x=coordinates[0]
      x=x[0]+x[1]/60.0+x[2]/3600.0
      coordinates[0]=x
    }
    if(coordinates[1] instanceof Array){
      let y=coordinates[1]
      y=y[0]+y[1]/60.0+y[2]/3600.0
      coordinates[1]=y
    }
    features.push({
      geometry:{type:'Point',coordinates},
      properties:{name:p[0],level:p[2]}
    })
  }
L.vectorGrid.slicer(geoJsonData,{
    vectorTileLayerStyles: {
        sliced: function(p, z) {
          if(p.level<2&&z<9||p.level>=2&&z<11){return[]}
          return placeNameStyle(p.level==0?2:1,p.name)
        }
    },minZoom:1,maxZoom: 18,indexMaxZoom:12,className:'placenames',buffer:0,pane:'vtAnnotationPane'
  }).addTo(map).on('tileunload',tileUnload);
const 香港=[
  {
    "address": "屯喜路1号屯门政府合署2F",
    "phone": "00852-24511151",
    "poiType": "101",
    "name": "屯门区",
    "source": "0",
    "hotPointID": "91562505E42639E7",
    "lonlat": "113.976250,22.390590"
  },
  {
    "address": "葵涌兴芳路166~174号葵兴政府合署10F",
    "phone": "00852-24254602",
    "poiType": "101",
    "name": "葵青区",
    "source": "0",
    "hotPointID": "C1984481188100E9",
    "lonlat": "114.131470,22.363240"
  },
  {
    "address": "粉岭璧峰路3号北区政府合署地下",
    "phone": "00852-26832913",
    "poiType": "101",
    "name": "北区",
    "source": "0",
    "hotPointID": "D00E44077BF1DBDA",
    "lonlat": "114.138060,22.494520"
  },
  {
    "address": "香港仔海傍道",
    "phone": "",
    "poiType": "101",
    "name": "南区",
    "source": "0",
    "hotPointID": "902E6501EEAE6E30",
    "lonlat": "114.159420,22.247200"
  },
  {
    "address": "上禾輋路1号沙田政府合署地下",
    "phone": "00852-26065456",
    "poiType": "101",
    "name": "沙田区",
    "source": "0",
    "hotPointID": "D01004828535561B",
    "lonlat": "114.186980,22.385400"
  },
  {
    "address": "西湾河太安街29号东区法院大楼地下",
    "phone": "00852-28866531",
    "poiType": "101",
    "name": "东区",
    "source": "0",
    "hotPointID": "C1FE2500C0A8CEBD",
    "lonlat": "114.224300,22.284190"
  },
  {
    "address": "旺角联运街30号旺角政府合署地下",
    "phone": "",
    "poiType": "101",
    "name": "油尖旺区",
    "source": "0",
    "hotPointID": "C05E600464B23515",
    "lonlat": "114.172460,22.321540"
  },
  {
    "address": "青山道174~208号荃湾地铁站多层停车场大厦1F",
    "phone": "00852-24925096",
    "poiType": "101",
    "name": "荃湾区",
    "source": "0",
    "hotPointID": "915E2506A8A1CB0D",
    "lonlat": "114.118970,22.372870"
  },
  {
    "address": "长沙湾道303号长沙湾政府合署地下",
    "phone": "00852-27280781",
    "poiType": "101",
    "name": "深水埗区",
    "source": "0",
    "hotPointID": "10224405E4BBF87A",
    "lonlat": "114.160540,22.331920"
  },
  {
    "address": "九龙观塘观塘道392号创纪之城6期21F",
    "phone": "00852-21717433",
    "poiType": "101",
    "name": "观塘区",
    "source": "0",
    "hotPointID": "C0B06104A4F4721C",
    "lonlat": "114.222380,22.313710"
  },
  {
    "address": "中环统一码头道38号海港政府大楼20F",
    "phone": "00852-28524332",
    "poiType": "101",
    "name": "离岛区",
    "source": "0",
    "hotPointID": "C13461014459E67D",
    "lonlat": "113.939200,22.289140"
  },
  {
    "address": "汀角路1号",
    "phone": "00852-26541262",
    "poiType": "101",
    "name": "大埔区",
    "source": "0",
    "hotPointID": "11D06004E1D363DD",
    "lonlat": "114.164460,22.450000"
  },
  {
    "address": "亲民街34号西贡政府合署地下及2楼",
    "phone": "00852-27924455",
    "poiType": "101",
    "name": "西贡区",
    "source": "0",
    "hotPointID": "803C44042865F3EB",
    "lonlat": "114.272420,22.382130"
  },
  {
    "address": "庇利街42号九龙城政府合署7/8楼",
    "phone": "00852-26213401",
    "poiType": "101",
    "name": "九龙城区",
    "source": "0",
    "hotPointID": "11E82001EAB6351E",
    "lonlat": "114.189700,22.312090"
  },
  {
    "address": "中环统一码头道38号海港政府大楼地下11F/14F",
    "phone": "00852-28523002",
    "poiType": "101",
    "name": "中西区",
    "source": "0",
    "hotPointID": "C15821806992A983",
    "lonlat": "114.155110,22.286720"
  },
  {
    "address": "龙翔道138号龙翔办公大楼2F201室",
    "phone": "00852-23229701",
    "poiType": "101",
    "name": "黄大仙区",
    "source": "0",
    "hotPointID": "9166010781D3B372",
    "lonlat": "114.192060,22.341800"
  },
  {"address":"湾仔柯布连道2号地下","phone":"00852-25752477","poiType":"101","name":"湾仔区","source":"0","hotPointID":"D1A24002852C9C59","lonlat":"114.172880,22.277410"},
  {"address":"青山公路-元朗段269号元朗民政事务处大厦","phone":"00852-24740324","poiType":"101","name":"元朗区","source":"0","hotPointID":"809C61805C1A15EE","lonlat":"114.022820,22.444710"}
].concat([
  ["粉岭","114.139770000000000","22.496270000000000"],
  ["上水","114.130459000000000","22.509620000000000"],
  ["大屿山","113.942210000000000","22.284640000000000"],
  ["马鞍山","114.232270000000000","22.424730000000000"],
  ["将军澳","114.261070000000000","22.319670000000000"],
  ["天水围","113.997100000000000","22.461210000000000"]
])
features=[]
geoJsonData={type:'FeatureCollection',features}
for(let district of 香港){
  features.push(district instanceof Array?{
    geometry:{type:'Point',coordinates:district.slice(1).map(n=>+n)},
    properties:{name:district[0],grade:2}
  }:{
    geometry:{type:'Point',coordinates:district.lonlat.split(',').map(n=>+n)},
    properties:{name:district.name,grade:3}
  })
}
L.vectorGrid.slicer(geoJsonData,{
    vectorTileLayerStyles: {
        sliced: function(p, z) {
          if(p.grade==3&&z<8||p.grade==2&&z<9){return[]}
          return placeNameStyle(p.grade,p.name)
        }
    },minZoom:1,maxZoom: 18,indexMaxZoom:12,className:'placenames',buffer:0,pane:'vtAnnotationPane'
  }).addTo(map).on('tileunload',tileUnload);