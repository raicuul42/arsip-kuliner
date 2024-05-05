<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TagListController extends Controller
{
    public static function middleware()
    {
        return [
            new Middleware(
                middleware: ['auth'],
                except: ['index', 'show']
            )
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Resources\TagBlockResource::collection(
            $self = Tag::query()
                ->select(['id', 'name', 'slug', 'teaser', 'thumbnail'])
                ->withCount('articles')
                ->oldest('created_at')
                ->paginate(12)
        )->additional(['meta' => ['has_pages' => $self->hasPages()]]);

        return inertia('tag-list/index', [
            'tags' => fn () => $tags,
            'page_meta' => [
                'title' => "Jenis Kuliner",
                'description' => "Temukan ragam kuliner Indonesia berdasarkan jenis masakan.",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
    }
}
