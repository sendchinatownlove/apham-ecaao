import styled from "styled-components";

export const THEME_COLORS = {
  "RED": "#A8192E",
  "GOLD": "#F8BA17",
};

interface BodyTextProps {
  bold?: boolean,
  color?: string,
  upperCase?: boolean,
  size?: string,
}

export const BodyTextMedium = styled.span`
  font-weight: ${(props: BodyTextProps) => props.bold ? "700" : "400"};
  color: ${(props: BodyTextProps) => props.color ? props.color : "#FFFFF"};
  font-size: ${(props: BodyTextProps) => props.size ? props.size : "13px"};
  line-height: 18px;
  letter-spacing: 0.055em;
  text-transform: uppercase;
`;

export const LabelMedium = styled.label`
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  letter: 15%;
  color: ${(props: BodyTextProps) => props.color ? props.color : "#FFFFF"};
  ${(props: BodyTextProps) => props.upperCase && "text-transform: uppercase"}; 
`;

export const PageContainer = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  width: 98vw;
  text-align: center;
  height: calc(100vh - 30px);
  margin: 0 auto;
  margin-top: 30px;
  max-width: 1200px;
  border-top-left-radius: 36px;
  border-top-right-radius: 36px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
`;