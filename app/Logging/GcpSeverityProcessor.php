<?php

namespace App\Logging;

use Monolog\LogRecord;
use Monolog\Processor\ProcessorInterface;

class GcpSeverityProcessor implements ProcessorInterface
{
    public function __invoke(LogRecord $record): LogRecord
    {
        // Menyuntikkan field 'severity' di level root JSON sesuai kemauan GCP
        return $record->with(extra: array_merge($record->extra, [
            'severity' => $record->level->name,
        ]));
    }
}