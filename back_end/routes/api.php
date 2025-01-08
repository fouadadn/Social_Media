<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FollowersController;
use App\Http\Controllers\PostCommentsController;
use App\Http\Controllers\PostLikesController;
use App\Http\Controllers\PostsController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {

    $user_id = $request->user()->id;
    $user = User::with('posts' , 'followers')->find($user_id);
    return $user;
})->middleware('auth:sanctum');

Route::post('/register' , [AuthController::class , 'register']);
Route::post('/login' , [AuthController::class , 'login']);
Route::post('/logout' , [AuthController::class , 'logout']);

Route::apiResource('posts' , PostsController::class)->middleware('auth:sanctum');
Route::get('/user_posts' , [PostsController::class , 'user_posts'])->middleware('auth:sanctum');

//likes 
Route::post('/post/{postId}/like' , [PostLikesController::class , 'like']);
Route::post('/post/{postId}/unlike' , [PostLikesController::class , 'unlike']);

//comments 
Route::post('/post/{postId}/add_comment' , [PostCommentsController::class , 'add_comment']);
Route::post('/post/{postId}/delete_comment/{commentid}' , [PostCommentsController::class , 'delete_comment']);

//follow
Route::post('/follow/{userId}' , [FollowersController::class , 'follow']);
Route::get('/get_followers' ,[FollowersController::class , 'followers']);
Route::get('/get_following' ,[FollowersController::class , 'following']);