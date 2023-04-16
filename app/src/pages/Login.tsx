import styled from "styled-components";

import Arch from "../assets/arch.svg";
import Logo from "../assets/logo.svg";
import { BrandText } from "../styled-components";

import { useState } from "react";

const LoginWrapper = styled.div`
  background: #ffffff;
  width: 367px;
  max-height: 656px;
  min-height: 656px;
  border-radius: 26px;
`;

const HeaderText = styled(BrandText)`
  letter-spacing: 0.15em;
  font-weight: 700;
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

const EmailInput = styled.input<{ error: boolean }>`
  width: 331px;
  height: 50px;
  box-sizing: border-box;
  background: #ffffff;
  ${(props) =>
    props.error ? `border: 1px solid #DD678A` : `border: 1px solid #dadada`};
  border-radius: 5px;
  margin-top: 12px;
  color: #000000;
  font-family: "Open Sans";
  font-style: normal;
  padding-left: 14px;
  font-size: 18px;
`;

const ButtonWrapper = styled.button`
  background: #000000;
  border-radius: 50px;
  width: 267px;
  height: 45px;
  margin-top: 51px;
  margin-bottom: 94px;

  &:disabled {
    cursor: not-allowed;
    background: #8b8b8b;
  }

  &:hover {
    border: none;
  }
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
  margin-bottom: 20px;

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

const ErrorWrapper = styled.div`
  height: 10px;
`;

const ErrorText = styled(BrandText)`
  font-size: 10px;
  text-align: left;
  padding-top: 4px;
  padding-left: 16px;
  color: #dd678a;
`;

function validateEmail(input: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
    return true;
  }
  return false;
}

export default function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("hi");
  };

  return (
    <>
      <img
        alt="arch"
        src={Arch}
        style={{ top: "55px", position: "relative" }}
      />
      <LoginWrapper>
        <HeaderText
          style={{
            paddingTop: "40px",
            paddingBottom: "4px",
            position: "relative",
          }}
        >
          100* WAYS TO SEND CHINATOWN LOVE
        </HeaderText>
        <SubheaderText>EVERYTHING CHINATOWN ALL AT ONCE</SubheaderText>
        <CtaText>
          <b>Hey explorer!</b>
          <br />
          Enter your email below to start exploring the Chinatowns across the
          boroughs and log your completed activities for chances to win prizes.
        </CtaText>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputLabel>Email address</InputLabel>
            <EmailInput
              error={error}
              type="text"
              id="email"
              name="email"
              onChange={(e) => {
                if (validateEmail(e.target.value)) {
                  setError(false);
                  setEmail(e.target.value);
                } else {
                  setError(true);
                }
              }}
            />
            <ErrorWrapper>
              {error && <ErrorText>Please enter a valid email</ErrorText>}
            </ErrorWrapper>
          </InputWrapper>
          <ButtonWrapper
            type="submit"
            onClick={() => {
              console.log("hi");
            }}
            disabled={error || email == ""}
          >
            <ButtonText>ENTER</ButtonText>
          </ButtonWrapper>
        </form>
        <LogoWrapper>
          <img alt="logo" src={Logo} />
        </LogoWrapper>
        <HeaderText style={{ paddingBottom: "21px", fontSize: "12px" }}>
          READ ABOUT THIS EVENT
        </HeaderText>
        <HeaderText style={{ fontSize: "12px", paddingBottom: "42px" }}>
          @SENDCHINATOWNLOVE
        </HeaderText>
      </LoginWrapper>
    </>
  );
}
