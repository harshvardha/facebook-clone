const createError = (status, mesasge) => {
    const error = new Error();
    error.message = mesasge;
    error.status = status;
    return error;
}

export default createError;