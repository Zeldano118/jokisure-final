<?php

namespace App\Logging;

use Monolog\LogRecord;

class GcpSeverityProcessor
{
    public function __invoke(LogRecord $record): LogRecord
    {
        $data = $record->toArray();
        $data['severity'] = $record->level->name; 
        
        return \Monolog\LogRecord::fromArray($data);
    }
}