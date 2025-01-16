<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedPosts extends Model
{
    protected $fillable = [
        'user_id' , 'posts_id' , 'body' , 'title' 
    ];
}
