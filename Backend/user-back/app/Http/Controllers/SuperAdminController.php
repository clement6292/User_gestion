<?php

namespace App\Http\Controllers;


class SuperAdminController extends Controller
{
    public function index()
    {
        // Logique du tableau de bord super admin
        return response()->json(['message' => 'Welcome to the Super Admin Dashboard']);
    }
}