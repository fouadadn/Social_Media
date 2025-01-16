<?php

namespace App\Http\Controllers;

use App\Models\CommentLikes;
use App\Models\PostComments;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CommentLikesController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    public function like_comment(Request $request, $commentId)
    {
        $comment = PostComments::find($commentId);

        if (!$comment) return response()->json(['message' => 'comment not found'], 404);

        $ifliked = CommentLikes::where('user_id', $request->user()->id)->where('post_comments_id', $commentId);

        if ($ifliked->first()) {
            $ifliked->delete();
            return response()->json(['message' => 'comment unliked']);
        }

        CommentLikes::create([
            'user_id' => $request->user()->id,
            'post_comments_id' => $commentId,
        ]);

        return response()->json(['message' => 'comment liked']);
    }
}
