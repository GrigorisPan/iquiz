import {
  DIGITALCLASS_LIST_REQUEST,
  DIGITALCLASS_LIST_SUCCESS,
  DIGITALCLASS_LIST_FAIL,
} from '../constants/digitalClassConstants';

export const digitalClassReducer = (state = { dClasses: [] }, action) => {
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
