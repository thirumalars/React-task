import React from "react";
import HOCIMAGE from "../../assets/images/login_bg.jpg";

export function Hoc(BaseComponent) {
    function enhancedComponent() {
        return (
            <div className="hocdesign">
                <div className="components">
                    <BaseComponent />
                </div>
                <div className="images">
                    <img src={HOCIMAGE}>
                    </img>
                </div>
            </div>
        )
    }
    return enhancedComponent;
}

export default Hoc;