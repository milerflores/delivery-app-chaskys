import { Icon } from "@iconify/react";

import { useState } from "react";
import { SupportModal } from "./SupportModal";

import "../../styles/shared/support.css";

export const Support = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="section-support" onClick={() => setOpen(true)}>
        <div>
          <span className="icon-plus-word">
            <Icon icon="ix:support" width="30" height="30" />
          </span>
          <span>Soporte</span>
        </div>
      </div>

      <SupportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
