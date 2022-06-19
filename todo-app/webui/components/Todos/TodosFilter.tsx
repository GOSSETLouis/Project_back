import { Box, ListItemButton } from "@mui/material";

import { TodosFilter } from "../../types/todos-filter";

const border = "1px solid rgba(70, 70, 70, 0.747)";
const borderBottom = "1px solid grey";
const TodosFilter = ({ filter, click }: TodosFilter): JSX.Element => (
  <Box component="div" sx={{ p: "7.5px 158px 0px" }}>
    <Box component="div" sx={{ p: "15px", borderBottom: borderBottom }}>
      <h2 style={{ textAlign: "center" }}>Filters :</h2>
      <Box component="div" sx={{ display: "flex", gap: "5px" }}>
        <ListItemButton
          style={
            filter === "ALL"
              ? {
                  justifyContent: "center",
                  width: "25%",
                  border: border,
                  borderRadius: "3px",
                }
              : {
                  justifyContent: "center",
                  width: "25%",
                  color: "#363C4A",
                  borderRadius: "3px",
                  backgroundColor: "#79DAE8",
                }
          }
          onClick={() => {
            click("ALL");
          }}
        >
          ALL
        </ListItemButton>
        <ListItemButton
          style={
            filter === "COMPLETED"
              ? {
                  justifyContent: "center",
                  width: "25%",
                  border: border,
                  borderRadius: "3px",
                }
              : {
                  justifyContent: "center",
                  width: "25%",
                  color: "#363C4A",
                  borderRadius: "3px",
                  backgroundColor: "#79DAE8",
                }
          }
          onClick={() => {
            click("COMPLETED");
          }}
        >
          COMPLETED
        </ListItemButton>
        <ListItemButton
          style={
            filter === "NOTCOMPLETED"
              ? {
                  justifyContent: "center",
                  width: "25%",
                  border: border,
                  borderRadius: "3px",
                }
              : {
                  justifyContent: "center",
                  width: "25%",
                  color: "#363C4A",
                  borderRadius: "3px",
                  backgroundColor: "#79DAE8",
                }
          }
          onClick={() => {
            click("NOTCOMPLETED");
          }}
        >
          NOT COMPLETED
        </ListItemButton>
        <ListItemButton
          style={
            filter === "DEADLINE"
              ? {
                  justifyContent: "center",
                  width: "25%",
                  border: border,
                  borderRadius: "3px",
                }
              : {
                  justifyContent: "center",
                  width: "25%",
                  color: "#363C4A", 
                  borderRadius: "3px",
                  backgroundColor: "#79DAE8",
                }
          }
          onClick={() => {
            click("DEADLINE");
          }}
        >
          DEADLINE
        </ListItemButton>
      </Box>
    </Box>
  </Box>
);

export { TodosFilter };
