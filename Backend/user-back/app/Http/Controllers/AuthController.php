<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // public function showLoginForm()
    // {
    //     return view('auth.login');
    // }

    public function login(Request $request)
    {
        // Validation des données d'entrée
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        // $monUser=Auth::user();
      

    
        // Récupération de l'utilisateur
        $user = User::where('email', $request->email)->first();
    
        // Vérification des informations d'identification
        if ($user && Auth::attempt($request->only('email', 'password'))) {
            // Authentification réussie, création du token
            $token = $user->createToken('Laravel')->plainTextToken;
    
            // Retourner le token et le rôle
            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        }
    
        // Authentification échouée
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        Log::info("un test ici", ['email' => $request->email]);

        // Validation des données d'inscription
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // Par défaut
        ]);

        // Création du token après l'inscription
        $token = $user->createToken('YourAppName')->plainTextToken;

        // Retourner le token et le rôle
        return response()->json([
            'token' => $token,
            'role' => $user->role,
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}