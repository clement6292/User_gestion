<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {

        // Vérifiez si l'utilisateur a la permission de créer un super-admin
        if ($request->role === 'super-admin' && !$this->userCanCreateSuperAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        // Validation des données
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|in:user,admin,super-admin'
        ]);

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Hash du mot de passe
            'role' => $request->role,
        ]);

        return response()->json($user, 201); // Retourner l'utilisateur créé
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
{
    // Validation des données entrantes
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $id,
        'role' => 'required|string|max:255',
    ]);

    // Trouver l'utilisateur par ID
    $user = User::find($id);

    // Vérifiez si l'utilisateur existe
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé.'], 404);
    }

    // Mettre à jour l'utilisateur
    $user->name = $request->input('name');
    $user->email = $request->input('email');
    $user->role = $request->input('role');
    $user->save();

    return response()->json(['message' => 'Utilisateur mis à jour avec succès.', 'user' => $user], 200);
}

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Utilisateur supprimé avec succès.'], 200);
        }

        return response()->json(['message' => 'Utilisateur non trouvé.'], 404);
    }
}