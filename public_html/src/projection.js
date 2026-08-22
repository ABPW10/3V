function latlngtovec(lat,lng){
    lat/=180/Math.PI
    lng/=180/Math.PI
    return [Math.cos(lng)*Math.cos(lat),Math.sin(lng)*Math.cos(lat),Math.sin(lat)]
}
function dist(lat1,lng1,lat0,lng0){
    lat1/=180/Math.PI
    lng1/=180/Math.PI
    lat0/=180/Math.PI
    lng0/=180/Math.PI
    return 1-Math.cos(lat1)*Math.cos(lat0)*Math.cos(lng1-lng0)-Math.sin(lat0)*Math.sin(lat1)
}
// 通过 offset 指定投影方法
function offset_UTM(lat1,lng1,lat0,lng0){
    ctr=latlngtovec(0,lng0)
    投影带=Math.round((lng1-lng0)/40)
    投影带中心=latlngtovec(0,lng0+投影带*0.1)
    中心经线圈法向量=cross3(投影带中心,[0,0,1])
    中心经线圈法向量=numMultipliesVec(1/vecNorm(中心经线圈法向量),中心经线圈法向量)
    投影点在中心经线圈法向量上的投影=numMultipliesVec(dot(latlngtovec(lat1,lng1),中心经线圈法向量),中心经线圈法向量)
    投影点在中心经线圈上的投影=vecSub(latlngtovec(lat1,lng1),投影点在中心经线圈法向量上的投影)
    与投影中心的夹角=Math.acos(dot(投影带中心,投影点在中心经线圈上的投影)/vecNorm(投影点在中心经线圈上的投影))
    与中心经线圈法向量的夹角=Math.acos(dot(latlngtovec(lat1,lng1),vecInv(中心经线圈法向量)))
    newposx=1/Math.tan(与中心经线圈法向量的夹角)+投影带*0.1/180.0*Math.PI
    newposy=与投影中心的夹角-lat0/180*Math.PI
    return[newposx,newposy]
}
function offset_Albes(lat1,lng1,lat0,lng0){
    中心半径=1/Math.sin(lat0*Math.PI/180)
    斜面半径=中心半径-(lat1-lat0)*Math.PI/180/Math.cos(lat0*Math.PI/180)
    角度差=(lng1-lng0)*Math.PI/180*Math.sin(lat0*Math.PI/180)
    newposx=斜面半径*Math.sin(角度差)
    newposy=中心半径-斜面半径*Math.cos(角度差)
    return[newposx,newposy]
}
function offset_Orthographic(lat1,lng1,lat0,lng0){
    ctr=latlngtovec(lat0,lng0)
    newpos=vecAdd(latlngtovec(lat1,lng1),numMultipliesVec(dist(lat1,lng1,lat0,lng0),ctr))
    newpostoctr=vecSub(newpos,ctr)
    newx=vecInv(cross3(ctr,[0,0,1]))
    newy=vecInv(cross3(newx,ctr))
    newposx=dot(newpostoctr,newx)/vecNorm(newx)
    newposy=dot(newpostoctr,newy)/vecNorm(newy)
    return[newposx,newposy]
}
/*function offset(lat1,lng1,lat0,lng0){
    ctr=latlngtovec(0,lng0)
    焦轴平方差=Math.pow(Math.PI/2,2)-Math.pow(lat1/180.0*Math.PI,2)
    半长轴=lat1/180.0*Math.PI
    要求的弧长=Math.abs(lng1-lng0)/180.0*Math.PI*Math.cos(半长轴)
    要求的横坐标=2/3.0*Math.sqrt(3/(16.0*Math.pow(半长轴,2))*(要求的弧长/(32/3.0*Math.pow(半长轴,2))+(1+16*Math.pow(半长轴,2)*Math.pow(焦轴平方差,2))/(16.0*Math.pow(半长轴,2))))
    要求的纵坐标=半长轴*Math.sqrt(1+Math.pow(要求的横坐标,2)/焦轴平方差)
    newposx=要求的横坐标-1.6
    newposy=要求的纵坐标-lat0/180*Math.PI
    return[newposx,newposy]
}*/