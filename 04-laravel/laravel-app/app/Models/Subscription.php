<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    use HasFactory, HasUuids;


    protected $fillable = [
        'subscriber_id',
        'service',
        'topic',
        'payload',
        'expired_at'
    ];


    protected $casts = [
        'payload'    => 'array',   
        'expired_at' => 'datetime', 
    ];

  
    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(Subscriber::class);
    }
}