<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as ResourcesUser;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return  UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {  
        $request->validate([
            'email' => ['unique:users,email']
        ],[
            'email.unique' => "Email existed"
        ]);
        $user = User::create([
            'name' => $request->name, 
            'email' => $request->email, 
            'phone' => $request->phone, 
            'role' => $request->role, 
            'password' => Hash::make($request->password),
        ]); 
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
