import { removePersonToEmployer, saveEmployer } from "../containers/employerMethods";
import { useDispatch, useSelector } from "react-redux";

const EmployerFlexRow = ({item,applicationCode,chosenEmp,personuuid,highlight=0,chooseFunc,remEmployer,showChoose=false,showEdit=true,showRemove=true}) => {
    let bgColor=(item.orguuid && chosenEmp===item.orguuid) || highlight ? "green" : null;
    let token = useSelector(state => state.user.token);
    let dispatch = useDispatch();
    remEmployer = remEmployer ? remEmployer : (orguuid)=>{
        removePersonToEmployer(dispatch, token, orguuid, personuuid);
    }
    
    return <div className="d-flex flex-row justify-content-between" style={{marginBottom:10, borderBottom:"thin solid gray"}}>
        <div className="d-flex flex-column flex-xxl-row flex-xl-row justify-content-end">
            <div>{item.name}</div>
            <div>{item.street}</div>
            <div>{item.city}, {item.state} {item.zip}</div>
            <div>{item.npinumber && item.npinumber.length ? <br/> : null}</div>
            <div>{item.npinumber && item.npinumber.length ? "NPI: " + item.npinumber : null}</div>
        </div>
        <div>
        {!showChoose || item.orguuid && chosenEmp===item.orguuid
            ? null 
            : <button className="btn btm-sm btn-primary p-1" onClick={()=>{chooseFunc(item)}}>Choose</button> 
        }
        {showRemove && item.orguuid 
            ? <button className="btn btm-sm btn-danger p-1" onClick={()=>{remEmployer(item.orguuid)}}>Remove</button> 
            : null}
        </div>
    </div>
}

export default EmployerFlexRow;

/*

<tr key={item.MEDICARE_PROVIDER_NUMBER + item.npinumber + item.orguuid}>
        <td style={{backgroundColor:bgColor}}>&nbsp;</td>
    <td>{item.name}</td>
    <td>{item.street}</td>
    <td>{item.city}</td>
    <td>{item.state}</td>
    <td>{item.zip}</td>
    <td></td>
    <td></td>
   </tr>
*/
