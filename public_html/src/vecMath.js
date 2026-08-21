// 空间向量运算
function vecAdd(v1,v2){
  res=[]
  for(let i=0;i<v1.length;i++){
    res.push(v1[i]+v2[i])
  }
  return res
}
function numMultipliesVec(l,v){
  res=[]
  for(let i=0;i<v.length;i++){
    res.push(l*v[i])
  }
  return res
}
function vecSub(v1,v2){
  res=[]
  for(let i=0;i<v1.length;i++){
    res.push(v1[i]-v2[i])
  }
  return res
}
function vecInv(v){
  res=[]
  for(let i=0;i<v.length;i++){
    res.push(-v[i])
  }
  return res
}
function cross3(v1,v2){return[v1[1]*v2[2]-v2[1]*v1[2], v1[2]*v2[0]-v2[2]*v1[0], v1[0]*v2[1]-v2[0]*v1[1]]}
function dot(v1,v2){
  res=0
  for(let i=0;i<v1.length;i++){
    res+=v1[i]*v2[i]
  }
  return res
}
function vecNorm(v){
  res=0
  for(let i=0;i<v.length;i++){
    res+=v[i]*v[i]
  }
  res=Math.sqrt(res)
  return res
}