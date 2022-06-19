import { Box, FormControlLabel, Switch } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";

import { TodoAddForm } from "../components/Form/AddForm";
import { IndexPage } from "../components/head/head";
import { TodosFilter } from "../components/Todos/TodosFilter";
import { TodosRequest } from "../components/Todos/TodosRequest";
import type { TodoFilter } from "../const/todos-filter";
import type { TodoListFilter } from "../const/todos-list-filter";
import type { CreateTodo, Todo } from "../types/todo";

const Home: NextPage = () => {

  const [filter, setFilter] = useState<TodoFilter>("ALL");
  const [listFilter, setListFilter] = useState<TodoListFilter>(true);
  const listDisplay = (): void => {
    setListFilter(!listFilter);
  };

  const [addState, setAddState] = useState<boolean>(false)
  const HandleAddTodo = (newTodo: CreateTodo): void => {
    axios.post("http://localhost:8080", newTodo)
      .then((response) => {
        setAddState(true)
      });
      setAddState(false)
  };


  return (
    // Main components that build the main page
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IndexPage title="Todo-list" />
        <TodoAddForm onAdd={HandleAddTodo} />
        <Box component="div" sx={{ p: "5%" }}>
          <Box component="div" sx={{ border: "1px solid black" }}>
            <TodosFilter
              filter={filter}
              click={(filter: TodoFilter) => {
                setFilter(filter);
              }}
            />
            <FormControlLabel
              sx={{ ml: "50px", mt: "20px" }}
              control={<Switch onChange={listDisplay} name="display" />}
              label="Display"
            />
            <TodosRequest
            filter={filter}
            listFilter={listFilter}
            addState={addState}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
