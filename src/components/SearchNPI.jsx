import {useSelector, useDispatch} from "react-redux";


var call = {};

const SearchNPI = () => {
    let token = useSelector(state => state.user?.token) || "";
    let dispatch = useDispatch();

    const searchEmployer = ( dispatch, token, val, searchMethod="name" ) => {
        clearTimeout(call);;
    
        if(val?.length > 3){
            call = setTimeout(()=>{searchHospitals(dispatch, token, val, searchMethod)},1000);
        }
    }


    return <div>
        <h5>NPI Number:</h5> 
        <div className="row mb-3">
            <div className="col-12">
                <input type="number" className="form-control" placeholder="Search by NPI Number" onChange={(evt)=>{searchEmployer(dispatch, token, evt.currentTarget.value, "npi")}} />
            </div>
        </div>
    
    </div> 
}

export default SearchNPI;