import {
  Html,
  Head,
  Font,
  Heading,
  Row,
  Section,
  Text,
  Link,
} from "@react-email/components";
import React from "react";
interface VerificationEmailProps {
  purpose: string;
  username: string;
  url: string;
}

export default function VerificationEmail({
  purpose,
  username,
  url,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Text>
        Here&apos;s your verification Link:{" "}
        <Link href={url}>Verification Link</Link>
      </Text>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>{purpose}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
