<?php
require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Foundation\Http\Kernel::class);
print_r($kernel->getMiddlewareAliases());
