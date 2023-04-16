import styled from "styled-components";

import Logo from "../assets/logo.svg";
import { BrandText } from "../styled-components";

import { useState } from "react";

const PageContainer = styled.div`
  background: #ffffff;
  width: 367px;
  height: 611px;
  padding: 14px;
`;

const HeaderText = styled(BrandText)<{ fontSize?: number }>`
  letter-spacing: 0.15em;
  font-weight: 700;
  padding-bottom: 4px;

  ${(props) => props.fontSize && `font-size: ${props.fontSize}px`};
`;

const SubheaderText = styled(BrandText)`
  font-style: italic;
  letter-spacing: 0.15em;
  font-size: 10px;
  position: relative;
  max-width: 600px;
  text-align: center;
  margin: auto;

  &:before {
    content: "";
    width: 54px;
    height: 0.5px;
    background: #a8192e;
    left: 16px;
    top: 50%;
    position: absolute;
  }

  &:after {
    content: "";
    width: 54px;
    height: 0.5px;
    background: #a8192e;
    right: 16px;
    top: 50%;
    position: absolute;
  }
`;

const CtaText = styled(BrandText)`
  color: #000000;
  padding-top: 24px;
`;

const InputWrapper = styled.div`
  padding-top: 32px;
  width: 331px;
  margin: auto;
`;

const InputLabel = styled(BrandText)`
  color: #000000;
  text-align: left;
`;

const EmailInput = styled.input`
  width: 331px;
  height: 50px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dadada;
  border-radius: 5px;
  margin-top: 12px;
  color: #000000;
  font-family: "Open Sans";
  font-style: normal;
  padding-left: 14px;
  font-size: 14px;
`;

const ButtonWrapper = styled.button`
  background: #8b8b8b;
  border-radius: 50px;
  width: 267px;
  height: 45px;
  margin-top: 74px;
  margin-bottom: 80px;
`;

const ButtonText = styled(BrandText)`
  letter-spacing: 0.15em;
  color: #ffffff;
  font-weight: 700;
`;

const LogoWrapper = styled.div`
  display: block;
  position: relative;
  margin: auto;

  &:before {
    content: "";
    width: 164px;
    height: 0.5px;
    background: #a8192e;
    left: 14px;
    top: 42%;
    position: absolute;
  }

  &:after {
    content: "";
    width: 164px;
    height: 0.5px;
    background: #a8192e;
    right: 14px;
    top: 42%;
    position: absolute;
  }
`;

const ErrorText = styled(BrandText)``;

function validateEmail(input: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
    return true;
  }
  return false;
}

export default function Login() {
  const [error, setError] = useState(false);
  const errorText = "Please enter a valid email";

  return (
    <PageContainer>
      <HeaderText>100* WAYS TO SEND CHINATOWN LOVE</HeaderText>
      <SubheaderText>EVERYTHING CHINATOWN ALL AT ONCE</SubheaderText>
      <CtaText>
        <b>Hey explorer!</b>
        <br />
        Enter your email below to start exploring the Chinatowns across the
        boroughs and log your completed activities for chances to win prizes.
      </CtaText>
      <InputWrapper>
        <InputLabel>Email address</InputLabel>
        <EmailInput type="text" id="email" name="email" />
      </InputWrapper>
      <ButtonWrapper>
        <ButtonText>ENTER</ButtonText>
      </ButtonWrapper>
      <LogoWrapper>
        <img alt="logo" src={Logo} />
      </LogoWrapper>
      <div style={{ paddingTop: "12px" }}>
        <HeaderText fontSize={12}>READ ABOUT THIS EVENT</HeaderText>
      </div>
      <div style={{ paddingTop: "12px" }}>
        <HeaderText fontSize={12}>@SENDCHINATOWNLOVE</HeaderText>
      </div>
    </PageContainer>
  );
}
