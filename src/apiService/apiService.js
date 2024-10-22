import axios from 'axios';
import router from '@/router';
//import AzureStorage from AzureStorage
import azureBlob from '../store/modules/azureBlob';
import { IncomingMessage } from 'http';
require("dotenv").config();

const API_URL = process.env.VUE_APP_API_ROOT;
//** STAGING  const API_URL = 'https://em-staging.azurewebsites.net/';
const blob_uri = process.env.VUE_APP_AZURE_URI;
const blob_sas = process.env.VUE_APP_AZURE_SAS;

const state =
{
  azure_name: "",
  file: ""
}

export default class APIService {
  get(sub_url, headers = {}) {
    let token = localStorage.getItem("token");

    let url = `${API_URL}` + sub_url;
    console.log(url);
    return axios.get(url, {
      headers: {
        ...headers,
        Authorization: "bearer " + token //the token is a variable which holds the token
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          router.push({ name: 'Auth' })
        } else if (e.response.status == 403) {
          router.push({ name: 'Forbidden' })
        }
        throw e;
      });
  }

  post(sub_url, content, headers = {}) {
    let token = localStorage.getItem("token");

    let url = `${API_URL}` + sub_url;
    return axios.post(url, content, {
      headers: {
        ...headers,
        Authorization: "bearer " + token,
      }
    })
      .then(response => {
        // this.posts = response.data
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          if (sub_url.indexOf('admin') > -1) {
            router.push({ name: 'AdminAuth' })
          } else {
            router.push({ name: 'Auth' })
          }
        }
        // } else if (e.response.status == 403) {
        //   router.push({ name: 'Forbidden' })
        // }
        // this.errors.push(e)
        throw e;
      });
  }

  put(sub_url, content, headers = {}) {
    let token = localStorage.getItem("token");

    let url = `${API_URL}` + sub_url;
    return axios.put(url, content, {
      headers: {
        ...headers,
        Authorization: "Bearer " + token,
      }
    })
      .then(response => {
        // this.posts = response.data
        return response.data;
      })
      .catch(e => {
        // this.errors.push(e)
        if (e.response.status == 401) {
          router.push({ name: 'Auth' })
        } else if (e.response.status == 403) {
          router.push({ name: 'Forbidden' })
        }
        throw e;
      });
  }

  patch(sub_url, content, headers = {}) {
    let token = localStorage.getItem("token");

    let url = `${API_URL}` + sub_url;
    return axios.patch(url, content, {
      headers: {
        ...headers,
        Authorization: "bearer " + token,
      }
    })
      .then(response => {
        // this.posts = response.data
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          router.push({ name: 'Auth' })
        } else if (e.response.status == 403) {
          router.push({ name: 'Forbidden' })
        }
        // this.errors.push(e)
        return e;
      });
  }

  delete(sub_url, headers = {}) {
    let token = localStorage.getItem("token");

    let url = `${API_URL}` + sub_url;
    return axios.delete(url, {
      headers: {
        ...headers,
        Authorization: "bearer " + token,
      }
    })
      .then(response => {
        // this.posts = response.data
        return response.data;
      })
      .catch(e => {
        if (e.response.status == 401) {
          router.push({ name: 'Auth' })
        } else if (e.response.status == 403) {
          router.push({ name: 'Forbidden' })
        }
        // this.errors.push(e)
        return e;
      });
  }


  postDownload(sub_url, content, headers = {}) {
    let token = localStorage.getItem("token");

    let url = `${API_URL}` + sub_url;
    console.log('POST download: ' + url);

    return axios.post(
      url,
      content,
      {
        responseType: 'arraybuffer',
        headers: {
          ...headers,
          Authorization: "bearer " + token,
        }
      })
      .then(response => {
        console.log(response);

        let blob = new Blob([response.data], { type: 'application/octet-stream' });
        let openUrl = window.URL.createObjectURL(blob);

        window.open(openUrl);
      })
      .catch(e => {
        if (e.response.status == 401) {
          if (sub_url.indexOf('admin') > -1) {
            router.push({ name: 'AdminAuth' })
          } else {
            router.push({ name: 'Auth' })
          }
        }
        // this.errors.push(e)
        throw e;
      });
  }


  buildRequestQuery(params) {
    if (!params) {
      return "";
    }
    var query = "?";
    for (var key in params) {
      if (!params[key]) {
        query += `${key}=${params[key]}/`;
      }
    }

    if (query.length < 1) {
      return "";
    }

    //remove last '/'
    query = query.slice(query.length - 1, query.length - 1);

    return query;
  }

  async uploadBlob(image) {
    state.file = image.file;

    var blobUri = blob_uri;
    var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, blob_sas).withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());

    if (!blobService) {
      console.log("blobService FAILED to Init");
      return;
    }

    // Make a smaller block size when uploading small blobs
    var blockSize = image.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
    var options = {
      storeBlobContentMD5: false,
      blockSize: blockSize
    };
    blobService.singleBlobPutThresholdInBytes = blockSize;

    var finishedOrError = false;

    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");

    var arr = image.name.split('.');
    state.azure_name = arr[0] + '.' + uuid + '.' + arr[1];

    return new Promise(resolve => {
      blobService.createBlockBlobFromBrowserFile('avatars', state.azure_name, image, options,
        function (error, result, response) {
          finishedOrError = true;
          if (error) {
            console.log("blobService FAILED. ERROR:" + error);
          } else {
            console.log("blobService SUCCESS! ");
            var file_path = blob_uri + '/avatars/' + result.name;
            resolve(file_path);
          }
        });
    })

  }
};
