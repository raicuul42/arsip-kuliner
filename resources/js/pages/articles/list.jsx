import { UserLayout } from '@/layouts/user-layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    IconChevronLeft,
    IconChevronRight,
    IconCirclePlusFill,
    IconDotsVertical,
    IconOpenLink,
} from '@irsyadadl/paranoid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { AlertAction } from '@/components/alert-action';
import { useFilter } from '@/hooks/use-filter';
import { flashMessage } from '@/lib/utils';
import { toast } from 'sonner';

export default function List({ auth, ...props }) {
    const { data: articles, meta, links } = props.articles;
    const [params, setParams] = useState(props.state);
    useFilter({
        route: route('internal-articles.index'),
        values: params,
        only: ['articles'],
    });

    return (
        <div>
            <div className="mb-6 grid gap-6 sm:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>{meta.total}</CardTitle>
                        <CardDescription>Total Masakan</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{meta.total_visits}</CardTitle>
                        <CardDescription>Total Kunjungan</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{meta.unpublished_count}</CardTitle>
                        <CardDescription>Masakan Yang Belum Diterbitkan</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <Card>
                <div className="flex flex-col justify-between gap-y-6 p-6 md:flex-row md:items-center md:gap-y-0">
                    <CardHeader className="p-0">
                        <CardTitle>Daftar Masakan</CardTitle>
                        <CardDescription>{meta.total} masakan yang terdapat pada aplikasi</CardDescription>
                    </CardHeader>
                    <div className="flex max-w-md flex-col gap-2 md:flex-row">
                        <Input
                            value={params?.search}
                            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
                            placeholder="Cari..."
                        />
                        <div className="grid grid-cols-2 gap-x-2 md:flex">
                            <Select value={params?.status} onValueChange={(e) => setParams({ ...params, status: e })}>
                                <SelectTrigger className="md:w-40">
                                    <SelectValue placeholder={params?.status ?? 'Status'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Arspikan">Diarsipkan</SelectItem>
                                    <SelectItem value="Ditunda">Ditunda</SelectItem>
                                    <SelectItem value="Diterbitkan">Diterbitkan</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button asChild>
                                <Link href={route('internal-articles.create')}>
                                    <IconCirclePlusFill className="mr-2 size-4" />
                                    Tambah
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6 [&_thead]:border-t">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Nama Masakan</TableHead>
                                {auth.user.is_admin && <TableHead>Penulis</TableHead>}
                                <TableHead>Status</TableHead>
                                <TableHead>Dibuat pada</TableHead>
                                <TableHead>Diterbitkan pada</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((article, index) => (
                                <TableRow key={article.id}>
                                    <TableCell>{meta.from + index}</TableCell>
                                    <TableCell>
                                        <a href={route('articles.show', [article])} target="_blank">
                                            {article.title} <IconOpenLink className="ml-1 inline size-3" />
                                        </a>
                                    </TableCell>
                                    {auth.user.is_admin && <TableCell>{article.user?.name}</TableCell>}
                                    <TableCell>
                                        <Badge variant={article.status === 'Diterbitkan' ? 'default' : 'outline'}>
                                            {article.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{article.created_at}</TableCell>
                                    <TableCell>{article.published_at}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <IconDotsVertical className="size-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuLabel>ID Masakan: {article.id}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('internal-articles.edit', [article])}>
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {auth.user.is_admin && (
                                                        <DropdownMenuGroup>
                                                            <AlertAction
                                                                trigger={
                                                                    <DropdownMenuItem
                                                                        onSelect={(e) => e.preventDefault()}
                                                                    >
                                                                        {article.status !== 'Diterbitkan'
                                                                            ? 'Diterbitkan'
                                                                            : 'Belum Diterbitkan'}
                                                                    </DropdownMenuItem>
                                                                }
                                                                title={
                                                                    article.status !== 'Diterbitkan'
                                                                        ? 'Terbitkan Masakan'
                                                                        : 'Batalkan Penerbitan'
                                                                }
                                                                description={
                                                                    article.status !== 'Diterbitkan'
                                                                        ? 'Apakah Anda yakin ingin mempublikasikan masakan ini?'
                                                                        : 'Apakah Anda yakin ingin membatalkan publikasi masakan ini?'
                                                                }
                                                                action={() =>
                                                                    router.put(
                                                                        route('internal-articles.approve', [article]),
                                                                        {},
                                                                        {
                                                                            preserveScroll: true,
                                                                            onSuccess: (params) => {
                                                                                const flash = flashMessage(params);
                                                                                if (flash) {
                                                                                    toast[flash.type](flash.message);
                                                                                }
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                            <DropdownMenuSeparator />
                                                            <AlertAction
                                                                trigger={
                                                                    <DropdownMenuItem
                                                                        onSelect={(e) => e.preventDefault()}
                                                                    >
                                                                        Hapus
                                                                    </DropdownMenuItem>
                                                                }
                                                                title="Hapus Masakan"
                                                                description="Apakah Anda yakin ingin menghapus artikel ini?"
                                                                action={() =>
                                                                    router.delete(
                                                                        route('internal-articles.destroy', [article]),
                                                                        {
                                                                            preserveScroll: true,
                                                                            onSuccess: (params) => {
                                                                                const flash = flashMessage(params);
                                                                                if (flash) {
                                                                                    toast[flash.type](flash.message);
                                                                                }
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </DropdownMenuGroup>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="justify-between border-t pt-6 text-sm text-muted-foreground">
                    <span>
                        Menampilkan {meta.from} dari {meta.total} masakan.
                    </span>
                    {meta.has_pages && (
                        <div className="flex items-center gap-x-1">
                            <Button asChild size="sm" variant="outline">
                                {links.prev ? (
                                    <Link href={links.prev}>
                                        <IconChevronLeft className="-ml-1 mr-1 size-4" />
                                        Prev
                                    </Link>
                                ) : (
                                    <span>Prev</span>
                                )}
                            </Button>
                            <Button asChild size="sm" variant="outline">
                                {links.next ? (
                                    <Link href={links.next}>
                                        Next
                                        <IconChevronRight className="-mr-1 ml-1 size-4" />
                                    </Link>
                                ) : (
                                    <span>Next</span>
                                )}
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

List.layout = (page) => <UserLayout title="Dashboard" children={page} />;
