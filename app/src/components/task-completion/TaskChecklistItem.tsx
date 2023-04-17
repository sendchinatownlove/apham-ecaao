import styled from "styled-components";

const ChecklistItem = styled.div`
  padding: 10px;
  display: flex;
  font-weight: 700;
  font-size: 12px;
  color: #343434;
`

const TaskHeader = styled.p`
  margin-top: 0;
`

const TaskDescription = styled.p`
  font-weight: 400;
`

const UncheckedCheckbox = styled.div`
  content: url("/unchecked-checkbox-yellow.png");
  height: 20px;
  width: 20px;
  padding-left: 4px;
`;

const CheckedCheckbox = styled.div`
  content: url("/checked-checkbox-yellow.png");
  height: 20px;
  width: 20px;
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
      <div>
        <TaskHeader>{taskHeader}</TaskHeader>
        <TaskDescription>{taskDescription}</TaskDescription>
      </div>
      <div>
        {isChecked ? <CheckedCheckbox /> : <UncheckedCheckbox />}
      </div>
  </ChecklistItem>
  );
}