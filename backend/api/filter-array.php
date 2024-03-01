<?php 

// change header 
header('Content-Type: application/json');

// recover value from the POST
$filter_value = $_POST['item'] ?? '';

// recover json array
$string = file_get_contents('../data.json');
$tasks_list = json_decode($string, true);

// filter array from the filter value
$filtered_array = array_filter($tasks_list, fn($task) => str_contains($task['text'], $filter_value));

// send the filtered array
echo json_encode($filtered_array);



