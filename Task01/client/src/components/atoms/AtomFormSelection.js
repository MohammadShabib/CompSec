import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const AtomFormSelection = ({ defaultValue, onBlur, options, disabled }) => {
    return (
        <Form.Select
            onBlur={onBlur}
            disabled={disabled}
            defaultValue={defaultValue}
        >
            {options.map((opt, index) => {
                return (
                    <option key={index} value={opt.value}>
                        {opt.value_text}
                    </option>
                );
            })}
        </Form.Select>
    );
};

AtomFormSelection.defaultProps = {
    defaultValue: "",
    disabled: false,
};

AtomFormSelection.prototype = {
    defaultValue: PropTypes.string,
    onBlur: PropTypes.func,
    options: PropTypes.array,
    disabled: PropTypes.bool,
};
export default AtomFormSelection;
