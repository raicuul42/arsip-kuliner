<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        collect(['Laravel', 'PHP', 'Javascript', 'Vue.js', 'React.js', 'Angular.js', 'Node.js', 'Tailwind CSS', 'Alpine.js', 'Livewire', 'Inertia.js', 'Jetstream', 'Fortify', 'Sail', 'Docker', 'AWS', 'Google Cloud', 'Azure', 'Digital Ocean', 'Vagrant', 'Homestead', 'Forge', 'Envoyer', 'Envoy', 'Horizon', 'Scout', 'Telescope', 'Nova'])
            ->each(fn ($tag) => \App\Models\Tag::create([
                'thumbnail' => null,
                'name' => $tag,
                'slug' => str($tag)->slug,
                'teaser' => "Nostrum et ipsa adipisci illo et. Fuga saepe et molestias quos. Sed odio et blanditiis vitae autem. Aut voluptatem accusantium voluptas error accusamus."
            ]));
    }
}
