<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentLikesController;
use App\Http\Controllers\FollowersController;
use App\Http\Controllers\PostCommentsController;
use App\Http\Controllers\PostLikesController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\SavedPostsController;
use App\Models\Followers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    $user_id = $request->user()->id;
    $user_request = User::with('posts.likes', 'posts.comments' ,'followers' , 'saved_posts')->find($user_id);

    $following = Followers::where('follower_id', $user_id)->get();
    $users = [];
    foreach ($following as $foll) {
        $user =  User::find($foll->user_id);
        array_push($users, $user);
    }

    $user_request->following = $users;
    return $user_request;
})->middleware('auth:sanctum');

//auth
Route::get('/users' , [AuthController::class , 'users']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

//posts
Route::apiResource('posts', PostsController::class)->middleware('auth:sanctum');
Route::get('/user_posts', [PostsController::class, 'user_posts'])->middleware('auth:sanctum');

//likes 
Route::post('/post/{postId}/like', [PostLikesController::class, 'like']);
Route::get('/get_liked_posts', [PostLikesController::class, 'get_liked_posts']);
Route::get('/get_post_likes/{postId}', [PostLikesController::class, 'get_post_likes']);

//comments 
Route::post('/post/{postId}/add_comment', [PostCommentsController::class, 'add_comment']);
Route::post('/post/{postId}/delete_comment/{commentId}', [PostCommentsController::class, 'delete_comment']);

//comment likes
Route::post('/like_comment/{commentId}' , [CommentLikesController::class , 'like_comment']);

//follow
Route::post('/follow/{userId}', [FollowersController::class, 'follow']);
Route::get('/get_followers', [FollowersController::class, 'followers']);
Route::get('/get_following', [FollowersController::class, 'following']);

//save post
Route::post('/save_post/{postId}' , [SavedPostsController::class , 'save_post']);
Route::get('/saved_post' , [SavedPostsController::class , 'get_saved_posts']);
Route::get('/post_saves/{postId}', [SavedPostsController::class , 'post_saves']);

