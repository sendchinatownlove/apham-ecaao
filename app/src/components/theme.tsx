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