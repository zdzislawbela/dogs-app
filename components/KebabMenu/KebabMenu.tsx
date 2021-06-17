import React, { useState } from "react";
import { useRouter } from "next/router";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import style from "./KebabMenu.module.css";

export const KebabMenu = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAboutPage = () => {
    handleClose();
    router.push("/about");
  };

  const options = ["Select breeds", "About"];

  const ITEM_HEIGHT = 48;

  return (
    <>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        color='primary'
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        className={style.menu}
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <div className={style.kebabOptionsContainer}>
          <div className={style.kebabOptionsHeader}>
            <p>🐕 </p>
          </div>

          <div className={style.kebabOptions}>
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={option === `About` ? openAboutPage : handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </div>
        </div>
      </Menu>
    </>
  );
};
