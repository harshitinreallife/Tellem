
import { Html, Head, Font, Preview, Section, Row, Column, Text, Heading, Hr, Container, } from "react-email";

interface VerificationEmailProps { username: string; otp: string; }

export default function VerificationEmail({ username, otp, }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Your Tellem verification code</title>

        <Font fontFamily="Arial" fallbackFontFamily="Verdana" fontWeight={400} fontStyle="normal" />

        <style>{`body {margin: 0; padding: 0; background-color: #f9f9fa; font-family: Arial, Verdana, sans-serif;} * {box-sizing: border-box;}`}</style>
      </Head>

      <Preview>
        Your Tellem verification code is {otp}
      </Preview>

      <Section style={{ backgroundColor: "#F9F9FA", padding: "40px 16px", }}>
        <Container style={{ maxWidth: "520px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "24px", overflow: "hidden", border: "1px solid #F3DCE7", boxShadow: "0 10px 35px rgba(15, 14, 66, 0.08)", }}>
          {/* Header */}

          <Section style={{ backgroundColor: "#FFF0F7", padding: "32px 30px", textAlign: "center", borderBottom: "1px solid #F3DCE7", }}>
            <Text style={{ margin: 0, color: "#ED1C7D", fontSize: "34px", lineHeight: "40px", fontWeight: "700", letterSpacing: "-1px", }}>
              Tell'em
            </Text>

            <Text style={{ margin: "8px 0 0", color: "#737373", fontSize: "14px", lineHeight: "22px", }}>
              Real messages. Real reactions. 💌
            </Text>
          </Section>

          {/* Main Content */}

          <Section style={{ padding: "36px 32px 30px", }}>
            <Row>
              <Column>
                <Heading as="h1" style={{ margin: "0 0 10px", color: "#0F0E42", fontSize: "26px", lineHeight: "34px", fontWeight: "700", textAlign: "center", }}>
                  Hey {username}! 👋
                </Heading>

                <Text style={{ margin: "0 auto", maxWidth: "400px", color: "#737373", fontSize: "15px", lineHeight: "24px", textAlign: "center", }}>
                  Welcome to Tellem! Use the verification code below to finish creating your account.
                </Text>
              </Column>
            </Row>

            {/* OTP Label */}

            <Text style={{ margin: "30px 0 10px", color: "#737373", fontSize: "12px", lineHeight: "18px", fontWeight: "600", textAlign: "center", textTransform: "uppercase", letterSpacing: "1.5px", }}>
              Your verification code
            </Text>

            {/* OTP Box */}

            <Section style={{ backgroundColor: "#FFF5FA", border: "1px solid #F3DCE7", borderRadius: "18px", padding: "20px 16px", textAlign: "center", }}>
              <Text style={{ margin: 0, color: "#ED1C7D", fontSize: "34px", lineHeight: "42px", fontWeight: "700", letterSpacing: "8px", }}>
                {otp}
              </Text>
            </Section>

            {/* Expiry */}

            <Text style={{ margin: "14px 0 0", color: "#A3A3A3", fontSize: "12px", lineHeight: "18px", textAlign: "center", }}>
              This code expires in 10 minutes.
            </Text>

            <Hr style={{ border: "none", borderTop: "1px solid #F3DCE7", margin: "30px 0 24px", }} />


            {/* Security */}

            <Section style={{ backgroundColor: "#FCFCFC", borderRadius: "14px", padding: "16px", }}>
              <Row>
                <Column style={{ width: "36px", verticalAlign: "top", }}>
                  <Text style={{ margin: 0, fontSize: "20px", lineHeight: "24px", }}>
                    🔐
                  </Text>
                </Column>

                <Column>
                  <Text style={{ margin: 0, color: "#404040", fontSize: "13px", lineHeight: "20px", fontWeight: "600", }}>Keep your code private</Text>

                  <Text style={{ margin: "3px 0 0", color: "#737373", fontSize: "12px", lineHeight: "18px", }}>
                    Tellem will never ask you to share
                    your verification code with anyone.
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Not Requested */}

            <Text style={{ margin: "24px 0 0", color: "#A3A3A3", fontSize: "11px", lineHeight: "18px", textAlign: "center", }}>Didn't request this code? You can safely ignore this email.</Text>
          </Section>

          {/* Footer */}

          <Section style={{ backgroundColor: "#FFF9FC", borderTop: "1px solid #F3DCE7", padding: "20px 24px", textAlign: "center", }}>
            <Text style={{ margin: 0, color: "#ED1C7D", fontSize: "13px", lineHeight: "20px", fontWeight: "600", }}>Made for real conversations. 💗</Text>

            <Text style={{ margin: "5px 0 0", color: "#A3A3A3", fontSize: "11px", lineHeight: "18px", }}>
              © {new Date().getFullYear()} Tellem
            </Text>
          </Section>
        </Container>
      </Section>
    </Html>
  );
}

