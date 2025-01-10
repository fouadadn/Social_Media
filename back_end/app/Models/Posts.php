<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $fillable = [
        'title',
        'body',
        'user_id',
        'username'
    ];

    public function user()
    {
        return $this->BelongsTo(User::class, 'user_id');
    }

    public function likes()
    {
        return $this->hasMany(PostLikes::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComments::class);
    }
}
