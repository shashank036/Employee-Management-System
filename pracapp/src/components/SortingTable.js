
import React, { useEffect, useMemo, useState,useContext } from 'react'
import { useTable, useSortBy } from 'react-table'
import { Link as ReachLink } from 'react-router-dom'
import {UserContext} from "../UserContext";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useToast, IconButton, Link
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon, UpDownIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'



const SortingTable = () => {
    const toast = useToast()
    let userContext = useContext(UserContext);
    console.log(userContext.user.currentUserRole)
    const {currentUserRole} = userContext.user
    const handleDel = (originalRow) => {

        console.log('Original Data Id', originalRow.originalRow.id);
        fetch(` http://localhost:3333/users/${originalRow.originalRow.id}`, { method: 'DELETE' })
            .then(
                () => toast({
                    position: 'bottom-right',
                    title: 'Employee Delete.',
                    description: "Employee Information has been successfully deleted.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            );
    }
    const COLUMNS = [
        {
            Header: 'id',
            Footer: 'id',
            accessor: 'id'
        },
        {
            Header: 'First Name',
            Footer: 'First Name',
            accessor: 'firstname'
        },
        {
            Header: 'Last Name',
            Footer: 'Last Name',
            accessor: 'lastname',
        },
        {
            Header: 'Email',
            Footer: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Joining Date',
            Footer: 'Joining Date',
            accessor: 'joiningDate',
        },
        
        {
            Header: 'Action',
            Footer: 'action',
            disableSortBy: true,
            hide: true,
            accessor: (originalRow, rowIndex) => {
                
                return (
                    currentUserRole === "viewer" ? null : (
                    <div>
                        
                        <Link as={ReachLink}
                            to={`/emp/${originalRow.id}`}
                        >
                            <IconButton
                                aria-label='add'
                                size='lg'
                                mr={2}
                                icon={<EditIcon />}
                                justifyItems='flex-end'
                            />
                        </Link>
                        {currentUserRole === "editor" ? null :
                        <IconButton
                            aria-label='add'
                            size='lg'
                            mr={2}
                            icon={<DeleteIcon />}
                            justifyItems='flex-end'
                            onClick={() => handleDel({ originalRow })}
                        />
                        }
                    </div>
                    )
                )
            }
        }
    ]


    const [empdata, setEmpData] = useState([]);


    useEffect(() => {
        const url = "http://localhost:3333/users";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                // console.log(json);
                setEmpData([...json])
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);


    //   console.log('Data', empdata)


    const columns = useMemo(() => COLUMNS, [])
    // const data = useMemo(() => empdata, [])


    const tableInstance = useTable({
        columns,
        data: empdata
    },
        useSortBy)
    // console.log('table Data', tableInstance.data)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = tableInstance
    return (
        <>
            <TableContainer {...getTableProps()} >
                <Table variant='striped' colorScheme='teal' size='sm'>
                    <TableCaption>Employee List</TableCaption>
                    <Thead>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? <ChevronDownIcon /> : <ChevronUpIcon />) : (column.Header == 'Action' ? '' : <UpDownIcon />)}
                                            {/* {console.log('Column Data',column.Header)} */}
                                        </span>
                                    </Th>
                                ))}
                            </Tr>
                        ))}

                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {/* {console.log('row data', rows)} */}
                        {rows.map((row) => {
                            prepareRow(row)
                            return (
                                <Tr {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell) => (
                                            <Td {...cell.getCellProps()}> {cell.render('Cell')} </Td>

                                        ))
                                    }
                                </Tr>
                            )
                        })}
                    </Tbody>
                    <Tfoot>
                        {footerGroups.map((footerGroup) => (
                            <Tr {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map((column) => (
                                    <Th {...column.getFooterProps()}>
                                        {column.render('Footer')}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}

export default SortingTable