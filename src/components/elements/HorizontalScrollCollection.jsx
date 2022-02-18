import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Arrow } from "./Arrow";
import useStyles from "../styles/Scrollbar";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import SubTitleCollection from "./SubTitleCollection";
import { usePalette } from "react-palette";
import alt from "../../assets/alt.png";

// const getItems = content;

function HorizontalScrollingCollection(props) {
  let isTrending=false;
  let isAuthor=false;
  let onSale = false;
  const [items, setItems] = React.useState(props.getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const classes = useStyles();
  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <ArrowBackIosRoundedIcon className={classes.arrow} />
      </Arrow>
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <ArrowForwardIosRoundedIcon className={classes.arrow} />
      </Arrow>
    );
  }

  function Card({ onClick, selected, title, itemId, img, author }) {
    const visibility = React.useContext(VisibilityContext);
    const { data } = usePalette(img);

    return (
      <div onClick={() => onClick(visibility)}>
        <div
          className={classes.card}
          style={{ backgroundColor: data.darkMuted }}>
          <img
            src={img}
            alt={title}
            className={classes.image}
            onError={(e) => {
              e.target.src = alt;
              e.target.onerror = null; // prevents looping
            }}
          />
          <SubTitleCollection
            isTrending={isTrending}
            isAuthor={isAuthor}
            onSale={onSale}
            isCollection={props.isCollection}
            src={img}
            title={title}
            author={author}
            setup={props.setup}
          />
        </div>
      </div>
    );
  }

  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      className={classes.scrollMenu}>
      {items.map(({ id, title, coverImageHash, descriptionHash, author }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          title={title}
          key={id}
          img={coverImageHash}
          description={descriptionHash}
          author={author}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
        />
      ))}
    </ScrollMenu>
  );
}

export default HorizontalScrollingCollection;