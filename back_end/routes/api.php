<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostCommentsController;
use App\Http\Controllers\PostLikesController;
use App\Http\Controllers\PostsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user()->with('posts')->first();
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