<?php 


// header for the json
header("Content-Type: application/json");

$string = file_get_contents("../data.json");

$task_list = json_decode($string, true);

$task_list[] = $_POST['item'];

$json_result = json_encode($task_list);

file_put_contents('../data.json', $json_result);

echo $json_result;