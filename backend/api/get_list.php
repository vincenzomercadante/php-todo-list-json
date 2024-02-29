<?php

// header for the json
header("Content-Type: application/json");

$string = file_get_contents("../data.json");

$task_list = json_decode($string, true);

echo json_encode($task_list);
