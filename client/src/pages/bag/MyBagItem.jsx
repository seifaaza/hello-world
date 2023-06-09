import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";

export default function MyBagItem(props) {
  const [open, setOpen] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  return (
    <>
      <div
        className="w-64 flex flex-col gap-3 bg-white dark:bg-dark rounded-lg py-4 px-6 max-w-sm cursor-pointer hover:scale-105 duration-300 hover:shadow-sm "
        onClick={handleOpen}
      >
        <div
          className={`h-40 w-full rounded overflow-hidden bg-center bg-cover bg-[url('/marketplace/${props.image}')]`}
        ></div>
        <div className="flex justify-between gap-2 dark:text-slate-100">
          <div className="flex flex-col gap-2 overflow-hidden">
            <h1 className="text-small-heading overflow-hidden whitespace-nowrap text-ellipsis">
              {props.title}
            </h1>
            <h3 className="font-main text-small font-semibold">
              {" "}
              {props.price} MAD
            </h3>
          </div>

          <IconButton component={Link} to="/confirm" className="self-end">
            <ShoppingCartIcon color="secondary" />
          </IconButton>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="shadow-md rounded-lg flex flex-col laptop:flex-row w-5/6 tablet:w-2/4 h-fit justify-between gap-6 dark:bg-slate-900"
        >
          <div
            className={`h-64 w-2/4 rounded overflow-hidden bg-center bg-cover bg-[url('/marketplace/${props.image}')]`}
          ></div>
          <div className="flex flex-col justify-between w-full laptop:w-3/4 font-main dark:text-slate-300">
            <div className="flex flex-col items-start ">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-main text-medium dark:text-white">
                  {props.title}
                </h3>
                <h2 className="text-small-heading text-violet-600 font-medium whitespace-nowrap self-start">
                  {props.price} MAD
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-start gap-5">
              <div className="flex justify-center items-center gap-3">
                <Avatar
                  sx={{ height: "30px", width: "30px" }}
                  alt={props.freelancer}
                  // src="/assets/images/mohamed.jpg"
                />
                <p className="font-main text-small-heading dark:text-white ">
                  {props.freelancer}
                </p>
              </div>
              <p className="overflow-hidden">{props.des}</p>
              <div className="flex flex-col laptop:flex-row gap-3">
                <Button
                  size="large"
                  variant="outlined"
                  className="btn btn-outlined w-fit"
                  endIcon={<ShoppingBagIcon />}
                >
                  Add to bag
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  className="btn btn-contained w-fit"
                  endIcon={<ShoppingCartIcon />}
                  onClick={() => setAddItem("yes")}
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

MyBagItem.propTypes = {
  freelancer: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  mark: PropTypes.string,
  des: PropTypes.string,
};
