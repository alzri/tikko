import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components';

export interface ITicketEmailProps {
  id: number;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
}

export const Email = ({ id, name, username }: ITicketEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Journey to Coding Conf 2026</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Get ready for Coding Conf 2026
          </Heading>

          <Text className="text-black text-[14px] leading-[24px]">Hello {name},</Text>

          <Text>Here is your ticket:</Text>

          <Container className="text-center mt-4">
            <Text className="text-[14px] text-[#333]">
              Name: {name}
              <br />
              Username: {username}
              <br />
              Ticket ID: #{id}
            </Text>
          </Container>

          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

          <Text className="text-[#666666] text-[12px] leading-[24px]">
            This message was intended for <span className="text-black">{name}</span>. If you did not
            create this ticket, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default Email;
