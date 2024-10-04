<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    public $table='category';

    public $fillable=[
        'categoryname',
        'image',
        'status'
    ];

    public function setCategorynameAttribute($value)
{
    $this->attributes['categoryname'] = ucwords($value);
}

    use HasFactory;
}
