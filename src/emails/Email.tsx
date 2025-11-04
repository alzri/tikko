import * as React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components';

interface IEmailProps {
  id: string;
  name: string;
  username: string;
}

export const Email = ({ id, name, username }: IEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Journey to Coding Conf 2026 🎉</Preview>

      <Body
        style={{
          backgroundColor: '#ffffff',
          fontFamily: 'Arial, sans-serif',
          padding: '20px',
          margin: '0 auto',
          maxWidth: '600px',
        }}
      >
        <Container style={{ textAlign: 'center' }}>
          <Heading style={{ color: '#2B0165', marginBottom: '10px' }}>
            Get Ready for Coding Conf 2026
          </Heading>
          <Text style={{ fontSize: '16px', color: '#32081C' }}>
            Hello <strong>{name}</strong>, you can find the ticket in the email attachment.
          </Text>

          <Hr style={{ margin: '20px 0', borderColor: '#eee' }} />

          <Container
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <Text style={{ fontSize: '25px', fontWeight: 'bold' }}>Ticket information:</Text>
              <Text style={{ color: '#32081C' }}>
                <strong>Date of config: </strong>Jan 31, 2026 / Austin, TX
              </Text>
              <Text style={{ color: '#32081C' }}>
                <strong>Name: </strong>
                {name}
              </Text>
              <Text style={{ color: '#32081C' }}>
                <strong>Username: </strong>@{username}
              </Text>
              <Text style={{ color: '#32081C' }}>
                <strong>Ticket number: </strong>#{id}
              </Text>
            </div>
          </Container>

          <Hr style={{ margin: '30px 0', borderColor: '#eee' }} />

          <Text style={{ fontSize: '12px', color: '#888' }}>
            This message was sent to {name}. If you didn’t register for Coding Conf 2026, please
            ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default Email;
