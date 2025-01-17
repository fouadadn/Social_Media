<?php

namespace App\Http\Controllers;

use App\Models\PostComments;
use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PostCommentsController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    public function add_comment(Request $request, $postId)
    {
        $post = Posts::find($postId);

        if(!$post) return response()->json(["message" => "post not found"] , 404);
        $request->validate([
            'body' => 'required',
        ]);

        $comment =  PostComments::create([
            "username" => $request->user()->name,
            "profile_image" => $request->user()->profile_image,
            "body" => $request->body,
            'user_id' => $request->user()->id,
            "posts_id" => $postId
        ]);

        return response()->json([
            'message' => 'comment added succussfuly',
            "data" => $comment
        ], 200);
    }


    public function delete_comment(Request $request, $postId, $commentId)
    {
        $comment = PostComments::where('user_id', $request->user()->id)
        ->where('posts_id' , $postId)
        ->where("id" , $commentId);

        if (!$comment->first()) {
            return response()->json(["message" => 'comment not found'], 404);
        }

        if ($comment->first()->user_id !== $request->user()->id) {
            return response()->json(["message" => "you dont have the right to delete comment isn't yours"]);
        }


        $comment->delete();
        return response()->json([
            'message' => 'comment deleted succussfuly'
        ]);
    }

    public function reply(Request $request , $commentId){
        $comment = PostComments::find($commentId);

        if(!$comment){
            return response()->json(["message" => "comment not found"] , 404);
        }

        $request->validate([
            'body' => 'required',
            "post_comments_id" => 'required|int'
        ]);

        $reply =  PostComments::create([
            "username" => $request->user()->name,
            "body" => $request->body,
            'user_id' => $request->user()->id,
            "posts_id" => $comment->posts_id,
            "post_comments_id" => $commentId
        ]);

        return response()->json([
            'message' => 'reply added succussfuly',
            "data" => $reply
        ], 200);
    }
}
