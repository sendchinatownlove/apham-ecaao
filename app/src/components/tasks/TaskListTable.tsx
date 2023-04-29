import React from 'react';
import {useTable} from 'react-table';
import styled from "styled-components";
import {Task} from "../../Api";

const TaskListTableContainer = styled.div`
  background-color: rgba(168, 25, 46, 0.52);
  color: rgb(255, 255, 255);
  text-align: center;
`;
const StyledRow = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  padding: 5px 15px 10px;
  text-align: left;

  &:hover {
    cursor: pointer;
  }
`;

const TaskRowTitleContainer = styled.div`
  font-weight: 700;
  padding-top: 5px;
  padding-bottom: 3px;
  display:flex;
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

const TaskRowDescription = styled.div`
  font-weight: 400;
`;

type TaskListTableProps = {
    onTaskClick: any,
    tasks: Task[],
    completedTasks: String[],
}

function parseTasks(tasks: Task[]) {
    if (tasks === undefined) return [];
    const parsedTasks: { task: Task }[] = [];

    tasks.forEach((task) => {
        parsedTasks.push({ task: task})
    })

    return parsedTasks;
}

function TaskListTable(props: TaskListTableProps, ) {
    const {onTaskClick, tasks, completedTasks} = props;

    const parsedTasks = parseTasks(tasks);

    parsedTasks.sort((a,b) => a.task.index - b.task.index);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Task',
                accessor: 'task', // accessor is the "key" in the data
      },
    ],
    []
    )

    const isCellCompleted = (cell: any): boolean => {
      return completedTasks.includes(cell.value['id']);
    }

  const {
    rows,
    prepareRow,
    // @ts-ignore
    } = useTable({columns, data: parsedTasks})

    return (
        <TaskListTableContainer>
            <table>
                <tbody>
                {rows.map(row => {
                    prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                let borderTop;

                                // gross hacky way to hide border from first row. I tried using tr first child styling
                                // but it wasn't working
                                if (cell.value['index'] === 0) {
                                    borderTop = '0px'
                  } else {
                                    borderTop = '1px solid white'
                  }
                  return (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        <StyledRow style={{borderTop: borderTop}} onClick={() => !isCellCompleted(cell) ? onTaskClick(cell.value) : false}>
                                            <TaskRowTitleContainer>
                                                <span>{cell.value['index']}. {cell.value['title']}</span>
                                                {isCellCompleted(cell) && (
                                                    <CheckedCheckbox/>
                                                  )}
                                                {!isCellCompleted(cell) && (
                                                    <UncheckedCheckbox/>
                                                )}
                        </TaskRowTitleContainer>
                        <TaskRowDescription>
                             {cell.value['description']}
                        </TaskRowDescription>
                      </StyledRow>
                    </td>
                                )
                })}
              </tr>
                    )
          })}
        </tbody>
      </table>
    </TaskListTableContainer>
  );
}

export default TaskListTable;