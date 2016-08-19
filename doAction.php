<?php

// Open session
session_start();

$action = $_GET['action'];

// Do Action
if ($action == "register"){
    register();
}
elseif($action == "checkRegisterState"){
    checkRegisterState();
}
elseif($action == "exit"){
    unRegister();
}
elseif($action == "sendMsg"){
    sendMsg();
}
elseif($action == "getMsg"){
    getMsg();
}
elseif($action == "getUsers"){
    getUsers();
}
elseif($action == "reset"){
    resetdata();
}

// Register user to session and write to file
function register(){

    $user = $_GET['name'];

    if ($user != ""){
        $_SESSION["user"] = $user;

        // Write user to users.txt
        $usr = "<li>".$user."</li>";
        $file_users = fopen("users.txt", "a") or die("Unable to open file!");
        fwrite($file_users, $usr);
        fclose($file_users);

        echo "success";
    }
    else{
        echo "fail";
    }
}

// Check register user
function checkRegisterState(){
    if($_SESSION['user'] != ""){
        echo "true";
    }
    else{
        echo "false";
    }
}

// Get message from file
function getMsg(){
    $file_msg = fopen("msg.txt", "r") or die("Unable to open file!");
    echo fread($file_msg,filesize("msg.txt"));
    fclose($file_msg);
}

// Get register users from file
function getUsers(){
    $file_users = fopen("users.txt", "r") or die("Unable to open file!");
    echo fread($file_users,filesize("users.txt"));
    fclose($file_users);
}

// Save message to file
function sendMsg(){
    $msg = $_GET['con'];
    $time = $_GET['d'];

    $patterns = array();
    $patterns[0] = '/<:1:>/';
    $patterns[1] = '/<:2:>/';
    $patterns[2] = '/<:3:>/';
    $patterns[3] = '/<:4:>/';
    $patterns[4] = '/<:5:>/';
    $patterns[5] = '/<:6:>/';
    $patterns[6] = '/<:7:>/';
    $patterns[7] = '/<:8:>/';
    $patterns[8] = '/<:9:>/';
    $patterns[9] = '/<:10:>/';
    $replacements = array();
    $replacements[0] = "<img src='Images/1.gif' />";
    $replacements[1] = "<img src='Images/2.gif' />";
    $replacements[2] = "<img src='Images/3.gif' />";
    $replacements[3] = "<img src='Images/4.gif' />";
    $replacements[4] = "<img src='Images/5.gif' />";
    $replacements[5] = "<img src='Images/6.gif' />";
    $replacements[6] = "<img src='Images/7.gif' />";
    $replacements[7] = "<img src='Images/8.gif' />";
    $replacements[8] = "<img src='Images/9.gif' />";
    $replacements[9] = "<img src='Images/10.gif' />";
    $msg = preg_replace($patterns, $replacements, $msg);

    //echo $msg;
    //echo $time;

    $message = "<li>" . $_SESSION["user"] . "&nbsp[&nbsp;" . $time . "&nbsp] said:" . $msg ."</li>";
    //$message ="<li>test2</li>";

    //echo $message;
    $file_msg = fopen("msg.txt", "a") or die("Unable to open file!");

    fwrite($file_msg, $message);
    fclose($file_msg);
    echo "success";
}

// Unlink register user
function unRegister(){
    session_abort();
}

// Refresh files
function resetdata(){
    $file_users = fopen("users.txt", "w") or die("Unable to open file!");
    $file_msg = fopen("msg.txt", "w") or die("Unable to open file!");
    fwrite($file_users, " ");
    fwrite($file_msg, " ");
    fclose($file_users);
    fclose($file_msg);
    echo "reset success";
}





