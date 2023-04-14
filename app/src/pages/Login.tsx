import styled from "styled-components";
import { BrandSubtext, BrandText } from "../styled-components";

const CtaText = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;

  color: #000000;
`;

const EmailInput = styled.div`
  display: flex;
`;

const Button = styled.button`
  background: #8b8b8b;
  border-radius: 50px;
  width: 267px;
`;

const ButtonText = styled.div`
  font-family: "Open Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

export default function LoginPage() {
  return (
    <div>
      <BrandText>100* WAYS TO SEND CHINATOWN LOVE</BrandText>
      <BrandSubtext>
        {" "}
        --------- EVERYTHING CHINATOWN ALL AT ONCE ---------
      </BrandSubtext>
      <CtaText>Hey explorer!</CtaText>
      <CtaText>
        Enter your email below to start exploring the Chinatowns across the
        boroughs and log your completed activities for chances to win prizes.
      </CtaText>
      <EmailInput>
        <CtaText>Email address</CtaText>
        <input type="text" id="email" name="email" />
      </EmailInput>
      <Button>
        <ButtonText>ENTER</ButtonText>
      </Button>
      <BrandText>READ ABOUT THIS EVENT</BrandText>
      <BrandText>@SENDCHINATOWNLOVE</BrandText>
    </div>
  );
}
