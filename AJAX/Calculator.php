<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'RomanNumericClassHandler.php';

try {
    if (isset($_POST['num_lang']) && isset($_POST['body'])){
    $instance = new RomanNumericClassHandler($_POST['num_lang'], $_POST['body']);
    echo $instance->convert();
    }else{
        echo 'Что-то пошло не так, обратитесь к садминистратору';
    }
} catch (Exception $e) {
    echo $e->getMessage() . "\n";
}
?>