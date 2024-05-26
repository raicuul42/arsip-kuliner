<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagRequest;
use App\Http\Resources;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Resources\TagListResource::collection(
            $self = Tag::query()
                ->select(['id', 'name', 'slug'])
                ->withCount('articles')
                ->latest('updated_at')
                ->paginate(10)
        )->additional(['meta' => ['has_pages' => $self->hasPages()]]);

        return inertia('tags/index', [
            'tags' => fn () => $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('tags/form', [
            'tag' => new Tag,
            'page_meta' => [
                'title' => 'Tambah Jenis Kuliner',
                'description' => 'Tambah jenis kuliner baru di bawah ini.',
                'url' => route('tags.store'),
                'method' => 'post',
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TagRequest $request)
    {
        Tag::create([
            'name' => $request->name,
            'slug' => str($request->name)->slug(),
            'thumbnail' => $request->file('thumbnail') ? $request->file('thumbnail')->store('thumbnails', 'public') : null,
            'teaser' => $request->teaser,
        ]);

        return to_route('tags.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag)
    {
        $articles = Resources\ArticleBlockResource::collection($self = $tag->articles()
            ->select(['id', 'category_id', 'user_id', 'title', 'slug', 'thumbnail', 'teaser', 'published_at'])
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
                'title' => $tag->name,
                'description' => $tag->teaser,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        return inertia('tags/form', [
            'tag' => $tag,
            'page_meta' => [
                'title' => 'Edit Jenis Kuliner',
                'description' => 'Edit jenis kuliner dibawah ini.',
                'url' => route('tags.update', $tag),
                'method' => 'put',
            ],
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        $tag->update([
            'name' => $request->name,
            'slug' => str($request->name)->slug(),
            'thumbnail' => $request->file('thumbnail') ? $request->file('thumbnail')->store('thumbnails', 'public') : '',
            'teaser' => $request->teaser,
        ]);

        return to_route('tags.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        if ($tag->articles()->exists()) {
            return back();
        }

        $tag->delete();

        return back();
    }
}
