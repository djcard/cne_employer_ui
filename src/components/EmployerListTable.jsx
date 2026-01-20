import { useSelector } from "react-redux";
import EmployerRow from "./EmployerRow";

const Employerlist = ({highlight,chooseFunc,remFunc,reload,topText="",showChoose=false,showEdit=true,showRemove=true,allEmployers}) => {
    let profile = useSelector((state)=> state.cne.cneProfile ? state.cne.cneProfile : {});
    //allEmployers = allEmployers || Object.hasOwn(profile,"employers") ? profile.employers : [];

    const chosenEmp = (item) => {
        chooseFunc(item);
    }

    const remEmployer = (item) => {
        remFunc(item);
    }

    return         <div>
    <p>{topText}</p>
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm">
                <tbody>
                    {allEmployers?.map((item)=>{
                        let check = item.employerid
                            ? item.employerid
                            : item.employeeuuid 
                                ? item.employeeuuid 
                                : "";

                        return <EmployerRow item={{
                            name:item.orgname ? item.orgname : item.name,
                            street:item.street,
                            city:item.city,
                            state:item.state,
                            zip:item.zip,
                            orguuid:item.orguuid,
                            MEDICARE_PROVIDER_NUMBER:"",
                        }} key={item.personToEmployerId} 
                        chooseFunc={chosenEmp}
                        highlight={(check.length && highlight===check) ? 1 : 0}
                        remEmployer={remFunc ? remEmployer : null}
                        personuuid={profile.personuuid}
                        reload={reload}
                        showChoose={showChoose}
                        showEdit={showEdit}
                        showRemove={showRemove}
                        />
                    })}
                </tbody>
            </table>
        </div>
    </div>
}

export default Employerlist;