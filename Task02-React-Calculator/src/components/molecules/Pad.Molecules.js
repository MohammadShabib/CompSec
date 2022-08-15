import Button from "../atoms/ButtonAtom";
import padConstant from "../../constants/pad.Constant";
import { useSelector, useDispatch } from "react-redux";
import { calculatorActions } from "../../store/calculator.slice";

import operation from "../../services/operation.Service";
const symbolMap = new Map([
    ["X", " * "],
    ["÷", " / "],
    ["%", " % "],
    ["-", " - "],
    ["+", " + "],
]);

/**
 *  React elemtns which represent the key pad of the calcualtor
 * @returns {React.ReactElement}
 */
const Pad = () => {
    const { val } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onClickHandler = (e) => {
        const opt = e.target.innerText;
        let res = "";
        if (opt == "=") {
            res = operation.evaluate(val);
        } else if (opt == "AC") {
            res = "";
        } else if (opt == "+/-") {
            res = operation.toggleSign(val);
        } else {
            res = val + (symbolMap.has(opt) ? symbolMap.get(opt) : opt);
        }

        dispatch(calculatorActions.setValue({ val: res }));
    };
    /**
     * creats the pad JSX for padConstant
     */
    const padJSX = padConstant.map((elem) => {
        if (elem) {
            return (
                <Button
                    key={elem}
                    className="col-3"
                    variant="contained"
                    onClick={onClickHandler}
                    style={{
                        backgroundColor: "÷xX-+=".includes(elem)
                            ? "#F5923D"
                            : "#E0E0E0",
                        color: "black",
                    }}
                >
                    {elem}
                </Button>
            );
        }
    });
    return (
        <div className="container text-center p-0">
            <div className="row">{padJSX}</div>
        </div>
    );
};

export default Pad;
