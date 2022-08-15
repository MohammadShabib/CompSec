import Calculator from "../components/organisms/Calculator.Organism";

/**
 *  Home page
 * @returns {React.ReactElement}
 */
const Home = () => {
    return (
        <div className="container text-center">
            <div className="row my-4">
                <div className="col">
                    <h1>The Calculator</h1>
                </div>
            </div>
            <div className="row">
                <Calculator />
            </div>
        </div>
    );
};

export default Home;
