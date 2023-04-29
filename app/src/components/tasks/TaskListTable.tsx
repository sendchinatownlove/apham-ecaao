import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import { ActivityInfo } from "./TaskList";

const TaskListTableContainer = styled.div`
  max-height: 100vh;
  overflow: scroll;
  background-color: rgba(168, 25, 46, 0.52);
  border-radius: 0 0 25px 25px;
  color: rgb(255, 255, 255);
  text-align: center;
`;
const StyledRow = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  padding: 5px 15px 10px;
  text-align: left;
`;

const ActivityRowTitleContainer = styled.div`
  font-weight: 700;
  padding-top: 5px;
  padding-bottom: 3px;
  display: flex;
  justify-content: space-between;
`;

const UncheckedCheckbox = styled.div`
  content: url("/unchecked-checkbox.png");
  height: 20px;
  width: 20px;
  padding-top: 3px;
  padding-left: 4px;
`;

const CheckedCheckbox = styled.div`
  content: url("/checked-checkbox.png");
  height: 20px;
  width: 20px;
  padding-top: 3px;
  padding-left: 4px;
`;

const ActivityRowDescription = styled.div`
  font-weight: 400;
`;

type TaskListTableProps = {
  activities: ActivityInfo[];
  onTaskClick: any;
};

function TaskListTable(props: TaskListTableProps) {
  const { activities, onTaskClick } = props;

  activities?.sort((a, b) => a.fields.Index - b.fields.Index);

  const columns = React.useMemo(
    () => [
      {
        Header: "Activity",
        accessor: "fields", // accessor is the "key" in the data
      },
    ],
    []
  );
  
  const {
    rows,
    prepareRow,
    // @ts-ignore
  } = useTable({ columns, data: activities });

  // If activities is undefined or null, render a loading message
  if (!activities) {
    return <div>Loading...</div>;
  }

  return (
    <TaskListTableContainer>
      <table>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.log("cell.value", cell.value);
                  let borderTop;
                  // gross hacky way to hide border from first row. I tried using tr first child styling
                  // but it wasn't working
                  if (cell.value["Index"] === 0) {
                    borderTop = "0px";
                  } else {
                    borderTop = "1px solid white";
                  }
                  return (
                    <td {...cell.getCellProps()}>
                      <StyledRow
                        style={{ borderTop: borderTop }}
                        onClick={() => onTaskClick(cell.value)}
                      >
                        <ActivityRowTitleContainer>
                          <span>
                            {cell.value["Index"]}. {cell.value["Task Title"]}
                          </span>
                          {cell.value["completed"] && <CheckedCheckbox />}
                          {!cell.value["completed"] && <UncheckedCheckbox />}
                        </ActivityRowTitleContainer>
                        <ActivityRowDescription>
                          {cell.value["Task Description"]}
                        </ActivityRowDescription>
                      </StyledRow>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TaskListTableContainer>
  );
}

export default TaskListTable;
