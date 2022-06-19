import {
  Box,
  Button,
  Icon,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import Image from "next/image";
import type { ChangeEvent, KeyboardEvent } from "react";
import React, { useState } from "react";

import { TodoItem } from "../../types/todo-item";
import { MyInput } from "../Form/Input";

// Component TodoItem, represent every unique todo, contain the onlcick event
const TodoItem = ({
  id,
  name,
  isCompleted,
  onComplete,
  onUpdate,
  deadLine,
  listfilter,
  creationDate,
  onDelete,
}: TodoItem): JSX.Element => {
  const [mode, setMode] = useState("read");
  const [updatedValue, setUpdatedValue] = useState(name);
  const handleTodoClick = (): void => {
    onComplete(id, isCompleted);
  };
  const handleDelete = (): void => {
    onDelete(id);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLButtonElement;
    const InputUpdatedValue = target.value;
    setUpdatedValue(InputUpdatedValue);
  };
  const cancel = (): void => {
    setMode("read");
    setUpdatedValue(name);
  };
  const handleKeydown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && updatedValue.length > 0) {
      onUpdate(id, updatedValue, LineDate);
      setMode("read");
    }
    if (event.key === "Escape") {
      cancel();
    }
  };

  const validate = (): void => {
    onUpdate(id, updatedValue, LineDate);
    setMode("read");
  };

  const date = new Date(creationDate);
  const formatDate = format(date, "yyyy-MM-dd");
  const deadLineDate = deadLine !== null ? deadLine : null;
  const formatDeadline = deadLineDate && format(deadLineDate, "yyyy-MM-dd");
  const [LineDate, setLineDate] = React.useState<number | null>(deadLineDate);

  const MaterialUIPickers = (): JSX.Element => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={0}>
        <DesktopDatePicker
          label="Dead Line"
          inputFormat="yyyy/MM/dd"
          value={LineDate}
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
            date && setLineDate(date);
          }}
        />
      </Stack>
    </LocalizationProvider>
  );

  const DisplayList = (): JSX.Element => (
    <>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(70, 70, 70, 0.5)",
          mb: "10px",
          height: "73px",
          cursor: "pointer",
        }}
        style={
          isCompleted
            ? {
              color: "grey",
              cursor: "pointer",
              textAlign: "center",
              background:
                "linear-gradient(to top, #fff calc(50% - 3px), #aaa, #fff calc(50% + 3px) )",
            }
            : {
              color: "black",
              cursor: "pointer",
              textAlign: "center",
            }
        }
      >
        {mode === "read" ? (
          <>
            <ListItemText
              sx={{
                minWidth: "30%",
                maxWidth: "30%",
                textAlign: "center",
              }}
              onClick={handleTodoClick}
            >
              {name}
            </ListItemText>
            <ListItemText
              sx={{
                minWidth: "30%",
                maxWidth: "30%",
                textAlign: "center",
              }}
              onClick={handleTodoClick}
            >
              {formatDate}
            </ListItemText>
            <ListItemText
              sx={{
                minWidth: "30%",
                maxWidth: "30%",
                textAlign: "center",
              }}
              onClick={handleTodoClick}
            >
              {formatDeadline != undefined ? "DeadLine : " : "No DeadLine"}
              {formatDeadline}
            </ListItemText>
            <Button
              sx={{
                minWidth: "5%",
                maxWidth: "5%",
                mr: "2px",
                opacity: "0.5",
                color: "black",
                borderColor: "black",
                "&:hover": {
                  color: "black",
                  borderColor: "black",
                  opacity: "1",
                },
              }}
              onClick={() => {
                setMode("edit");
              }}
              variant="outlined"
              disabled={isCompleted ? true : false}
            >
              <Icon>
                <Image
                  src="/../../edit-outline.svg"
                  alt="Landscape picture"
                  width={500}
                  height={500}
                />
              </Icon>
            </Button>
            <Button
              sx={{
                minWidth: "5%",
                maxWidth: "5%",
                opacity: "0.5",
                color: "black",
                borderColor: "black",
                "&:hover": {
                  color: "black",
                  borderColor: "black",
                  opacity: "1",
                },
              }}
              onClick={handleDelete}
              variant="outlined"
            >
              <Icon>
                <Image
                  src="/../../trash.svg"
                  alt="Landscape picture"
                  width={500}
                  height={500}
                />
              </Icon>
            </Button>
          </>
        ) : (
          <>
            <MyInput
              id={"edit-todo"}
              label={"Modifier un todo"}
              value={updatedValue}
              type={"text"}
              onChange={handleInputChange}
              onKey={handleKeydown}
            />
            <MaterialUIPickers />
            <Button
              sx={{ minWidth: "10%", maxWidth: "10%", ml: "10px" }}
              onClick={cancel}
              variant="contained"
            >
              <Icon>
                <Image
                  src="/../../close-outline.svg"
                  alt="Landscape picture"
                  width={500}
                  height={500}
                />
              </Icon>
            </Button>
            <Button
              sx={{ minWidth: "10%", maxWidth: "10%", ml: "10px" }}
              onClick={validate}
              variant="contained"
            >
              <Icon>
                <Image
                  src="/../../check-outline.svg"
                  alt="Landscape picture"
                  width={500}
                  height={500}
                />
              </Icon>
            </Button>
          </>
        )}
      </ListItem>
    </>
  );

  const DisplayCard = (): JSX.Element => (
    <>
      <Box component="div" sx={{ display: "flex", width: "50%" }}>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 20px",
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              boxShadow: "0px 10px 10px 0px rgba(0,0,0,0.10)",
              minHeight: "250px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {mode === "read" ? (
              <ListItemText
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                style={
                  isCompleted
                    ? {
                      color: "grey",
                      cursor: "pointer",
                      textAlign: "center",
                      background:
                        "linear-gradient(to top right, #fff calc(50% - 1px), #aaa, #fff calc(50% + 1px) )",
                    }
                    : {
                      color: "black",
                      cursor: "pointer",
                      textAlign: "center",
                    }
                }
              >
                <Box component="div" sx={{ fontSize: "25px", m: "10px 0px" }} onClick={handleTodoClick}>
                  {name}
                </Box>
                <Box component="div" sx={{ mt: "20px" }}>
                  {formatDeadline != undefined
                    ? "DeadLine : "
                    : "No DeadLine"}
                  {formatDeadline}
                </Box>
                <Box
                  component="div"
                  sx={{ textAlign: "center", mb: "15px", mt: "50px" }}
                >
                  Created : {formatDate}
                </Box>
                <Button
                  sx={{
                    minWidth: "10%",
                    maxWidth: "10%",
                    opacity: "0.5",
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                      color: "black",
                      borderColor: "black",
                      opacity: "1",
                    },
                  }}
                  onClick={() => {
                    setMode("edit");
                  }}
                  variant="outlined"
                >
                  <Icon>
                    <Image
                      src="/../../edit-outline.svg"
                      alt="Landscape picture"
                      width={500}
                      height={500}
                    />
                  </Icon>
                </Button>
                <Button
                  sx={{
                    minWidth: "5%",
                    maxWidth: "5%",
                    opacity: "0.5",
                    color: "black",
                    ml: "5px",
                    borderColor: "black",
                    "&:hover": {
                      color: "black",
                      borderColor: "black",
                      opacity: "1",
                    },
                  }}
                  onClick={handleDelete}
                  variant="outlined"
                >
                  <Icon>
                    <Image
                      src="/../../trash.svg"
                      alt="Landscape picture"
                      width={500}
                      height={500}
                    />
                  </Icon>
                </Button>
              </ListItemText>
            ) : (
              <Box
                component="div"
                sx={{
                  display: "flex",
                  height: "56px",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <MyInput
                  id={"edit-todo"}
                  label={"Modifier un todo"}
                  value={updatedValue}
                  type={"text"}
                  onChange={handleInputChange}
                  onKey={handleKeydown}
                />
                <Box component="div" sx={{ mt: "10px" }}>
                  <MaterialUIPickers />
                  <Button
                    sx={{
                      minWidth: "10%",
                      maxWidth: "10%",
                      height: "30px",
                      mt: "10px",
                    }}
                    onClick={cancel}
                    variant="contained"
                  >
                    <Icon>
                      <Image
                        src="/../../close-outline.svg"
                        alt="Landscape picture"
                        width={500}
                        height={500}
                      />
                    </Icon>
                  </Button>
                  <Button
                    sx={{
                      minWidth: "10%",
                      maxWidth: "10%",
                      height: "30px",
                      mt: "10px",
                      ml: "10px",
                    }}
                    onClick={validate}
                    variant="contained"
                  >
                    <Icon>
                      <Image
                        src="/../../check-outline.svg"
                        alt="Landscape picture"
                        width={500}
                        height={500}
                      />
                    </Icon>
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </ListItem>
      </Box >
    </>
  )
  return (
    <>
      {listfilter ? (
        <DisplayList/>
      ) : (
        <DisplayCard/>
      )}
    </>
  );
};

export { TodoItem };
