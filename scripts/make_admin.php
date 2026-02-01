<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$u = App\Models\User::find(1);
if ($u) {
    $u->is_admin = 1;
    $u->save();
    echo "made user {$u->id} admin\n";
} else {
    echo "user not found\n";
}
