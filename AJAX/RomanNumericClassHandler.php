<?php

class RomanNumericClassHandler
{
    public static $roman_numerals = array(
        'M' => 1000,
        'CM' => 900,
        'D' => 500,
        'CD' => 400,
        'C' => 100,
        'XC' => 90,
        'L' => 50,
        'XL' => 40,
        'X' => 10,
        'IX' => 9,
        'V' => 5,
        'IV' => 4,
        'I' => 1
    );


    public function __construct($num_lang, $body)
    {
        $this->num_lang = $num_lang;
        $this->body = $body;
    }

    /**
     * @return string
     */
    public function convert()
    {

        switch ($this->num_lang) {
            case 'latin';
                $returnValue = '';
                $raw_num = intval($this->body);
                while ($raw_num > 0) {
                    foreach (self::$roman_numerals as $roman => $int) {
                        if ($raw_num >= $int) {
                            $raw_num -= $int;
                            $returnValue .= $roman;
                            break;
                        }
                    }
                }
                return $returnValue;
                break;
            case 'roman';
                $raw_num = strtoupper($this->body);
                for ($i = 0; $i < strlen($raw_num); $i++) {
                    $value = self::$roman_numerals[$raw_num[$i]];
                    $nextValue = isset($raw_num[$i]) ? self::$roman_numerals[$raw_num[$i + 1]] : null;
                    $result += (!is_null($nextValue) && $nextValue > $value) ? -$value : $value;
                }
                return $result;
                break;

            default:
                return "что-то пошло не так, обратитесь к администратору";
        }
    }
}

?>