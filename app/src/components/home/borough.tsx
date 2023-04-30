import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {BaseButton, BodyTextMedium, THEME_COLORS} from "../theme";

interface Props {
  borough: String;
  completedTasks?: Number;
  totalTasks?: Number;
}

const Button = styled(BaseButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 39px;
  padding: 20px 19px;
  background-color: white;
`;

function BoroughButton(props: Props) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/tasks/${props.borough.toLowerCase()}`);
  }

  return (
    <Button onClick={onClickHandler}>
      <BodyTextMedium bold color={THEME_COLORS.RED} size="14px">{props.borough}</BodyTextMedium>
      <BodyTextMedium color={THEME_COLORS.RED} size="14px">{`${props.completedTasks}/${props.totalTasks}`}</BodyTextMedium>
    </Button>
  );
}

export default BoroughButton;