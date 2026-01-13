import store from "/src/store";
import {useEffect} from "react";
import SearchEmployer from "./SearchEmployer.jsx";
import EmployerForm from "./EmployerForm.jsx";
import { obtainLicenseAreas } from "../containers/employerMethods.js";
import {useSelector, useDispatch} from "react-redux";

const EmployerWatcher = () => {
    let user = useSelector((state)=> state.user || {});
    let dispatch = useDispatch();

    useEffect(()=>{
        if(!store.components.searchEmployer){
            store.components.searchEmployer=SearchEmployer;
        }
        if(!store.components.employerForm){
            store.components.employerForm=EmployerForm;
        }

        obtainLicenseAreas(store.dispatch, user.token);
    },[])
    return <div style={{display:"none"}}>Employer Watcher Component</div>;
    }

    export default EmployerWatcher;