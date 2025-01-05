<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostLikes extends Model
{
    protected $fillable = ['user_id' , 'posts_id' , 'username'];

    public function post (){
        return $this->belongsTo(Posts::class , 'post_id');
    }
}
