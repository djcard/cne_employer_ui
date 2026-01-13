import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import { searchHospitals } from "../containers/employerMethods";

var call = {};

const SearchName = () => {
    let [usstate,setUSState] = useState("MA");
    let token = useSelector(state => state.user?.token) || "";
    let dispatch = useDispatch();

    let allLicenseAreas = useSelector((state)=> state.cne.allLicenseAreas) || [];

    const searchEmployer = ( dispatch, token, val, searchMethod="name" ) => {
        clearTimeout(call);;
    
        if(val?.length >= 3){
            call = setTimeout(()=>{searchHospitals(dispatch, token, val, searchMethod, usstate)},1000);
        }
    }


    return <div>
        <h5>Employer Name</h5>
        <p>Please choose a state and enter at least 3 characters of your employer's name and then choose from the results. 
    Note: Sometimes punctuation such as periods or apostrophes are not consistent. If you are not getting the results 
    you need, try a word without punctuation which is part of the hospital's name.</p>
    <div className="row mb-3">
    <div className="col-3">
            <select className="form-control" onChange={(evt)=>{setUSState(evt.currentTarget.value)}} value={usstate}>
                <option>State</option>
                {allLicenseAreas.map((item)=>{
                        return <option value={item.code} >{item.name}</option>
                    })}
            </select>
        </div>
        <div className="col-9">
            <input type="text" className="form-control" placeholder="Search Facilities" onChange={(evt)=>{searchEmployer(dispatch, token, evt.currentTarget.value, "name")}} />
        </div>
        
    </div>
</div>
}

export default SearchName;