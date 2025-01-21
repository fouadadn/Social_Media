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

    public function search_user(){
        $users = User::where('name' , 'like' , '%' . request('name') . '%')->get();
        if(count($users) === 0){
            return response()->json(['message' => 'no users found']);
        }
        return response()->json(['data' => $users]);
    }

    public function users(Request $request)
    {
        $users = User::with(['following','posts.likes', 'posts.comments' => function ($query) {return $query->WithoutReplies();} , 'posts.comments.replies' ,'posts.comments.likes' , 'followers', 'saved_posts' ])->where('id' , '!=' , $request->user()->id )->get();
        return  response()->json(["data" => $users]);
    }

    public function user_info(Request $request ,$userId){
        $user = User::with(['following','posts.likes', 'posts.comments' => function ($query) {return $query->WithoutReplies();} , 'posts.comments.replies' ,'posts.comments.likes' , 'followers', 'saved_posts' ])->find($userId); 
        if(!$user){
            return response()->json(['message' => 'user not found'] , 404);
        }
        return response()->json(["data" => $user]);
    }

    public function delete_User(Request $request){
        $user = $request->user();
        $user->delete();
        return response()->json(['message' => 'user deleted successfully']);

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


    public function update_User(Request $request){
        $user = $request->user();

        $request->validate(['old_password' => 'required']) ;

        if(!Hash::check($request->old_password , $user->password)){
            return 'password is incorrect'; 
        }

        $fields =  $request->validate([
            'name' => 'string',
            'email' => 'string|unique:users',
            'new_password' => 'string',
            'profile_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096',
            'cover_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:4096',
            'bio' => 'string'
        ]);

        if($request->hasFile('profile_image')){
            $fields['profile_image'] = $request->file('profile_image')->store('profile_images', "public");
        }
        if($request->hasFile('cover_image')){
            $fields['cover_image'] = $request->file('cover_image')->store('cover_images', "public");
        }
        if($request->has('new_password')){
            $fields['password'] = Hash::make($request->new_password);
        }
        
          
        $newUser = $user->update($fields);
        if($newUser){
            return response()->json(['message' => 'user updated successfully' , 'if updated' => $newUser]);
        }

        return response()->json(['message' => 'somthing went wrong' , 'if updated ' => $newUser]);
        
    }
}
