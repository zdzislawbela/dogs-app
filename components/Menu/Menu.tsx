import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useAppContext } from "../../context";

export default function LongMenu() {
  const { apiCallCounter, likedDogs, setIsModalOpen } = useAppContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    if (likedDogs.length === 0) {
      return handleClose();
    }
    handleClose();
    setIsModalOpen(true);
  };

  const options = [
    `Fetched: ${apiCallCounter}`,
    `Liked: ${likedDogs.length}`,
    "Select breeds",
  ];

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
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === `Liked: ${likedDogs.length}`}
            onClick={
              option === `Liked: ${likedDogs.length}`
                ? handleOpenModal
                : handleClose
            }
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
