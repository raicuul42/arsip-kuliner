<?php

namespace App\Enums;

enum ArticleStatus: string
{
    case Dirancang = 'Dirancang';
    case Ditunda = 'Ditunda';
    case Diterbitkan = 'Diterbitkan';
    case Diarsipkan = 'Diarsipkan';

    public static function toSelectArray(): array
    {
        return collect(self::cases())->map(fn ($item) => [
            'value' => $item->value,
            'label' => $item->name,
        ])->values()->toArray();
    }
}
