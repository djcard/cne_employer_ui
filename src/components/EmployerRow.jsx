import { removePersonToEmployer, saveEmployer } from "../containers/employerMethods";
import { useDispatch, useSelector } from "react-redux";

const EmployerRow = ({item,applicationCode,chosenEmp,personuuid,highlight=0,chooseFunc,remEmployer,showChoose=false,showEdit=true,showRemove=true}) => {
    let bgColor=(item.orguuid && chosenEmp===item.orguuid) || highlight ? "green" : null;
    let token = useSelector(state => state.user.token);
    let dispatch = useDispatch();
    remEmployer = remEmployer ? remEmployer : (orguuid)=>{
        removePersonToEmployer(dispatch, token, orguuid, personuuid);
    }
    
    return <tr key={item.MEDICARE_PROVIDER_NUMBER}>
        <td style={{backgroundColor:bgColor}}>&nbsp;</td>
    <td>{item.name}</td>
    <td>{item.street}</td>
    <td>{item.city}</td>
    <td>{item.state}</td>
    <td>{item.zip}</td>
    <td>{!showChoose || item.orguuid && chosenEmp===item.orguuid
        ? null 
        : <button className="btn btn-primary" onClick={()=>{chooseFunc(item)}}>Choose</button> }</td>
    <td>{showRemove && item.orguuid ? <button className="btn btn-danger" onClick={()=>{remEmployer(item.orguuid)}}>Remove</button> : null}</td>
   </tr>
}

export default EmployerRow;