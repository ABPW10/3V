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

if($_SERVER['REQUEST_METHOD']==='POST'){

$json = file_get_contents('php://input');

// decode the json data
$data = json_decode($json);

if(isset($data)){

$sql = $data->q;

if(isset($sql) && !empty($sql)){

$servername = "fdb1027.royalwebhosting.net:3306";
$username = "4641616_cntowncatalogue";
$password = "xzqh2025";

// Create connection
$conn = new mysqli($servername, $username, $password, $username);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$conn->multi_query($sql);
$result = true;
do {
  $next_result = $conn->store_result();
  if($next_result){if($result!==true&&$result!==false){$result->free();}$result=$next_result;}
} while ($conn->next_result());

if($result === true){
  echo json_encode(true);
}else if($result !== false){
  echo json_encode($result->fetch_all(MYSQLI_NUM));
  $result->free();
}

$conn->close();

}

}

}

}
?>