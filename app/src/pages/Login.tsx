import React from "react";

import styled from "styled-components";

const BrandText = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;

  color: #a8192e;
`;

const BrandSubtext = styled.div`
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 300;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  color: #a8192e;
`;

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
      <button>Enter</button>
      <BrandText>READ ABOUT THIS EVENT</BrandText>
      <BrandText>@SENDCHINATOWNLOVE</BrandText>
    </div>
  );
}
