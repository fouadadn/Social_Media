<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $fillable = [
        'title' , 'body' , 'user_id'
    ];

    public function user(){
        return $this->BelongsTo(User::class , 'user_id');
    }
}
