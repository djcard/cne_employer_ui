import { useState } from "react";
import { saveEmployer, searchHospitals } from "../containers/employerMethods";
import EmployerListTable from "./EmployerListTable";
import EmployerListFlex from "./EmployerListFlex";
import {useSelector, useDispatch} from "react-redux";
import MessageBoard from "/src/components/supporting/MessageBoard";
import SearchNPI from "./SearchNPI";
import SearchName from "./SearchName";
import useWindowsDimensions from "/src/components/supporting/UseWindowsDimensions";
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
    
    const { height,width } = useWindowsDimensions();
    const mdBreakpoint = getComputedStyle(document.body).getPropertyValue('--bs-breakpoint-lg');
    
    let results = useSelector(state => state.cne?.employerResults) || [];
    let token = useSelector(state => state.user?.token) || "";
    let dispatch = useDispatch();

    const employerChosen = (item) => {
        chooseFunc(item);
    }

    let topArea = searchMode === "npi" 
        ? <SearchNPI />
        : <SearchName />;

        let empList = width > parseInt(mdBreakpoint) 
        ?  <EmployerListTable chooseFunc={employerChosen} showChoose={1} showEdit={false} showRemove={false} allEmployers={results} topText={"Current and Past Employers"} />
        : <EmployerListFlex chooseFunc={employerChosen} showChoose={1} showEdit={false} showRemove={false} allEmployers={results} topText={"Current and Former Employers"}/>



    return <div className="row">
        <div className="col-12">
            <MessageBoard />
            <div>
                {topArea}
            </div>
            <div>
                {empList}
            </div>
            <div>

            </div>
        </div>
    </div>
}

export default SearchEmployer;