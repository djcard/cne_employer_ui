import { doObtainLicenseAreas, doRemovePersonToEmployer, doSaveEmployer, doSearchbyNPI, doSearchEmployers, doSearchHospitals } from "../services/employerAPI";
import {showSpinner, hideSpinner} from "/src/utilities/utilityFunctions";
import { updateCNE } from "/src/slices/cneSlice";
import { updateAppSettings } from "/src/slices/foundationSlice";

export const searchHospitals = (dispatch, token, val, searchMethod, state="") => {
    showSpinner(dispatch);
    doSearchHospitals(token, val, searchMethod, state,
        (evt)=>processSearchHospitals(dispatch,  evt),
        (evt)=>failSearchHospitals(dispatch,  evt)
    )
}

const processSearchHospitals = (dispatch, evt) => {
    hideSpinner(dispatch);
    dispatch(updateCNE({employerResults:evt.data.data}));
}

const failSearchHospitals = (dispatch, evt) => {
    hideSpinner(dispatch);
    console.dir(evt)
}

export const saveEmployer = (dispatch, token, item, personuuid) => {
    
    showSpinner(dispatch);
    doSaveEmployer(token, item,
        (evt)=>processSaveEmployer(dispatch, evt, token, item.personuuid),
        (evt)=>failSaveEmployer(dispatch,  evt));
}

const processSaveEmployer = (dispatch, evt, token, personuuid) => {
    hideSpinner(dispatch);
    dispatch(updateCNE({profileUpdated:new Date().toTimeString()}));
    dispatch(updateAppSettings({message:"Employer Saved!"}));
}

const failSaveEmployer = (dispatch, evt) => {
    hideSpinner(dispatch);
    dispatch(updateAppSettings({message:"Problem saving Employer!"}));
}

export const removePersonToEmployer = (dispatch, token, orguuid,personuuid) => {
    showSpinner(dispatch);
    doRemovePersonToEmployer(token, personuuid,orguuid,
        (evt)=>processRemovePersonToEmployer(dispatch, evt, token, personuuid),
        (evt)=>failRemovePersonToEmployer(dispatch, evt)
    );
}

const processRemovePersonToEmployer = (dispatch, evt, token, personuuid) => {
    hideSpinner(dispatch);
    dispatch(updateCNE({profileUpdated:new Date().toTimeString()}));
    //obtainProfile(dispatch, token, personuuid);
}

const failRemovePersonToEmployer = (dispatch, evt) => {
    hideSpinner(dispatch);
    console.dir(evt);
}

export const searchEmployers = (dispatch, token, val) => {
    showSpinner(dispatch);
    doSearchEmployers(token, val,
        (evt)=>processSearchHospitals(dispatch,  evt),
        (evt)=>failSearchHospitals(dispatch,  evt)
    )
}

const processSearchEmployers = (dispatch, evt) => {
    hideSpinner(dispatch);
    dispatch(updateCNE({employerResults:evt.data.data}));
}

const failSearchEmployers = (dispatch, evt) => {
    hideSpinner(dispatch);
    console.dir(evt)
}

export const obtainLicenseAreas = (dispatch, token) => {
    showSpinner(dispatch);
    doObtainLicenseAreas(token, "us",processLicenseAreas,failLicenseAreas)
}

const processLicenseAreas = (dispatch, evt) => {
    hideSpinner(dispatch);
    dispatch(updateCNE({allLicenseAreas:evt.data.data}));
}

const failLicenseAreas = (evt) => {
    hideSpinner();
    console.dir(evt);
}


