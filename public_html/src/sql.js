function 查询(语句){
  return new Promise((完成,失败)=>{
    fetch((location.href.startsWith('https')?'https':'http')+'://vwwv.royalwebhosting.net/php/db.php',{method:'POST',body:JSON.stringify({q:语句})}).then(流量=>流量.json()).then(数据=>完成(数据))
  })
}
var SQL=查询