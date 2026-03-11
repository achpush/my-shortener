import { kv } from '@vercel/kv';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: { slug: string } }) {
  const url = await kv.get(params.slug);

  if (!url) {
    redirect('/'); // not found → go home
  }

  redirect(url as string);
}