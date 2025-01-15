<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\SavedPosts;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class SavedPostsController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    public function save_post (Request $request , $postId) {
        $post = Posts::find($postId);

        if(!$post){
            return response()->json(["message" => "post not found"] , 404);
        }

        $ifSaved = SavedPosts::where('posts_id' , $postId)->where('user_id' , $request->user()->id);

        if($ifSaved->first()){
            $ifSaved->delete();
            return response()->json(["message" => "post unsaved"]);
        }

        $savedPost =  SavedPosts::create([
            "user_id" => $request->user()->id,
            "posts_id" => $postId,
            "body" => $post->body,
            "title" => $post->title
        ]);

        return response()->json(["message" => 'post saved succusfuly' , 'data' => $savedPost] , 200);

    }
    public function get_saved_posts (Request $request){
        $user_id = $request->user()->id;
        $saved_posts = SavedPosts::where('user_id' , $user_id)->get();

        if(count($saved_posts , COUNT_RECURSIVE) === 0){
            return response()->json(['message' => 'no posts saved'])  ;
        }
        
        return $saved_posts;
    }

    public function post_saves(Request $request , $postId){
        $saves = SavedPosts::where('posts_id' , $postId)->where('user_id' , $request->user()->id)->get();

        if(count($saves , COUNT_RECURSIVE) === 0){
            return response()->json(['message' => 'no one saved this post']);
        }

        return response()->json(['data' => count($saves , COUNT_RECURSIVE)]);
    }
}
