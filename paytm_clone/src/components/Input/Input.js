import "./Input.css";
import TextField from '@mui/material/TextField';

const Input = ({placeholder, setInput, input}) => {
    return (
        <>
            <div className="inputContainer">
                <TextField id="outlined-basic" label={placeholder} variant="outlined" value={input} onChange={(e) => setInput(e.target.value)}/>
            </div>
        </>
    );
}

export default Input;