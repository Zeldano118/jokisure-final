<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('logging.default') === 'gcp') {
            Log::extend('gcp', function ($app, $config) {
                $handler = new \Monolog\Handler\StreamHandler('php://stderr', $config['level'] ?? 'debug');
                
                // Menggunakan formatter custom untuk memanipulasi struktur JSON struktur terluar
                $formatter = new \Monolog\Formatter\JsonFormatter();
                $handler->setFormatter($formatter);
                
                $logger = new \Monolog\Logger('production', [$handler]);
                
                // Di sini kuncinya! Memaksa 'severity' ditulis di ROOT JSON terluar, bukan di dalam 'extra'
                $logger->pushProcessor(function ($record) {
                    $formattedRecord = $record->toArray();
                    $formattedRecord['severity'] = $record->level->name; // Paksa masuk root terluar
                    return \Monolog\LogRecord::fromArray($formattedRecord);
                });
                
                return $logger;
            });
        }
    }
}