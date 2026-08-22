<?php
$allowed_domains = array(
  'https://vwwv.neocities.org',
  'http://ftphomeustc.web3v.work',
  'http://vwwv.royalwebhosting.net'
);
$valid_origin=empty($_SERVER['HTTP_ORIGIN']);
if(isset($_SERVER['HTTP_ORIGIN'])){
  $http_origin = $_SERVER['HTTP_ORIGIN'];
  if (!empty($http_origin) && (in_array($http_origin, $allowed_domains)
                             || $http_origin==='http://'.$_SERVER['HTTP_HOST'] || $http_origin==='https://'.$_SERVER['HTTP_HOST']))
  {
    if(in_array($http_origin, $allowed_domains)){
      header("Access-Control-Allow-Origin: $http_origin");
    }
    $valid_origin=true;
  }
}

if($valid_origin){

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_GET['url']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, isset($_GET['method'])?$_GET['method']:'GET');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: */*',
]);

$response = curl_exec($ch);echo curl_error($ch);
$info = curl_getinfo($ch);
if(isset($info['content_type'])){
    $type=$info['content_type'];
    header("Content-Type: $type");
}
curl_close($ch);

echo $response;
  
}
?>