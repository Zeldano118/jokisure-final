<?php

namespace App\Logging;

use Monolog\Formatter\JsonFormatter;

class GcpJsonFormatter extends JsonFormatter
{
    public function format($record): string
    {
        $json = parent::format($record);
        
        $data = json_decode($json, true);
        
        $data['severity'] = $data['level_name'] ?? 'ERROR';
        
        return json_encode($data) . "\n";
    }
}