import styled from "styled-components";

const ChecklistItem = styled.div`
  padding: 7px 17px 10px;;
  font-weight: 700;
  font-size: 0.8rem;
  color: #343434;
  font-size: 0.8rem;
  line-height: 1rem;
`

const TaskCheckListContainer = styled.div`
  padding-top: 5px;
  padding-bottom: 3px;
  display:flex;
  justify-content: space-between;
`

const TaskDescription = styled.div`
  font-weight: 400;
`

const UncheckedCheckbox = styled.div`
  content: url("/unchecked-checkbox-yellow.png");
  height: 20px;
  width: 20px;
  padding-top: 3px;
  padding-left: 4px;
`;

const CheckedCheckbox = styled.div`
  content: url("/checked-checkbox-yellow.png");
  height: 20px;
  width: 20px;
  padding-top: 3px;
  padding-left: 4px;
`;

export type TaskChecklistItemProps = {
  taskHeader: string;
  taskDescription: string;
  isChecked: boolean;
}

export default function TaskChecklistItem(props: TaskChecklistItemProps) {
  const { taskHeader, taskDescription, isChecked } = props;

  return (
    <ChecklistItem>
      <TaskCheckListContainer>
        <span>{taskHeader}</span>
        {isChecked ? <CheckedCheckbox /> : <UncheckedCheckbox />}
      </TaskCheckListContainer>
      <TaskDescription>
        {taskDescription}
      </TaskDescription>
    </ChecklistItem>
  );
}