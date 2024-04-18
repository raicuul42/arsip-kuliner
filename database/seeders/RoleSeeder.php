<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Raisul Amin R',
            'email' => 'me@arsipkuliner.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ])->assignRole(Role::create([
            'name' => 'admin',
            'guard_name' => 'web',
        ]));
    }
}
