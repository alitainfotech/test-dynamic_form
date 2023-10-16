import React, { useEffect, useState } from "react";
import "./App.css";
import apiService from "./apis/api";
import { Card, CardContent, Button, ButtonGroup } from "@mui/material";
import ModalForm from "./components/Modal.component";
import TableComponent from "./components/Table.component";

function App() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState("tbtax");
  const [tableData, setTableData] = useState({
    tbtax: { column: [], rows: [] },
    tbuser: { column: [], rows: [] },
  });

  const fetchData = async (tableName) => {
    try {
      const response = await apiService.fetchTableFields(tableName);
      setData(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData("tbtax");
  }, []);

  const onSubmit = async (formData) => {
    try {
      await apiService.submitData(formData);
      tableData[currentTable].column = formData.data.map((c) => c.Field);
      tableData[currentTable].rows.push(formData.data.map((c) => c.Value));
      setTableData(tableData);
      setModalOpen(false);
    } catch (error) {}
  };

  const handleButtonClick = async (tableName) => {
   await fetchData(tableName);
    setCurrentTable(tableName);
    setModalOpen(true);
  };

  const tableButtons = ["tbtax", "tbuser"].map((tableName) => (
    <Button key={tableName} onClick={() => handleButtonClick(tableName)}>
      {tableName}
    </Button>
  ));

  return (
    <div className="App">
      <Card sx={{ margin: "1rem" }}>
        <ButtonGroup
          sx={{ padding: "1rem" }}
          size="small"
          aria-label="small button group"
        >
          {tableButtons}
        </ButtonGroup>
        <CardContent>
          <TableComponent tableData={tableData[currentTable]} />
          <ModalForm
            open={modalOpen}
            handleClose={() => setModalOpen(false)}
            data={data}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
