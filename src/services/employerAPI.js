import kimaxios from "/src/containers/kimaxios";
import {apiURL} from "/src/utilities/utilityFunctions";

export const doSearchHospitals = (token, val, searchMethod, state="", callBack, Fail) => {
    kimaxios.get(apiURL() + "/cne_employer/search", 
    {params:{"name":val,"clientCode":"npcc","term":val,"searchMethod":searchMethod,state:state},headers:{"x-Auth-Token":token,"content-type": "multipart/form-data"}}
    ).then((evt)=>callBack(evt)).catch((evt)=>Fail(evt));
}
/*
export const doSearchHospitals = (token, val, method, callBack, Fail) => {
    kimaxios.get(apiURL() + "/DataCMSGov/?name=" + val, 
    {params:{"clientCode":"npcc"},headers:{"x-Auth-Token":token,"content-type": "multipart/form-data"}}
    ).then((evt)=>callBack(evt)).catch((evt)=>Fail(evt));
}
*/

export const doSaveEmployer = ( token, item, callBack, Fail) => {
    kimaxios.post(apiURL() + "/cne_user/pte", item,
    {params:{"clientCode":"npcc"},headers:{"appCode":"wix","x-auth-token":token,"content-type": "multipart/form-data"}}
    ).then((evt)=>callBack(evt)).catch((evt)=>Fail(evt));
}

export const doRemovePersonToEmployer = (token, personuuid, orguuid, callBack, Fail) =>{
    kimaxios.delete(apiURL() + "/cne_user/PTE",
    {params:{"clientCode":"npcc",personuuid:personuuid,employerid:orguuid},headers:{"appCode":"wix","x-auth-token":token,"content-type": "multipart/form-data"}}
    ).then((evt)=>callBack(evt)).catch((evt)=>Fail(evt));
}

export const doSearchEmployers = (token, val, callBack, Fail) => {
    kimaxios.get(apiURL() + "/cne_employer/search?term=" + val, 
    {params:{"clientCode":"npcc"},headers:{"x-Auth-Token":token,"content-type": "multipart/form-data"}}
    ).then((evt)=>callBack(evt)).catch((evt)=>Fail(evt));
}

export const doObtainLicenseAreas = (token, locale, callBack, Fail)=>{
    kimaxios.get(apiURL() + "/cne/lookup/states/?parentCode=" + locale,
    {headers: {
        "x-Auth-Token":token
    }}
    ).then((evt)=>callBack(evt)).catch((evt)=>Fail(evt));
}

export const doSearchbyNPI = (token, val, callBack, Fail) => {
    kimaxios.get(apiURL() + "/cne_employer/search?name=" + val, 
    {params:{"clientCode":"npcc"},headers:{"x-Auth-Token":token,"content-type": "multipart/form-data"}}
    ).then((evt)=>callBack(evt)).catch((evt)=>Fail(evt));
}