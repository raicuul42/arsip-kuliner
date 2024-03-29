<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Raisul Amin R',
            'email' => 'me@arliner.com',
            'password' => bcrypt('password'),
        ])->assignRole(Role::create([
            'name' => 'admin',
            'guard_name' => 'web',
        ]));
    }
}
