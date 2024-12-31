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
            new Middleware('auth:sunctum', except: ['register', 'login'])
        ];
    }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed'

        ]);

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
