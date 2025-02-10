import { useState } from "react";
import { Button } from "../Button/Button";

export function Box({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className='box'>
      <Button onOpen={setOpen} isOpen={open} />
      {open && children}
    </div>
  );
}
