<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        collect(['General', 'Database', 'Frontend', 'Backend', 'Server', 'DevOps', 'Cloud'])
            ->each(fn ($category) => \App\Models\Category::create([
                'thumbnail' => null,
                'name' => $category,
                'slug' => str($category)->slug,
                'teaser' => "Nostrum et ipsa adipisci illo et. Fuga saepe et molestias quos. Sed odio et blanditiis vitae autem. Aut voluptatem accusantium voluptas error accusamus."
            ]));
    }
}
