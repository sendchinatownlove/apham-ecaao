import React from 'react';
import {useTable} from 'react-table';
import styled from "styled-components";
import {ActivityInfo} from "./TaskList";

const TaskListTableContainer = styled.div`
    max-height: 450px;
    overflow: scroll;
    background-color: rgba(168, 25, 46, 0.52);
    border-radius: 0 0 25px 25px;
    margin-bottom: 5px;
`;
const StyledRow = styled.div`
  max-width: 300px;
  font-size: 0.8rem;
  line-height: 1rem;
  padding: 5px 10px 10px 10px;
  text-align: left;
`;

const ActivityRowTitleContainer = styled.div`
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

const ActivityRowDescription = styled.div`
  font-weight: 400;
`;

type TaskListTableProps = {
    activities: { activity: ActivityInfo }[]
}

function TaskListTable(props: TaskListTableProps) {
    const {activities} = props;

    activities.sort((a,b) => a.activity.index - b.activity.index);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Activity',
                accessor: 'activity', // accessor is the "key" in the data
            },
        ],
        []
    )

    const {
        rows,
        prepareRow,
        // @ts-ignore
    } = useTable({columns, data: activities})

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
                                if (cell.value['index'] === 0) { // NOTE: will need to change this to see if it's 0 once we start adding that task
                                    borderTop = '0px'
                                } else {
                                    borderTop = '1px solid white'
                                }
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        <StyledRow style={{borderTop: borderTop}}>
                                            <ActivityRowTitleContainer>
                                                <span>{cell.value['index']}. {cell.value['title']}</span>
                                                {cell.value['completed'] && (
                                                    <CheckedCheckbox/>
                                                  )}
                                                {!cell.value['completed'] && (
                                                    <UncheckedCheckbox/>
                                                )}
                                            </ActivityRowTitleContainer>
                                            <ActivityRowDescription>
                                                {cell.value['description']}
                                            </ActivityRowDescription>
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