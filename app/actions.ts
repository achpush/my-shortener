'use server';

import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';

export async function shortenUrl(prevState: any, formData: FormData) {
  const url = formData.get('url') as string;

  if (!url || !url.startsWith('http')) {
    return { success: false, message: '❌ Please enter a valid URL' };
  }

  const id = nanoid(6); // short random code like "x7kP9m"
  await kv.set(id, url, { ex: 60 * 60 * 24 * 365 }); // expires in 1 year

  const shortUrl = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/${id}`;

  return { success: true, shortUrl, id };
}