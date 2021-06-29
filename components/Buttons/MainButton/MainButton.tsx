import React from "react";
import Link from "next/link";

import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

type Props = {
  url: string;
  title: string;
  href: string;
};

export default function MainButton({ title, url, href }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link href={href}>
        <ButtonBase
          focusRipple
          key={title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component='span'
              variant='subtitle1'
              color='inherit'
              className={classes.imageTitle}
            >
              {title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      </Link>
    </div>
  );
}
