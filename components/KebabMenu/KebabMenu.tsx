import React, { useState } from "react";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { KebabIcon } from "./KebabIcon";

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

  const openPage = (routerPath: string) => {
    handleClose();
    router.push(routerPath);
  };

  const options = [
    { name: "Select breeds", path: "/select-breeds" },
    { name: "About", path: "/about" },
  ];

  const ITEM_HEIGHT = 48;

  return (
    <button className={`${style.headerButton} ${style.kebab}`}>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        color='default'
      >
        <KebabIcon />
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
            maxHeight: ITEM_HEIGHT * 4,
            width: "25ch",
          },
        }}
      >
        <div className={style.kebabOptionsContainer}>
          <div className={style.kebabOptions}>
            {options.map((option) => (
              <MenuItem key={option.name} onClick={() => openPage(option.path)}>
                {option.name}
              </MenuItem>
            ))}
          </div>
        </div>
      </Menu>
    </button>
  );
};
