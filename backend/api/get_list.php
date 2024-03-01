<?php

// header for the json
header("Content-Type: application/json");

// recover the json array
$string = file_get_contents("../data.json");
$task_list = json_decode($string, true);

// send task array
echo json_encode($task_list);
