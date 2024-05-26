<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Resources\CategoryListResource::collection(
            $self = Category::query()
                ->select(['id', 'name', 'slug'])
                ->withCount('articles')
                ->orderBy('name', 'asc')
                ->paginate(10)
        )->additional(['meta' => ['has_pages' => $self->hasPages()]]);

        return inertia('categories/index', [
            'categories' => fn () => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('categories/form', [
            'category' => new Category,
            'page_meta' => [
                'title' => 'Tambah Daerah Kuliner',
                'description' => 'Tambah daerah kuliner baru di bawah ini.',
                'url' => route('categories.store'),
                'method' => 'post',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        Category::create([
            'name' => $request->name,
            'slug' => str($request->name)->slug(),
            'thumbnail' => $request->file('thumbnail') ? $request->file('thumbnail')->store('thumbnails', 'public') : null,
            'teaser' => $request->teaser,
        ]);

        return to_route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        $articles = Resources\ArticleBlockResource::collection($self = $category->articles()
            ->select(['id', 'category_id', 'user_id', 'title', 'slug', 'teaser', 'thumbnail', 'published_at'])
            ->with(['category:id,name,slug', 'user:id,name'])
            ->where('status', \App\Enums\ArticleStatus::Diterbitkan)
            ->latest('published_at')
            ->paginate(9))
            ->additional([
                'meta' => ['has_pages' => $self->hasPages()]
            ]);

        return inertia('articles/index', [
            'articles' => fn () => $articles,
            'page_meta' => [
                'title' => $category->name,
                'description' => $category->teaser,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia('categories/form', [
            'category' => $category,
            'page_meta' => [
                'title' => 'Edit Daerah Kuliner',
                'description' => 'Edit daerah kuliner di bawah ini.',
                'url' => route('categories.update', $category),
                'method' => 'put',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->update([
            'name' => $request->name,
            'slug' => str($request->name)->slug(),
            'thumbnail' => $request->file('thumbnail') ? $request->file('thumbnail')->store('thumbnails', 'public') : '',
            'teaser' => $request->teaser,
        ]);

        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->articles()->exists()) {
            return back();
        }

        $category->delete();

        return back();
    }
}
