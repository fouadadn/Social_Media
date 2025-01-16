<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Followers extends Model
{
    protected $fillable = [
        'username_of_follower' , 'username_of_following' , 'follower_id' , 'user_id'
    ];
}
