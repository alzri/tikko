import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const avatarFile = formData.get('image') as File | null;

  let imageUrl: string | null = null;

  if (avatarFile) {
    const arrayBuffer = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}_${avatarFile.name}`;

    // Upload to  Storage
    const { error: uploadError } = await supabase.storage
      .from('user-images')
      .upload(fileName, buffer, { contentType: avatarFile.type });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }
    const { data } = supabase.storage.from('user-images').getPublicUrl(fileName);
    imageUrl = data.publicUrl;
  }

  // Insert data into db
  const { error } = await supabase
    .from('ticket_db')
    .insert([{ name, email, username, image: imageUrl }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
