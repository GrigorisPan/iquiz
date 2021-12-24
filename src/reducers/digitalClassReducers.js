import {
  DIGITALCLASS_LIST_REQUEST,
  DIGITALCLASS_LIST_SUCCESS,
  DIGITALCLASS_LIST_FAIL,
  DIGITALCLASS_REQUEST,
  DIGITALCLASS_SUCCESS,
  DIGITALCLASS_FAIL,
  DIGITALCLASS_RESET,
  DIGITALCLASS_CREATE_RESET,
  DIGITALCLASS_CREATE_FAIL,
  DIGITALCLASS_CREATE_SUCCESS,
  DIGITALCLASS_CREATE_REQUEST,
} from '../constants/digitalClassConstants';

export const digitalClassListReducer = (state = { dClasses: [] }, action) => {
  switch (action.type) {
    case DIGITALCLASS_LIST_REQUEST:
      return { loading: true, dClasses: [] };
    case DIGITALCLASS_LIST_SUCCESS:
      return { loading: false, dClasses: action.payload };
    case DIGITALCLASS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const digitalClassReducer = (state = { dClass: [] }, action) => {
  switch (action.type) {
    case DIGITALCLASS_REQUEST:
      return { loading: true, dClass: [] };
    case DIGITALCLASS_SUCCESS:
      return { loading: false, dClass: action.payload };
    case DIGITALCLASS_FAIL:
      return { loading: false, error: action.payload, dClass: [] };
    case DIGITALCLASS_RESET:
      return { dClass: [] };
    default:
      return state;
  }
};

export const digitalClassCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DIGITALCLASS_CREATE_REQUEST:
      return { loading: true };
    case DIGITALCLASS_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        newDigitalClass: action.payload,
      };
    case DIGITALCLASS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DIGITALCLASS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
