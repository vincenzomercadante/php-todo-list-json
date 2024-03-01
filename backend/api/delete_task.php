<?php

// change header
header('Content-Type: application/json');

// recover the value from the post request
$user_request = $_POST['item'];
$task_index = (int) $user_request['i'];

// recover the json array
$string = file_get_contents("../data.json", true);
$tasks_list = json_decode($string, true);

// change status to delete or delete task permanently
if($tasks_list[$task_index]['status'] == 'deleted'){
    array_splice($tasks_list, $task_index, 1);
    $json_result = json_encode($tasks_list);
    file_put_contents("../data.json", $json_result);
    
} else {
    $new_status = $user_request['value'];
    $tasks_list[$task_index]['status'] = $new_status;
    $json_result = json_encode($tasks_list[$task_index]);
    $new_array = json_encode($tasks_list);
    file_put_contents("../data.json", $new_array);
}


// send the new array or the modified value
echo $json_result;

