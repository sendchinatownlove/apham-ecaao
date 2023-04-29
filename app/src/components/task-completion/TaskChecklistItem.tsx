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

const DonationLink = styled.a`
 color: black;
 text-decoration: underline;
 
 :hover {
   color: rgb(168, 25, 46);
 }
`;

export type TaskChecklistItemProps = {
  taskHeader: string;
  taskDescription: string;
  isChecked: boolean;
  taskIndex: number;
}

export default function TaskChecklistItem(props: TaskChecklistItemProps) {
  const { taskHeader, taskDescription, isChecked, taskIndex } = props;

    return (
    <ChecklistItem>
      <TaskCheckListContainer>
        <span>{taskHeader}</span>
        {isChecked ? <CheckedCheckbox /> : <UncheckedCheckbox />}
      </TaskCheckListContainer>
      <TaskDescription>
        {taskDescription}
          {taskIndex === 0 ? (
              <div>
              <br/><br/>
              <DonationLink
                target="_blank" rel="noreferrer"
                href="https://www.sendchinatownlove.com/donate.html">
                https://www.sendchinatownlove.com/donate.html
              </DonationLink>
              </div>
          ): (
              <></>
          )}
      </TaskDescription>
    </ChecklistItem>
  );
}