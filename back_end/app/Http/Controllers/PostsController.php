<?php

namespace App\Http\Controllers;

use App\Models\PostComments;
use App\Models\Posts;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function index()
    {
        $posts = Posts::with('likes' , 'comments.likes' , 'saves')->get();
        if(Count( $posts ) === 0){
            return response()->json(['message' => 'no posts available']);
        }
        return $posts;
    }

    public function store(Request $request)
    {
        $formfields =  $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $post =  Posts::create([
            'title' => $formfields['title'],
            'body' => $formfields['body'],
            'username' => $request->user()->name,
            'user_id' => $request->user()->id
        ]);


        return response()->json(['message' => 'post create succusfuly', 'data' => $post], 200);
    }

    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $post = Posts::find($id);
        if (!$post) {
            return response()->json(['message' => 'no post found'], 404);
        }

        $user_id =  $request->user()->id;
        $post_found =  Posts::where('user_id', $user_id)->where('id', $id)->first();
        if (!$post_found) {
            return response()->json(['message' => 'its not your post to update it']);
        }


        $update =  $post->update($fields);
        if (!$update) {
            return response()->json([
                'message' => 'something went wrong'
            ]);
        }

        return response()->json(['mesaage' => 'post updated succusfuly', 'data' => $post], 200);
    }

    public function show($id)
    {
        $post = Posts::with('comments' , 'likes')->find($id);
        if (!$post) {
            return response()->json(['message' => 'no post found'], 404);
        }
        return response()->json($post);
    }

    public function destroy(Request $request, $id)
    {
        $user_id =  $request->user()->id;
        $post_found =  Posts::where('user_id', $user_id)->where('id', $id)->first();
        $post = Posts::find($id);
        if (!$post) {
            return response()->json(['message' => 'no post found'], 404);
        }

        if (!$post_found) {
            return response()->json(['message' => 'its not your post to delete it']);
        }

        $deleted = $post->delete();
        if (!$deleted) {
            return response()->json(['message' => 'something went wrong']);
        }
        return response()->json(['message' => 'post deleted succussfuly']);
    }


    public function user_posts(Request $request){
        $userId = $request->user()->id;
        $posts = Posts::where('user_id' , $userId)->with('likes')->get();

        return $posts;
    }


}
