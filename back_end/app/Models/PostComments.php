<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostComments extends Model
{
    protected $fillable = [
        'username',
        'user_id',
        'posts_id',
        'body',
        "profile_image",
        'post_comments_id'
    ];



    public function post()
    {
        return $this->belongsTo(PostComments::class, 'posts_id');
    }
    public function likes()
    {
        return $this->hasMany(CommentLikes::class);
    }
    public function scopeWithoutReplies($query)
    {
        return $query->whereNull('post_comments_id');
    }
    public function replies()
    {
        return $this->hasMany(PostComments::class, 'post_comments_id');
    }
}
