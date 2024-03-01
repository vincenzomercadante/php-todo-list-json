<?php 


// header for the json
header("Content-Type: application/json");

// recover json array
$string = file_get_contents("../data.json");
$task_list = json_decode($string, true);

// push task in array
$task_list[] = $_POST['item'];

// write the new array on json file
$json_result = json_encode($task_list);
file_put_contents('../data.json', $json_result);

// send the json array
echo $json_result;