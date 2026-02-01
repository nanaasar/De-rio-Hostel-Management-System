<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'room_type',
        'name',
        'phone',
        'study_level',
        'guardian_name',
        'guardian_phone',
        'administration_letter',
        'passport_pic',
        'check_in',
        'check_out',
        'admin_signed',
        'admin_signature',
        'status',
    ];

    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'admin_signed' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
