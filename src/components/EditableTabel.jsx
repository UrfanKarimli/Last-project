import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";


const EditableDataGrid = ({ columns, rows, url, processRowUpdate }) => {
    const navigate = useNavigate();
    const idValues = rows.map(item => item.id);
    return (
        <div>
            <Box sx={{
                height: 600,
                width: '100%',

            }}>

                <DataGrid
                    rows={typeof rows === "undefined" ? [] : rows}
                    columns={typeof columns === "undefined" ? [] : columns}
                    idField={idValues}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    onCellClick={(params) => {
                        if (typeof url !== "undefined") {
                            navigate(`${url}/${params.id}`)
                        }
                    }}
                    editMode="cell"
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => {
                        console.error('Row update error:', error);
                    }}
                />
            </Box>
        </div>
    )
}

export default EditableDataGrid