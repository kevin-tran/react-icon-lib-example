import React from "react";

import { Icon } from "./icon";

const camera = ({ children, ...props }) => (
  <Icon viewBox="0 0 24 24" {...props}>
    {children}

    <path d="M19.75 5.083h-2.188C16.368 3.17 14.278 2 12 2S7.633 3.17 6.438 5.083H4.25C3.01 5.083 2 6.093 2 7.333V19.75C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V7.333c0-1.24-1.01-2.25-2.25-2.25zM12 17.528a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
  </Icon>
);
export default camera;
