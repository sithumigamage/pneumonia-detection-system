import React from 'react'
import "../../SCSS/Homepage.scss";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigator = useNavigate();
    const handleScanNow = () =>{
        navigator('/pneumonia');
    }
    return (
            <div className="banner">
                <h1 className="main-text">
                    Pneumonia Doesn’t Wait. Why Should You?
                </h1>
                <p className="Banner-text">
                    Diagnose Smarter. Act Faster. Save Lives.
                </p>
                <div className="button-group">
                    <button className="scan" onClick={()=>handleScanNow()}>
                        Scan Now
                    </button>
                </div>
            </div>
    )
}

export default HomePage
