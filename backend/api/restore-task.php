<?php

// change header
header('Content-Type: application/json');

// recover json array
$string = file_get_contents("../data.json", true);
$tasks_list = json_decode($string, true);

// recover values from post request
$user_request = $_POST['item'];
$task_index = (int) $user_request['i'];
$new_status = $user_request['value'];

// change selected array element status value 
$tasks_list[$task_index]['status'] = $new_status;


$new_array = json_encode($tasks_list);
$json_result = json_encode($tasks_list[$task_index]);

// write the new array on json file
file_put_contents("../data.json", $new_array);

// send the modified value
echo $json_result;

