import styled from "styled-components";

import Arch from "../assets/arch.svg";
import { BrandText } from "../styled-components";
import Footer from '../components/shared/footer';


import { useState } from "react";
import { AuthProvider, useAuth } from "../AuthContext";
import { useNavigate, useParams } from "react-router-dom";



const LoginContainer = styled.div`
  width: 98vw;
  height: 100vh;
  max-width: 1200px;
`

const LoginWrapper = styled.div`
  background: #ffffff;
  position: relative;
  top: -6px;
  border-radius: 26px;
`;

const Header = styled.div`
  padding-top: 30px;
`

const HeaderText = styled.h1`
  font-size: 14px;
  letter-spacing: 0.15em;
  color: #A8192E;
  font-weight: 700;
  padding-bottom: 4px;
`

const SubheaderText = styled.p`
  font-style: italic;
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
  font-size: 0.9rem;
`

const CtaText = styled.div`
  color: #000000;
  font-size: 0.9rem;
  line-height: 19px;
  padding: 0 15px;
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


  const { user, sendSignInEmail } = useAuth();
  console.log(user, 'user??')

  const navigate = useNavigate();
  if (user) {
    navigate('/', { replace: true })
  }
  



  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    window.localStorage.setItem("emailForSignIn", email);
    console.log('submit')
    await sendSignInEmail(email)
  };

    // Redirect to the home page if the user is authenticated

  return (
    <>
    <LoginContainer>
          <img
            alt="arch"
            src={Arch}
            style={{ top: "32px", position: "relative" }}
          />
      <LoginWrapper>
        <Header>
        <HeaderText>
          100* WAYS TO SEND CHINATOWN LOVE
        </HeaderText>
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
          <ButtonWrapper type="submit" disabled={error || email == ""}>
            <ButtonText>ENTER</ButtonText>
          </ButtonWrapper>
        </form>
        <Footer background="#A8192E" color="#A8192E" />
      </LoginWrapper>
      </LoginContainer>
    </>
  );
}
