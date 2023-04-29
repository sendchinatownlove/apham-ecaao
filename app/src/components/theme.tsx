import styled from "styled-components";

export const THEME_COLORS = {
  "RED": "#A8192E",
  "GOLD": "#F8BA17",
  "WHITE": "#FFFFFF",
  "BLACK": "#0000000",
  "PINK": "#FFEBEB",
  "PINK1": "#DD678A",
};

interface BodyTextProps {
  bold?: boolean,
  color?: string,
  upperCase?: boolean,
  size?: string,
}

interface BubbleLabelProps {
  secondary?: boolean,
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
  letter-spacing: 0.15em;
  color: ${(props: BodyTextProps) => props.color ? props.color : "#FFFFF"};
  ${(props: BodyTextProps) => props.upperCase && "text-transform: uppercase"}; 
`;

export const PageContainer = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  width: 98vw;
  text-align: center;
  min-height: 95vh;
  margin-top: 10px;
  max-width: 1200px;
  border-radius: 36px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const PrimaryButton = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: bold;
  background: ${THEME_COLORS.RED};
  border-radius: 40px;
  width: 100%;
  height: 40px;
`
export const SecondaryButton = styled(PrimaryButton)`
  font-size: 14px;
  background: ${THEME_COLORS.BLACK};
  border-radius: 40px;
  width: 50%;
  height: 45px;
`

export const BubbleLabel = styled.span`
  color: ${(props: BubbleLabelProps) => props.secondary ? THEME_COLORS.WHITE : THEME_COLORS.PINK1 };
  background-color: ${(props: BubbleLabelProps) => props.secondary ? THEME_COLORS.PINK1 : THEME_COLORS.WHITE };
  font-weight: 700;
  font-size: 10px;
  border: 1px solid ${THEME_COLORS.PINK1};
  border-radius: 8px;
  padding: 2px 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`