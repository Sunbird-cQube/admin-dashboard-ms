import { FC } from "react";


const Loader:FC<{loading:boolean}> = ({ loading }) => {
  if (loading) {
    return (
      <div
        className="loading-background"
        style={{ background: "rgba(68, 134, 223, 0.19)" }}
      >
        <div className="loading-bar">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Loader;


Loader.defaultProps = {
  loading: false
};
