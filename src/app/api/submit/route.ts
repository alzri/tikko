import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const ticket_id = formData.get('ticket_id') as string;
    const avatarFile = formData.get('image') as File | null;
    let imageUrl = '';

    // Upload avatar to Supabase if present
    if (avatarFile) {
      const arrayBuffer = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${Date.now()}_${avatarFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(fileName, buffer, { contentType: avatarFile.type, upsert: false });

      if (uploadError) throw new Error(uploadError.message);

      const { data: publicData } = supabase.storage.from('user-images').getPublicUrl(fileName);

      imageUrl = publicData.publicUrl;
    }

    // Insert ticket into Supabase
    const { data: ticket, error: insertError } = await supabase
      .from('ticket_db')
      .insert([{ name, email, username, image: imageUrl }])
      .select('*')
      .single();

    if (insertError) throw new Error(insertError.message);

    // Generate HTML for email instead of JSX
    const html = `
      <html>
        <body class="email-container">
          <h1>Your Ticket Confirmation</h1>
          <p>Hello ${name},</p>
          <p>Here is your ticket:</p>
          <ul>
            <li>Name: ${name}</li>
            <li>Username: ${username}</li>
            <li>Ticket ID: #${ticket_id}</li>
          </ul>
          ${imageUrl ? `<img src="${imageUrl}" alt="Avatar" width="100" />` : ''}
          <hr />
          <p style="color: #666; font-size: 12px;">
            This message was intended for ${name}. If you did not create this ticket, please ignore this email.
          </p>
        </body>
      </html>
    `;

    // Send email via Resend
    const { data: emailData } = await resend.emails.send({
      from: 'Tikko <onboarding@resend.dev>',
      to: [email],
      subject: 'Get ready for Coding Conf 2026',
      html,
    });

    return NextResponse.json({
      message: 'Ticket created and email sent successfully.',
      data: { ticket, emailData },
    });
  } catch (error: any) {
    console.error('Error in POST /api/submit:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
