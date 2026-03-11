'use server';

import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';

type ActionState = {
  success: boolean;
  message?: string;
  shortUrl?: string;
  id?: string;
};

export async function shortenUrl(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const url = formData.get('url') as string;

  if (!url || !url.startsWith('http')) {
    return { 
      success: false, 
      message: '❌ Please enter a valid URL (starting with http:// or https://)' 
    };
  }

  const id = nanoid(6);
  await kv.set(id, url, { ex: 60 * 60 * 24 * 365 }); // expires in 1 year

  const shortUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/${id}`
    : `http://localhost:3000/${id}`;

  return { success: true, shortUrl, id };
}