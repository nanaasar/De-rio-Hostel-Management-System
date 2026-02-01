<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'price',
        'capacity',
        'description',
        'image',
    ];

    protected $casts = [
        'price' => 'integer',
        'capacity' => 'integer',
    ];
}
