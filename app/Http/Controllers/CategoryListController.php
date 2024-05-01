<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CategoryListController extends Controller implements HasMiddleware
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
        $categories = Resources\CategoryBlockResource::collection(
            $self = Category::query()
                ->select(['id', 'name', 'slug', 'teaser', 'thumbnail'])
                ->withCount('articles')
                ->latest('updated_at')
                ->paginate(9)
        )->additional(['meta' => ['has_pages' => $self->hasPages()]]);

        return inertia('category-list/index', [
            'categories' => fn () => $categories,
            'page_meta' => [
                'title' => "Asal Daerah",
                'description' => "Cari dan temukan kuliner Indonesia berdasarkan provinsi-provinsi Indonesia di sini.",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $articles = Resources\ArticleBlockResource::collection($self = $category->articles()
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
                'title' => $category->name,
                'description' => "All articles in the {$category->name} category.",
            ],
        ]);
    }
}
