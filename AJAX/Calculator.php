<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . 'RomanNumericClassHandler.php';

try {
    $instance = new RomanNumericClassHandler($_POST['num_lang'], $_POST['body']);
    echo $instance->convert();
} catch (Exception $e) {
    echo $e->getMessage() . "\n";
}
?>