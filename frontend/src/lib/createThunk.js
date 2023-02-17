const createThunk = (type, api, payload) => async (dispatch, getState) => {
  try {
    const response = await api(payload);

    dispatch({
      type: `${type}_SUCCESS`,
      payload: response.data,
      meta: response,
    });
  } catch (e) {
    dispatch({ type: `${type}_FAILURE`, payload: e });
  }
};

export default createThunk;
