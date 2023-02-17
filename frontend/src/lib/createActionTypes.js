const createActionTypes = (type) => {
  return [type, `${type}_SUCCESS`, `${type}_FAILURE`];
};

export default createActionTypes;
