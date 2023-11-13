import { CSSProperties } from "react";
import { ClockLoader } from "react-spinners";

const override: CSSProperties = {
  position: 'relative',
  margin: "0 auto",
  visibility: 'visible',
  zIndex: 1000,
};

interface Props {
    color: string;
    loading: boolean;
}

const Spinner: React.FC<Props> = ({ color, loading }) => {
    return (
        <ClockLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Spinner;
