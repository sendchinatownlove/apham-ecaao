import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BodyTextMedium, THEME_COLORS } from "../components/theme";

interface Props {
  borough: string;
  completedTasks?: Number;
  totalTasks?: Number;
}

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 39px;
  padding: 14.5px 19px;
  background-color: white;
`;

function BoroughButton(props: Props) {
  const navigate = useNavigate();
 
  const onClickHandler = () => {
    navigate(`/tasks/${props.borough.toLowerCase()}`);
  }

  return (
    <Button onClick={onClickHandler}>
      <BodyTextMedium bold color={THEME_COLORS.RED}>{props.borough}</BodyTextMedium>
      <BodyTextMedium color={THEME_COLORS.RED}>{`${props.completedTasks}/${props.totalTasks}`}</BodyTextMedium>
    </Button>
  );
}

export default BoroughButton;