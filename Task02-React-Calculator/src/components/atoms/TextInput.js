import TextField from "@mui/material/TextField";
/**
 *
 * @param {Object} props
 * @param {string} props.className
 * @param {string} props.label
 * @param {string} props.value
 * @param {function} props.onchange
 * @param {function} props.onKeyDown
 * @param {Object} props.style
 * @returns
 */
const TextInput = (props) => {
    return (
        <TextField
            className={props.className}
            label={props.label}
            value={props.value}
            variant={props.variant}
            onChange={props.onchange}
            onKeyDown={props.onKeyDown}
            style={props.style}
        />
    );
};
export default TextInput;
