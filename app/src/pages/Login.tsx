import styled from "styled-components";

import Arch from "../assets/arch.svg";
import { BrandText } from "../styled-components";
import Footer from '../components/shared/footer';

import { useState } from "react";

const LoginContainer = styled.div`
  width: 98vw;
  height: 95vh;
  max-width: 1200px;
`

const LoginWrapper = styled.div`
  background: #ffffff;
  position: relative;
  top: -60px;
  border-radius: 26px;
  padding: 0 20px;
`;

const Header = styled.div`
  padding-top: 20px;
`

const Icon = styled.img`
  content: url(${Arch});
  top: 0px;
  position: relative;
  min-width: 108px;
  z-index: 1
`

const ECAAOLogo = styled.img`
  content: url("/ecaao.png");
  width: 207px;
  height: 119px;
  position: relative;
  z-index: 2;
`;

const SubheaderText = styled.p`
  font-style: italic !important;
  letter-spacing: 0.1em;
  font-size: 10px;
  position: relative;
  text-align: center;
  margin: auto;
  color: #a8192e;
  font-weight: 300;

  &:before {
    content: "";
    width: 50px;
    height: 0.5px;
    background: #a8192e;
    left: 16px;
    top: 50%;
    position: absolute;
  }

  &:after {
    content: "";
    width: 50px;
    height: 0.5px;
    background: #a8192e;
    right: 16px;
    top: 50%;
    position: absolute;
  }
`;

const CTAHeader = styled.div`
  color: #000000;
  padding-top: 24px;
  padding-bottom: 5px;
  padding-left: 15px;
  font-size: 0.9rem;
  text-align: left;
`

const CtaText = styled.div`
  color: #000000;
  font-size: 0.9rem;
  line-height: 19px;
  padding: 0 15px;
  text-align: left;
`;

const InputWrapper = styled.div`
  margin: auto;
  padding: 32px 15px 0px 15px;
`;

const InputLabel = styled(BrandText)`
  color: #000000;
  text-align: left;
`;

const EmailInput = styled.input<{ error: boolean }>`
  width: 100%;
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
  margin-top: 30px;
  margin-bottom: 15px;

  &:disabled {
    cursor: not-allowed;
    background: #8b8b8b;
  }

  &:hover {
    border: none;
  }
`;

const ButtonText = styled.div`
  letter-spacing: 0.15em;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.9em;
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
  };

  return (
    <LoginContainer>
          <Icon/>
      <LoginWrapper>
        <Header>
        <ECAAOLogo/>
        <SubheaderText>EVERYTHING CHINATOWN ALL AT ONCE</SubheaderText>
        </Header>
        <CTAHeader>
          <b>Hey explorer!</b>
        </CTAHeader>
        <CtaText>
          Enter your email below to start exploring the Chinatowns across the
          boroughs and log your completed activities for chances to win prizes.
        </CtaText>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputLabel>Email Address</InputLabel>
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
          <ButtonWrapper type="submit" disabled={error || email == ""}>
            <ButtonText>ENTER</ButtonText>
          </ButtonWrapper>
        </form>
        <Footer background="#A8192E" color="#A8192E" />
      </LoginWrapper>
      </LoginContainer>
  );
}
