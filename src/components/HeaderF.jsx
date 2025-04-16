
import logo from '../images/logo_header.png';
export default function HeaderF(){
    return(
        <div className="header">
            <img className="header_img" src={logo} alt="" />
            <h1 className="header_text" >Master Chef</h1>
        </div>
    )
}