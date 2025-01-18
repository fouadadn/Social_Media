<?php

namespace App\Http\Controllers;

use App\Models\PostLikes;
use App\Models\Posts;
use App\Models\User;
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
        $liked = PostLikes::where('user_id' , $request->user()->id)->where('posts_id' , $postId);

        foreach($post->likes as $like){
             if($like->user_id === $request->user()->id){

                $liked->delete();
                return response()->json(["message" => "post unliked"]);
             }
        }
        
        PostLikes::create([
            'user_id' => $request->user()->id,
            'profile_image' => $request->user()->profile_image,
            'posts_id' => $postId,
            'username' => $request->user()->name,
        ]);

        return response()->json(['message' => 'post liked']);
    }

    public function get_liked_posts(Request $request){
        $userId = $request->user()->id;
        $likedPosts = PostLikes::where('user_id' , $userId);

        if(count($likedPosts->get()) === 0){
            return response()->json(["message" => "no posts liked"]);
        }

        $posts = [];
        foreach($likedPosts->get() as $post){
            $post = Posts::find($post->posts_id);
            array_push($posts , $post);
        }

        return response()->json(["data" => $posts] , 200);
        
    }

    public function get_post_likes(Request $request , $postId){
        $likes = PostLikes::where('posts_id' , $postId);
        if(count($likes->get()) === 0){
            return response()->json(['message' => 'no likes in this post']);
        }

        $users = [];
        foreach($likes->get() as $user){
            $user = User::find($user->user_id);
            array_push($users , $user);
        }
        return response()->json(['data' => $users]);
    }
}
