import { UserLayout } from '@/layouts/user-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/file-upload';
import { InputErrorMessage } from '@/components/input-error-message';
import { Textarea } from '@/components/ui/textarea';

export default function Form(props) {
    const { data, setData, post, errors, processing } = useForm({
        thumbnail: null,
        name: props.category?.name ?? '',
        teaser: props.category?.teaser ?? '',
        _method: props.page_meta.method,
    });

    function submit(e) {
        e.preventDefault();
        post(props.page_meta.url);
    }

    function onChange(e) {
        setData(e.target.name, e.target.value);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.page_meta.title}</CardTitle>
                <CardDescription>{props.page_meta.description}</CardDescription>
            </CardHeader>
            <form onSubmit={submit}>
                <CardContent>
                    <div className="space-y-6">
                        <div className="max-w-2xl space-y-1">
                            <Label>Thumbnail</Label>
                            <FileUpload onChange={(file) => setData('thumbnail', file)} />
                            <InputErrorMessage message={errors.thumbnail} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="name">Nama Daerah</Label>
                            <Input
                                label="Name"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                error={errors.name}
                            />
                            <InputErrorMessage message={errors.name} />
                        </div>
                        <div className="space-y-1">
                            <Label>Teaser</Label>
                            <Textarea name="teaser" onChange={onChange} value={data.teaser} />
                            <InputErrorMessage message={errors.teaser} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={processing}>Simpan</Button>
                </CardFooter>
            </form>
        </Card>
    );
}

Form.layout = (page) => <UserLayout title={page.props.page_meta.title}>{page}</UserLayout>;
