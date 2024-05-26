import React, { useRef, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { InputErrorMessage } from '@/components/input-error-message';

export function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef < HTMLInputElement > null;
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Menghapus Akun</CardTitle>
                <CardDescription>
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. sebelum
                    menghapus akun Anda, silakan unduh data atau informasi apa pun yang ingin Anda simpan.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <AlertDialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
                    <AlertDialogTrigger
                        className={buttonVariants({
                            variant: 'destructive',
                        })}
                    >
                        Hapus Akun
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Akun</AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus akun Anda? Setelah akun Anda dihapus, semua sumber
                                daya dan datanya akan dihapus secara permanen. Masukkan kata sandi Anda untuk
                                mengonfirmasi bahwa Anda ingin menghapus akun Anda secara permanen.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <div className="mt-4">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => setData('password', e.currentTarget.value)}
                            />

                            <InputErrorMessage message={errors.password} className="mt-2" />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteUser} disabled={processing}>
                                Lanjutkan
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
}
