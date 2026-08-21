// 在自定义程序中使用本段中的函数，必须定义 projCtr ，figureSize ，投影半径／缩放比例二选一变量
// 可选定义左移，上移，figureSizeX，figureSizeY变量
function placePoint(p){
 if(typeof(投影半径)!=='undefined'){
  if(typeof(figureSizeX)!=='undefined'&&typeof(figureSizeY)!=='undefined'){
   return [
      Math.round((figureSizeX+p[0]/投影半径*figureSize)/2),
      Math.round((figureSizeY-p[1]/投影半径*figureSize)/2)
   ]
  }else{
   return [
      Math.round((1+p[0]/投影半径)*figureSize/2),
      Math.round((1-p[1]/投影半径)*figureSize/2)
   ]
  }
 }else if(typeof(缩放比例)!=='undefined'&&typeof(左移)!=='undefined'&&typeof(上移)!=='undefined'){
  return [
      Math.round((1+p[0]*缩放比例)*figureSize/2-figureSize*左移),
      Math.round((1-p[1]*缩放比例)*figureSize/2-figureSize*上移)
  ]
 }else{return undefined}
}
function drawShape(data,color,graph,borderColor=undefined,hoverCallback=undefined){
  let ctr={}
  shapes=data
  for(let shape of shapes){
   if(shape.length===1){
    let points=''
    let lastX,lastY
    let firstX,firstY
    let pointsCnt=0;
    for(let vertex of shape[0]){
      let latlng=vertex
      let lng=latlng[0]
      let lat=latlng[1]
      let projPos=offset(lat,lng,projCtr[1],projCtr[0]);
      projPos=placePoint(projPos)
      if(!firstX){firstX=projPos[0]}
      if(!firstY){firstY=projPos[1]}
      if(projPos[0]!=lastX||projPos[1]!=lastY){
        points+=`${projPos[0]},${projPos[1]} `;
        pointsCnt++;
      }
      lastX=projPos[0];
      lastY=projPos[1];
    }
    if(pointsCnt>=4||pointsCnt==3&&(lastX!=firstX||lastY!=firstY)){
      let poly=document.createElement('polygon');
      poly.setAttribute('style',`fill:${color}${borderColor?`;stroke:${borderColor}`:''}`);
      poly.setAttribute('stroke-linecap','round')
      poly.setAttribute('stroke-linejoin','round')
      poly.setAttribute('points',points)
      graph.appendChild(poly)
    }
    if(!ctr.x){ctr.x=firstX}
    if(!ctr.y){ctr.y=firstY}
   }else if(shape.length>1){
    let polyWithHole=document.createElement('path');
    polyWithHole.setAttribute('style',`fill:${color}${borderColor?`;stroke:${borderColor}`:''}`);
    polyWithHole.setAttribute('stroke-linecap','round')
    polyWithHole.setAttribute('stroke-linejoin','round')
    polyWithHole.setAttribute('d','')
    for(let ring of shape){
      let points=''
      let lastX,lastY
      let firstX,firstY
      let pointsCnt=0;
      for(let vertex of ring){
        let latlng=vertex
        let lng=latlng[0]
        let lat=latlng[1]
        let projPos=offset(lat,lng,projCtr[1],projCtr[0]);
        projPos=placePoint(projPos)
        if(projPos[0]!=lastX||projPos[1]!=lastY){
          points+=`${!firstX&&!firstY?'M':'L'}${projPos[0]},${projPos[1]}`;
          pointsCnt++;
        }
        if(!firstX){firstX=projPos[0]}
        if(!firstY){firstY=projPos[1]}
        lastX=projPos[0];
        lastY=projPos[1];
      }
      points+='Z '
      if(pointsCnt>=4||pointsCnt===3&&(lastX!==firstX||lastY!==firstY)){
        polyWithHole.setAttribute('d',polyWithHole.getAttribute('d')+points)
      }
      if(!ctr.x){ctr.x=firstX}
      if(!ctr.y){ctr.y=firstY}
    }
    graph.appendChild(polyWithHole)
   }
  }
  return ctr
}
function drawOutline(data,color,graph){
  shapes=data;
  for(let shape of shapes){
    let points=''
    let lastX,lastY
    let firstX,firstY
    let pointsCnt=0;
    for(let vertex of shape){
      let latlng=vertex
      let lng=latlng[0]
      let lat=latlng[1]
      let projPos=offset(lat,lng,projCtr[1],projCtr[0]);
      projPos=placePoint(projPos)
      if(!firstX){firstX=projPos[0]}
      if(!firstY){firstY=projPos[1]}
      if(projPos[0]!=lastX||projPos[1]!=lastY){
        points+=`${projPos[0]},${projPos[1]} `;
        pointsCnt++;
      }
      lastX=projPos[0];
      lastY=projPos[1];
    }
    if(pointsCnt>=3||pointsCnt==2&&(lastX!=firstX||lastY!=firstY)){
      let polyline=document.createElement('polyline');
      polyline.setAttribute('style',`stroke:${color}`);
      polyline.setAttribute('stroke-linecap','round')
      polyline.setAttribute('stroke-linejoin','round')
      polyline.setAttribute('points',points)
      polyline.setAttribute('fill','none')
      graph.appendChild(polyline)
    }
  }
}