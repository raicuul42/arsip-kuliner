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
                ->orderBy('name', 'asc')
                ->paginate(9)
        )->additional(['meta' => ['has_pages' => $self->hasPages()]]);

        return inertia('category-list/index', [
            'categories' => fn () => $categories,
            'page_meta' => [
                'title' => "Daerah Kuliner",
                'description' => "Cari dan temukan kuliner Indonesia berdasarkan provinsi-provinsi di Indonesia.",
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
    }
}
