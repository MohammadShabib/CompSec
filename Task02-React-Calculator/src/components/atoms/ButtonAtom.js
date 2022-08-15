import Button from "@mui/material/Button";
/**
 *
 * @param {Object} props
 * @param {string} props.className
 * @param {string} props.variant
 * @param {string} props.color
 * @param {function} props.onClick
 * @param {Object} props.style
 * @returns {React.ReactElement}
 */
const ButtonAtom = (props) => {
    return (
        <Button
            className={props.className}
            variant={props.variant}
            onClick={props.onClick}
            style={props.style}
        >
            {props.children}
        </Button>
    );
};
export default ButtonAtom;
