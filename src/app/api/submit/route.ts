import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { render } from '@react-email/components';
import Email from '@/emails/Email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const avatarFile = formData.get('image') as File | null;
    const ticket_id = formData.get('ticket_id') as string;

    let imageUrl: string | null = null;

    // Upload avatar to Supabase storage
    if (avatarFile) {
      const arrayBuffer = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}_${avatarFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(fileName, buffer, { contentType: avatarFile.type });

      if (uploadError) throw new Error(uploadError.message);

      const { data: publicData } = supabase.storage.from('user-images').getPublicUrl(fileName);

      imageUrl = publicData.publicUrl;
    }

    // Insert into database
    const { data: insertedData, error: dbError } = await supabase
      .from('ticket_db')
      .insert([{ ticket_id, name, email, username, image: imageUrl }])
      .select('*')
      .single();

    if (dbError) throw new Error(dbError.message);

    // Render React email component
    const html = await render(
      Email({
        ticket_id,
        name,
        username,
      })
    );

    // Send email via Resend
    const { error: sendError } = await resend.emails.send({
      from: 'Tikko Ticket <onboarding@resend.dev>',
      to: email,
      subject: 'Get ready for Coding Conf 2026 🎉',
      html,
    });

    if (sendError) throw new Error(sendError.message);

    return NextResponse.json({ success: true, data: insertedData });
  } catch (err: unknown) {
    let message = 'Unknown error';

    if (err instanceof Error) {
      message = err.message;
    }

    console.error('Error in /api/submit:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
