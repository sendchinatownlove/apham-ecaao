import React from 'react';
import {useTable} from 'react-table';
import styled from "styled-components";

const TaskListTableContainer = styled.div`
    max-height: 480px;
    overflow: scroll;
`;
const StyledRow = styled.div`
  max-width: 300px;
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

    return (
        <TaskListTableContainer>
            <table>
                <tbody>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                        }}
                                    >
                                        <StyledRow>
                                            {cell.value['title']} {cell.value['description']}
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