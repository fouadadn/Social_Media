<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostComments extends Model
{
    protected $fillable = [
        'username' , 'user_id' , 'posts_id' , 'body'
    ];
    


    public function post(){
        return $this->belongsTo(PostComments::class , 'posts_id');
    }
    public function likes(){
        return $this->hasMany(CommentLikes::class);
    }
}
