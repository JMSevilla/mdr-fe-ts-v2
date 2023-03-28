import { DataGrid } from "@mui/x-data-grid";
import { rowCreativeDesign } from "@/utils/DataGridRowHelper";

import { ProjectTableProps } from ".";


const ProjectTable: React.FC<ProjectTableProps> = ({
    data, openEdit, sx, handleClick, columns
}: any) => {
    

    
    return (
        <>
            <DataGrid
            sx={sx}
            rows={rowCreativeDesign(data)}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            disableColumnMenu
            />
        </>
    )
}

export default ProjectTable