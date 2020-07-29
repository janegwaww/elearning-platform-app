import { makeStyles } from "@material-ui/core/styles";

const userStyles = makeStyles((theme) => ({
    btn:{
        backgroundColor: "#007CFF",
        "&:hover":{
            backgroundColor: "#007CFF",
        }
    },
    borderRa:{
        borderRadius:'2em',
        padding:'0.5em 2em'
    }

}));
export default userStyles;
