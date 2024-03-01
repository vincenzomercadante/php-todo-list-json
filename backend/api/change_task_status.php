<?php

header('Content-Type: application/json');

$string = file_get_contents("../data.json", true);
$tasks_list = json_decode($string, true);

$user_request = $_POST['item'];
$task_index = (int) $user_request['i'];
$new_status = $user_request['value'];


$tasks_list[$task_index]['status'] = $new_status;


$new_array = json_encode($tasks_list);
$json_result = json_encode($tasks_list[$task_index]);

file_put_contents("../data.json", $new_array);

echo $json_result;

