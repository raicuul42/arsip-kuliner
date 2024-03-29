<?php

namespace Database\Seeders;

use App\Models;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Models\User::factory(10)->hasArticles(12)->create();

        $articles = Models\Article::all();
        $tagIds = Models\Tag::pluck('id');

        $articles->each(fn ($article) => $article->tags()->attach($tagIds->random(3)->toArray()));
    }
}
