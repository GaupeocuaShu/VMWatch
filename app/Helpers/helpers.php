<?php

/*
<!-- Convert the URL query into array 
 brands=longines%7Ccitizen%7Cmido&case_colors=black 
 to [
  "brands" => ["longines", "citizen", "mido"],
  "case_colors" => "black"
]

 -->

*/
function convertQueryToArray($query)
{
    parse_str($query, $queryArray);
    $result = [];
    foreach ($queryArray as $key => $value) {
        $result[$key] = array_map('trim', explode('|', $value));
    }
    return $result;
}
