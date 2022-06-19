import { Box, Input } from "@mui/material";

import { MyInput } from "../../types/my-input";

const MyInput = ({
  id,
  label,
  value,
  type,
  onChange,
  onKey,
}: MyInput): JSX.Element => (
  <Box
    component="div"
    sx={{ m: "0 10px", padding: "0px 0px", width: "100%" }}
  >
    <Input
      sx={{ width: "100%", height: "56px" }}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKey}
      placeholder={label}
    />
  </Box>
);

export { MyInput };
