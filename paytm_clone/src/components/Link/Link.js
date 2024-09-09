import "./Link.css";
const Link = ({link , children}) => {
    return(
        <>
            <a href={link} className="link">{children}</a>
        </>
    )
};

export default Link;