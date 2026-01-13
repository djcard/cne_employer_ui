import { useSelector } from "react-redux";
import EmployerFlexRow from "./EmployerFlexRow";
import useWindowsDimensions from "../../../../baseApplications/nurse/src/components/supporting/UseWindowsDimensions";

const EmployerlistFlex = ({highlight,chooseFunc,remFunc,reload,topText="",showChoose=false,showEdit=true,showRemove=true,allEmployers}) => {
    let profile = useSelector((state)=> state.cne.cneProfile ? state.cne.cneProfile : {});
    //allEmployers = allEmployers || Object.hasOwn(profile,"employers") ? profile.employers : [];
console.dir(allEmployers);
    const chosenEmp = (item) => {
        chooseFunc(item);
    }

    const remEmployer = (item) => {
        remFunc(item);
    }


    return         <div>
    <p>{topText}</p>
    <div class="d-flex p-2 flex-column">
        {allEmployers?.map((item)=>{
                        let check = item.employerid
                            ? item.employerid
                            : item.employeeuuid 
                                ? item.employeeuuid 
                                : "";

                        return <EmployerFlexRow item={{
                            name:item.orgname ? item.orgname : item.name,
                            street:item.street,
                            city:item.city,
                            state:item.state,
                            zip:item.zip,
                            orguuid:item.orguuid,
                            MEDICARE_PROVIDER_NUMBER:"",
                            npinumber:item.npinumber,
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


    </div>

    


    </div>
}

export default EmployerlistFlex;

/*
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm">
                <thead>
                    <tr><td colSpan="8"><h5>Current and Former Employers</h5></td></tr>
                </thead>
                <tbody>
                    {allEmployers?.map((item)=>{
                        let check = item.employerid
                            ? item.employerid
                            : item.employeeuuid 
                                ? item.employeeuuid 
                                : "";

                        return <EmployerRow item={{
                            name:item.orgname,
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
*/