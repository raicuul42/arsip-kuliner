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
                ->latest('updated_at')
                ->paginate(9)
        )->additional(['meta' => ['has_pages' => $self->hasPages()]]);

        return inertia('tag-list/index', [
            'tags' => fn () => $tags,
            'page_meta' => [
                'title' => "Tags",
                'description' => "All Tags from this app.",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        $articles = Resources\ArticleBlockResource::collection($self = $tag->articles()
            ->select(['id', 'category_id', 'user_id', 'title', 'slug', 'thumbnail', 'teaser', 'published_at'])
            ->with(['category:id,name,slug', 'user:id,name'])
            ->where('status', \App\Enums\ArticleStatus::Published)
            ->latest('published_at')
            ->paginate(9))
            ->additional([
                'meta' => ['has_pages' => $self->hasPages()]
            ]);

        return inertia('articles/index', [
            'articles' => fn () => $articles,
            'page_meta' => [
                'title' => $tag->name,
                'description' => "All articles in the {$tag->name} tag.",
            ],
        ]);
    }
}
