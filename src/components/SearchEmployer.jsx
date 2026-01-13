import { useState } from "react";
import { saveEmployer, searchHospitals } from "../containers/employerMethods";
import EmployerRow from "./EmployerRow";
import {useSelector, useDispatch} from "react-redux";
import MessageBoard from "/src/components/supporting/MessageBoard";
import SearchNPI from "./SearchNPI";
import SearchName from "./SearchName";
var call = {};

const searchEmployer = ( dispatch, token, val, searchMethod="name" ) => {
    clearTimeout(call);;

    if(val?.length > 3){
        call = setTimeout(()=>{searchHospitals(dispatch, token, val, searchMethod)},1000);
    }
}


const SearchEmployer = ({chooseFunc,searchMode}) => {
    let [showForm,setShowForm] = useState(0);
    let [usstate,setUsstate] = useState("");
    chooseFunc = chooseFunc || saveEmployer;
    
    
    let results = useSelector(state => state.cne?.employerResults) || [];

    let token = useSelector(state => state.user?.token) || "";
    let dispatch = useDispatch();

    const employerChosen = (item) => {
        chooseFunc(item);
    }
    const remEmployer = (item) => {
        removeEmployer(dispatch, token, item);
    }

    let topArea = searchMode === "npi" 
        ? <SearchNPI />
        : <SearchName />;



    return <div className="row">
        <div className="col-12">
            <MessageBoard />
            <div>
                {topArea}
            </div>
          
            <table className="table table-striped table-bordered table-hover" style={{maxHeight:"100%"}}>
                <thead>
                    <tr><td colSpan="8">Search Results</td></tr>
                </thead>
                <tbody style={{overflow:"scroll"}}>
                {results.map((item)=>{
                    return <EmployerRow item={{
                        name:item.name,
                        street:item.street,
                        city:item.city,
                        state:item.state,
                        zip:item.zip,
                        MEDICARE_PROVIDER_NUMBER:item.medicare_provider_number,
                        orguuid:item?.orguuid,
                        npinumber:item?.npinumber
                    }} key={item.medicare_provider_number + '_' + item.orguuid + '_' + item.name} 
                      chooseFunc={employerChosen}
                    showChoose={1}
                    showEdit={false}
                    showRemove={false}
                    />
                })}
                {results?.length === 0 ? <tr><td colSpan="8">No results found</td></tr> : null}
                </tbody>
            </table>
        </div>
    </div>
}

export default SearchEmployer;