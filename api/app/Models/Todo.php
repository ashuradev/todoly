<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model 
{
    /**
     * The attributes that should be casted to native types.
     * 
     * @var array
     */
    protected $casts = [
        'is_completed' => 'boolean'
    ];

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'description',
        'is_completed'
    ];
}