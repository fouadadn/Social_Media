<?php

namespace App\Http\Controllers;

use App\Models\PostLikes;
use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostLikesController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    public function like(Request $request , $postId){

        $post = Posts::with('likes')->find($postId);
        foreach($post->likes as $like){
             if($like->user_id === $request->user()->id){
                return response()->json(["message" => "you already liked this post"]);
             }
        }
        
        PostLikes::create([
            'user_id' => $request->user()->id,
            'posts_id' => $postId,
            'username' => $request->user()->name,
        ]);

        return response()->json(['message' => 'post liked']);
    }

    public function unlike(Request $request , $postId) {
        $like = PostLikes::where('user_id' , $request->user()->id)->where('posts_id' , $postId);
        
        if(!$like){
            return response()->json(['message' => 'you dont liked this to dislike it']);
        }
        $like->delete();
        return response()->json(['message' => 'post disliked']);

    }
}
