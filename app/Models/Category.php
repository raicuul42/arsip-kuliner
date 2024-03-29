<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Traits\HasLabelValue;

class Category extends Model
{
    use HasLabelValue;

    protected $guarded = [];

    public function articles(): HasMany
    {
        return $this->hasMany(Article::class, 'category_id');
    }
}
