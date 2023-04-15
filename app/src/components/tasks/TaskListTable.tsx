import React from 'react';
import {useTable} from 'react-table';
import styled from "styled-components";

const TaskListTableContainer = styled.div`
    max-height: 480px;
    overflow: scroll;
    background-color: rgba(168, 25, 46, 0.52);
    border-radius: 0 0 25px 25px;
`;
const StyledRow = styled.div`
  max-width: 300px;
  font-size: 0.8rem;
  line-height: 1rem;
  padding: 5px 10px 10px 10px;
  text-align: left;
`;

const ActivityRowTitle = styled.div`
  font-weight: 700;
  padding-top: 5px;
  padding-bottom: 3px;
`;

const ActivityRowDescription = styled.div`
  font-weight: 400;
`;

type TaskListTableProps = {
    activities: { activity: { title: string, description: string, completed: boolean } }[]
}

function TaskListTable(props: TaskListTableProps) {
    const {activities} = props;

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

    let rowNumber = 0;

    return (
        <TaskListTableContainer>
            <table>
                <tbody>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                rowNumber += 1;
                                let borderTop;

                                // gross hacky way to hide border from first row. I tried using tr first child styling
                                // but it wasn't working
                                if (rowNumber === 1) {
                                    borderTop = '0px'
                                } else {
                                    borderTop = '1px solid white'
                                }
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        <StyledRow style={{borderTop: borderTop}}>
                                            <ActivityRowTitle>
                                                {rowNumber}. {cell.value['title']}
                                            </ActivityRowTitle>
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