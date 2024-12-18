<?php

namespace App\Http\Controllers;



class AdminController extends Controller
{
    public function index()
    {
        // Logique du tableau de bord admin
        return response()->json(['message' => 'Welcome to the Admin Dashboard']);
    }
}