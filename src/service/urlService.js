function getParamsFromUrl(params) {
  if(params instanceof Object) {
    const urlParams = new URLSearchParams({...params});
    return urlParams.toString();
  }
}

export default {getParamsFromUrl};