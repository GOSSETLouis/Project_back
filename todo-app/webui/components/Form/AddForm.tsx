import { Box, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import * as React from "react";

import type { CreateTodo } from "../../types/todo";
import { MyInput } from "./Input";

const TodoAddForm = ({
  onAdd,
}: {
  onAdd: (argument: CreateTodo) => void;
}): JSX.Element => {
  const [inputValue, SetInputValue] = useState("");
  const [value, setValue] = React.useState<Date>(new Date());
  const [mode, setMode] = useState("NoDeadLine");

  const MaterialUIPickers = (): JSX.Element => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={0}>
        <DesktopDatePicker
          label="Dead Line"
          inputFormat="yyyy/MM/dd"
          value={value}
          renderInput={(parameters) => (
            <TextField
              {...parameters}
              sx={{
                mr: "10px",
                width: "100%",
                padding: "0px 0px",
              }}
            />
          )}
          onChange={(date) => {
            date && setValue(date);
          }}
        />
      </Stack>
    </LocalizationProvider>
  );

  const handleImputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLButtonElement;

    SetInputValue(target.value);
  };

  const handleSubmit = (event: FormEvent): CreateTodo | undefined => {
    event.preventDefault();
    if (inputValue.length > 0) {
      const now = Date.now();
      const newTodo = {
        name: inputValue,
        isCompleted: false,
        deadLine: mode === "DeadLine" ? value.getDate() : null,
        creationDate: now,
      };
      onAdd(newTodo);
      SetInputValue("");
      return newTodo;
    } else {
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Box
        component="div"
        sx={{
          height: "200px",
        }}
      >
        <h1 style={{ margin: "0", textAlign: "center", paddingTop: "33px" }}>
          My Todo List
        </h1>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          mb: "30px",
          mt: "-100px",
          flexDirection: "column",
        }}
      >
        <Box
          component="div"
          sx={{
            minWidth: "70%",
            m: "auto",
            p: "54px 34px 27px 34px",
            backgroundColor: "white",
            boxShadow: "20px 20px 60px #d0d0d0, -20px -20px 60px #f0f0f0",
            display: "flex",
          }}
        >
          <Box
            component="div"
            sx={{ display: "flex", width: "45%", alignItems: "center" }}
          >
            <MyInput
              id={"add-todo"}
              label={"Your todo name"}
              value={inputValue}
              type={"text"}
              onChange={handleImputChange}
            />
          </Box>
          <Box component="div" sx={{ display: "flex", width: "55%" }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ height: "56px", mr: "10px" }}
            >
              Add new Todo
            </Button>
            {mode === "NoDeadLine" ? (
              <Button
                sx={{ mr: "10px", maxWidth: "150px", height: "56px" }}
                onClick={() => {
                  setMode("DeadLine");
                }}
                variant="outlined"
              >
                Add DeadLine
              </Button>
            ) : (
              <Box
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box component="div" sx={{ height: "56px" }}>
                  <MaterialUIPickers />
                </Box>
                <Button
                  sx={{
                    mr: "10px",
                    maxWidth: "150px",
                    height: "56px",
                    ml: "10px",
                  }}
                  onClick={() => {
                    setMode("NoDeadLine");
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export { TodoAddForm };
