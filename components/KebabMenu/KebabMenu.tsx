import React, { useState } from "react";
import { useRouter } from "next/router";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { KebabIcon } from "./KebabIcon";

import { useStyles } from "./styles";

export const KebabMenu = () => {
  const classes = useStyles();

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


  const ITEM_HEIGHT = 48;

  return (
    <div>
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
        className={classes.menu}
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
        <div className={classes.kebabOptionsContainer}>
          <div>
            <MenuItem key='About' onClick={() => openPage("/about")}>
              About
            </MenuItem>
          </div>
        </div>
      </Menu>
    </div>
  );
};
