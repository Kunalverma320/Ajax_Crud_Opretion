<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class product extends Model
{
    public $table='product';

    public $fillable=[
        'productname',
        'categoryid',
        'productprice',
        'productsku',
        'description',
        'productimage'
    ];

    public function category()
    {
        return $this->belongsTo(category::class,'categoryid');
    }

    public function setProductnameAttribute($value)
    {
        $this->attributes['productname'] = ucwords($value);
    }

    public function setDescriptionAttribute($value)
    {
        $this->attributes['description'] = ucwords($value);
    }


    use HasFactory;
}
