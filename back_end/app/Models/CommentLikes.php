<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommentLikes extends Model
{
    protected $fillable = [
        'user_id',
        'post_comments_id'
    ] ;

    public function comment (){
        return $this->belongsTo(PostComments::class , 'PostComments_id');
    }
}
