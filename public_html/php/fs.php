<?php
$allowed_domains = array(
  'https://vwwv.neocities.org',
  'http://ftphomeustc.web3v.work'
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

$location='../store/';

if(isset($_GET['id']) && !empty($_GET['id'])){

$id = $_GET['id'];
   
$filename=$location.$id.".json";

if($_SERVER['REQUEST_METHOD']==='POST'){

$data = file_get_contents('php://input');

if(file_exists($location)){

file_put_contents($filename, $data);

}

} else if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    header('Access-Control-Allow-Methods: DELETE');

}else if(($_SERVER['REQUEST_METHOD']==='GET'||$_SERVER['REQUEST_METHOD']==='DELETE')&&file_exists($filename)){

if($_SERVER['REQUEST_METHOD']==='GET'){

	echo file_get_contents($filename);

}else if($_SERVER['REQUEST_METHOD']==='DELETE'){

	unlink($filename);

}

}

}else{

$files=array_values(array_map(function($f){return pathinfo($f)['filename'];}, array_filter(scandir($location), function($fd){return !is_dir($fd);})));
echo json_encode($files);
        
}

}
?>