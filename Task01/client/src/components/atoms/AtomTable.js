import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";

const AtomTable = ({ columns, data, selectRow, rowEvents }) => {
    return (
        <>
            <BootstrapTable
                classes="table-dark"
                keyField="id"
                data={data}
                columns={columns}
                striped
                hover
                condensed
                pagination={paginationFactory()}
                selectRow={selectRow}
                rowEvents={rowEvents}
            />
        </>
    );
};

AtomTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    selectRow: PropTypes.object,
    rowEvents: PropTypes.object,
};

export default AtomTable;
