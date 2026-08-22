const bboxForOverlay=[65,0.1,165,60]
const scaleFactor=10
const bboxW=parseInt(scaleFactor*(bboxForOverlay[2]-bboxForOverlay[0]))
const bboxH=parseInt(scaleFactor*(bboxForOverlay[3]-bboxForOverlay[1]))
// 创建Canvas元素
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// 加载图片
const img = new Image();img.crossOrigin = "Anonymous";
const lastHour=new Date(now)
lastHour.setMinutes(0,0,0)
lastHour.setHours(lastHour.getHours()-1)
lastHrText=lastHour.toISOString().replaceAll('-','').replaceAll('T','').replaceAll(':','').replaceAll('.','').replaceAll('Z','').substr(0,12)
img.src = `https://data.nsmc.org.cn/NSMCAPI/v1/nsmc/image/wms/compose?layers=GEOS_IRX&datetime=${lastHrText}&request=GetMap&bbox=${bboxForOverlay}&width=${bboxW}&height=${bboxH}&version=1.3.0&format=png`; // 设置图片源地址

img.onload = () => {
canvas.width = img.width;
canvas.height = img.height;
ctx.drawImage(img, 0, 0);
// 获取像素数据
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixels = imageData.data; // 像素数据的Uint8ClampedArray
// 修改像素数据
pixels.shape=[bboxH,bboxW,4]
const [repositionedImageData,repositionedImageHeight]=mecatur(pixels,bboxForOverlay[1],bboxForOverlay[3])
canvas.height=repositionedImageHeight
const repositionedImage=new ImageData(repositionedImageData,canvas.width,canvas.height)
// 将修改后的像素数据放回Canvas
ctx.putImageData(repositionedImage, 0, 0);

satelliteOverlay=L.imageOverlay(canvas.toDataURL(), L.latLngBounds([[bboxForOverlay[1], bboxForOverlay[0]], [bboxForOverlay[3], bboxForOverlay[2]]]), {attribution:'<a href="http://www.nsmc.org.cn/nsmc/cn/home/index.html">国家卫星气象中心</a>'}).addTo(map);
if(window.layers){layers.addOverlay(satelliteOverlay,'云图');}
};

function mecatur(img,latS,latN){
    const mecaturReposition=latRad=>Math.log((1+Math.sin(latRad))/Math.cos(latRad))/Math.PI
    const scaleYSouth=mecaturReposition(latS/180*Math.PI)
    let lastY=0
    const itemValueCountPerRow=img.shape[1]*img.shape[2]
    let imgHeightAfterReposition=img.shape[0]
    for(let i=itemValueCountPerRow*(img.shape[0]-2);i>=0;i-=itemValueCountPerRow){
        const currentLat=latS+(img.shape[0]-1-parseInt(i/itemValueCountPerRow))*(latN-latS)/img.shape[0]
        let currentScaleY=mecaturReposition(currentLat/180*Math.PI)
        if(currentScaleY>1){currentScaleY=1}
        const dY=parseInt((currentScaleY-scaleYSouth)/(latN-latS)*180*img.shape[0])
        if(dY==lastY){break}
        const insertCount=dY-lastY-1
        imgHeightAfterReposition+=insertCount
        lastY=dY
        const lowerEndRowValue=img.slice(i+itemValueCountPerRow,i+2*itemValueCountPerRow)
        const higherEndRowValue=img.slice(i,i+itemValueCountPerRow)
        for(let j=0;j<insertCount;j++){
          const contentToInsert=new Uint8ClampedArray(itemValueCountPerRow)
          for(let itemIndex=0;itemIndex<itemValueCountPerRow;itemIndex++){
            contentToInsert[itemIndex]=(j+1)/(insertCount+1)*lowerEndRowValue[itemIndex]+(insertCount-j)/(insertCount+1)*higherEndRowValue[itemIndex]
          }
          expanded=new Uint8ClampedArray(img.length+itemValueCountPerRow)
          expanded.shape=img.shape
          expanded.set(img.slice(i+itemValueCountPerRow),i+2*itemValueCountPerRow)
          expanded.set(img.slice(0,i+itemValueCountPerRow),0)
          expanded.set(contentToInsert,i+itemValueCountPerRow)
          img=expanded
        }
    }
    return [img,imgHeightAfterReposition]
}