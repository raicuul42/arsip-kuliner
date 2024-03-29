import React from 'react';
import { InputErrorMessage } from '@/components/input-error-message';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        username: auth.user.username ?? '',
        name: auth.user.name ?? '',
        email: auth.user.email ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account's profile information and email address.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            className="mt-1"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoFocus
                            autoComplete="name"
                        />

                        <InputErrorMessage className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <Label htmlFor="username">Username</Label>

                        <Input
                            id="username"
                            type="text"
                            value={data.username}
                            className="mt-1"
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputErrorMessage className="mt-2" message={errors.username} />
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            className="mt-1"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="email"
                        />

                        <InputErrorMessage className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-muted-foreground underline hover:text-slate-900"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    A new verification link has been sent to your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>

                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-muted-foreground">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
