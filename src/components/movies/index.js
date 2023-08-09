
import { MdLocalMovies } from "react-icons/md";
import { BiSolidUserCircle} from "react-icons/bi";

import './index.css'

const Header=()=>(


    <div className="background">
        <div className="iconsBox">
            <MdLocalMovies className="movieIcon"/>
        <h1>Pro Movies</h1>
        
        </div>
        <BiSolidUserCircle className="movieIcon"/>
        
    </div>
)





export default Header