import { useState } from "react"
import { saveEmployer, searchEmployers } from "../containers/employerMethods";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import MessageBoard from "/src/components/supporting/MessageBoard";

let search = {};

const EmployerForm = ({item,personuuid}) => {
    let dispatch = useDispatch();
    let userToken = useSelector((state)=> state.user ? state.user.token : "");
    let empty = {name:"",street:"",city:"",state:"",zip:"",orguuid:"",MEDICARE_PROVIDER_NUMBER:""};
    let [org,setOrg] = useState(Object.assign({},empty,item ? item : {}));
    let employerResults = useSelector((state)=> state.cne.employerResults) || [];
    let allLicenseAreas = useSelector((state)=> state.cne.allLicenseAreas) || [];

    useEffect(()=>{
        if(org.name && org.name.length && org.name.length > 3){
            clearTimeout(search);
            search = setTimeout(()=>{searchEmployers(dispatch, userToken, org.name)},1000);
        }
    },[org.name])

    return <div className="row">
        <div className="col-12">
            <MessageBoard />
        </div>
        <div className="col-12">
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="newName" value={org.name} 
                    onChange={(evt)=>{setOrg(Object.assign({},org,{name:evt.target.value}))}} />
                <label htmlFor="newName" className="form-label">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="newName" value={org.street} onChange={(evt)=>{setOrg(Object.assign({},org,{street:evt.target.value}))}} />
                <label htmlFor="newstreet" className="form-label">Street</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="newcity" value={org.city} onChange={(evt)=>{setOrg(Object.assign({},org,{city:evt.target.value}))}} />
                <label htmlFor="newcity" className="form-label">City</label>
            </div>
            <div className="form-floating mb-3">
                <select onChange={(evt)=>{setOrg(Object.assign({},org,{state:evt.target.value}))}} className="form-control">
                    <option value=""></option>
                    {allLicenseAreas.map((item)=>{
                        return <option value={item.abbr} >{item.name}</option>
                    })}
                </select>
                
                <label htmlFor="newstate" className="form-label">State</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="newzip" value={org.zip} onChange={(evt)=>{setOrg(Object.assign({},org,{zip:evt.target.value}))}} />
                <label htmlFor="newzip" className="form-label">Zip</label>
            </div>
            <div className="form-floating mb-3">
                <button className="btn btn-primary" onClick={()=>{saveEmployer(dispatch, userToken, Object.assign({},org,{personuuid:personuuid})); setOrg(Object.assign({},empty))}}>Choose</button>
            </div>
        </div>
        <div className="col-4">
            {employerResults.map((item)=>{
                return <div>{item.orgname}</div>
            })}
        </div>
   </div>
}

export default EmployerForm;

//<input type="text" className="form-control" id="newstate" value={org.state} onChange={(evt)=>{setOrg(Object.assign({},org,{state:evt.target.value}))}} />