<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        collect(['General', 'Database', 'Frontend', 'Backend', 'Server', 'DevOps', 'Cloud'])
            ->each(fn ($category) => \App\Models\Category::create([
                'name' => $category,
                'slug' => str($category)->slug,
            ]));
    }
}
