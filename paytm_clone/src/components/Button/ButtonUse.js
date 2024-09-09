import Button from '@mui/material/Button';

const ButtonUse= ({link , children , onClick}) => {
    return (<>
    <Button variant="contained" href={link} fullWidth style={{height:"45px"}} onClick={onClick}>{children}</Button>
    </>)
}

export default ButtonUse;