import Pad from "../molecules/Pad.Molecules";
import TextInput from "../atoms/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { calculatorActions } from "../../store/calculator.slice";
import operation from "../../services/operation.Service";
import React from "react";

/**
 * calculator which consists of the pad and the input/output display
 * @returns {React.ReactElement}
 */
const Calculator = () => {
    const { val } = useSelector((state) => state);
    const dispatch = useDispatch();
    const textInputonChangeHandler = (e) => {
        dispatch(calculatorActions.setValue({ val: e.target.value }));
    };
    const textInputonKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            dispatch(
                calculatorActions.setValue({
                    val: operation.evaluate(val),
                })
            );
        }
    };
    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                <TextInput
                    className="col-12 col-lg-8 col-xl-6"
                    variant="filled"
                    value={val}
                    onchange={textInputonChangeHandler}
                    onKeyDown={textInputonKeyDownHandler}
                    style={{ backgroundColor: "#848693" }}
                />
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 col-xl-6">
                    <Pad />
                </div>
            </div>
        </div>
    );
};

export default Calculator;
