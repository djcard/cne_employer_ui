import { openModal, randNum } from "/src/utilities/utilityFunctions";
import {useDispatch} from "react-redux";
import EmmployerWatcher from "./EmployerWatcher";
import { useSelector } from "react-redux";

const EmployerDisplay = ( {addr} ) => {
    let dispatch = useDispatch();
    let addrArr = [
        addr?.orgname,
        addr?.street,
        addr?.street2,
        (addr?.city ? addr?.city + ", " : "") + addr?.state + " " + addr?.zip,
        addr?.country
    ]

    let mode= useSelector((state)=>state.cne.reviewMode) || "reviewer";

    let allowedEditEmployers = ["user","admin"]

    let newEmplink = allowedEditEmployers.indexOf(mode) !== -1 ? <span onClick={()=>{openModal(dispatch, "searchEmployer", "Search Employer")}}> (+) </span> : null; 
    return <div>
        <EmmployerWatcher />
        <h4>Employer {newEmplink}</h4>
        {addrArr.filter((item)=>{
            return item && item?.length && item.indexOf("undefined") === -1;
        })
        .map((item)=>{
            return <div key={randNum(1,10000)}>{item ? item : null}</div>
        })}

    </div>
}

export default EmployerDisplay;