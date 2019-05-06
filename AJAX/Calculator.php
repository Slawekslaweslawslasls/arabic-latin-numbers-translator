<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'RomanNumericClassHandler.php';

try {
    if (isset($_POST['num_lang']) && isset($_POST['body'])){
    $instance = new RomanNumericClassHandler();
    echo $instance->convert();
    }else{
        echo 'Что-то пошло не так, обратитесь к администратору';
    }
} catch (Exception $e) {
    echo $e->getMessage() . "\n";
}
?>