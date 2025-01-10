<?php

namespace App\Http\Controllers;

use App\Models\Followers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class FollowersController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum')
        ];
    }
    public function follow(Request $request, $user_id)
    {   
        $followed = Followers::where('follower_id' , $request->user()->id)->where('user_id' , $user_id);

        $user = User::find($user_id);
        if(!$user){
            return response()->json(['message' => 'user not found'] , 404);
        }
        if($followed->first()){
            $followed->delete();
            return response()->json(['message' => 'you unfollowed this person']);
        }

        $follower =  Followers::create([
            'username' => $request->user()->name,
            'follower_id' => $request->user()->id,
            'user_id' => $user_id
        ]);

        $lifollowiti = User::find($user_id);
        return response()->json(['message' => "now you follow $lifollowiti->name ", 'data' => $follower], 200);
    }

    public function followers(Request $request){
        $followers = Followers::find($request->user()->id);

        if(!$followers){
            return response()->json(['message' => 'you have no follower']);
        }

        return response()->json(['data' => $followers]);
    }

    public function following(Request $request){
        $following = Followers::where('follower_id' , $request->user()->id)->get();

        $users = [];
        foreach($following as $foll){
            $user =  User::find($foll->user_id);
            array_push($users , $user);
        }

        return $users;
    }
}
