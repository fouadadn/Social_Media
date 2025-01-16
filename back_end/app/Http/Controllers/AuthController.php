<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['register', 'login'])
        ];
    }

    public function users()
    {
        $users = User::with(['following','posts.likes', 'posts.comments' => function ($query) {return $query->WithoutReplies();} , 'posts.comments.replies'    , 'followers', 'saved_posts' ])->get();

        return  response()->json(["data" => $users]);
    }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
            'profile_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096',
            'cover_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096',

        ]);
        if ($request->hasFile('profile_image')) {
            $fields['profile_image'] = $request->file('profile_image')->store('profile_images', "public");
        }

        if ($request->hasFile('cover_image')) {
            $fields['cover_image'] = $request->file('cover_image')->store('cover_images', "public");
        }

        $user = User::create($fields);
        $token = $user->createToken($request->name);

        return response()->json([
            'message' => 'you account created succesfuly',
            'data' => $user,
            'token' => $token->plainTextToken
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            "email" => 'required',
            "password" => 'required'
        ]);

        $user = User::where('email', $request->email)->with('posts')->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'email or password is incorrect']);
        }

        $token = $user->createToken($user->name);

        return response()->json([
            'message' => 'you are logged in',
            'data' => $user,
            'token' => $token->plainTextToken
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'you are logged out'], 200);
    }
}
