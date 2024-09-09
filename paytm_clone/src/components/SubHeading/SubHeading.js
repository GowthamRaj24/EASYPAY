import "./SubHeading.css";

const SubHeading = ({children , size}) => {
    return(
    <div className="subHeading" style={{fontSize:`${size}rem`}}>
        {children}
    </div>)
}

export default SubHeading;