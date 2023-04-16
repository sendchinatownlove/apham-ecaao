import styled from "styled-components";

interface BodyTextProps {
  bold?: boolean,
  color?: string,
  
}
export const BodyTextMedium = styled.span`
  font-weight: ${(props: BodyTextProps) => props.bold ? "700" : "400"};
  color: ${(props: BodyTextProps) => props.color ? props.color : "#FFFFF"};
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.055em;
  text-transform: uppercase;
`;