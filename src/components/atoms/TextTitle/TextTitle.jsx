// Styles
import classes from "./TextTitle.module.css";

const TextTitle = ({ children }) => {
    return <h1 className={classes['text-title']}>{children}</h1>;
};

export default TextTitle;
