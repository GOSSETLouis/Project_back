// import mc from "./floating-btn.module.scss";
import Button from "@mui/material/Button";

import { FloatingButton } from "../../types/floating-button";

const FloatingButton = ({ src, color, click }: FloatingButton): JSX.Element => {
  const style = {
    backgroundImage: `url('${src}')`,
    backgroundColor: color,
  };

  return <Button variant="contained" style={style} onClick={click}></Button>;
};

export { FloatingButton };
