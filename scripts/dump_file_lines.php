<?php
$path = __DIR__ . '/../resources/js/pages/dashboard.tsx';
$lines = file($path);
foreach ($lines as $i => $line) {
    printf("%4d: %s", $i+1, $line);
}
