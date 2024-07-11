import * as React from "react";
import { Html } from "@react-email/components";
import { Heading, Text, Button, Hr } from "@react-email/components";

const ForgotPasswordEmail = ({params}:{params:{name:string, url:string}}) => {
  console.log('url', params.url);
  
  return (
        <Html>
          <Heading as="h2">Hello {params.name} </Heading>
          <Text>We received the reset password request. If it's not you then please ignore this email</Text>
          <Button href={params.url} style={{ background: "green", color: "white", padding: "20px" }}>
            Click Me
          </Button>
          <Hr />
          <Heading>Next auth sign-in</Heading>
        </Html>
      );
}

export default ForgotPasswordEmail;
