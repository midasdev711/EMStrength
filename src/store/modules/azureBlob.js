const blob_uri = 'https://ctmdevblobstore.blob.core.windows.net';
const blob_sas = '?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2021-12-31T11:55:12Z&st=2019-10-26T03:55:12Z&spr=https,http&sig=LYa8MJsyVDcfba4dX1fJyEQMThjXH028GFTjsl3fmIU%3D'; 
////process.env.VUE_APP_AZURE_SAS; 

//BlobEndpoint=https://ctmdevblobstore.blob.core.windows.net/;TableEndpoint=https://ctmdevblobstore.table.core.windows.net/;SharedAccessSignature=sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2021-12-31T11:55:12Z&st=2019-10-26T03:55:12Z&spr=https,http&sig=LYa8MJsyVDcfba4dX1fJyEQMThjXH028GFTjsl3fmIU%3D
//?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2021-12-31T11:55:12Z&st=2019-10-26T03:55:12Z&spr=https,http&sig=LYa8MJsyVDcfba4dX1fJyEQMThjXH028GFTjsl3fmIU%3D
//https://ctmdevblobstore.blob.core.windows.net/?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2021-12-31T11:55:12Z&st=2019-10-26T03:55:12Z&spr=https,http&sig=LYa8MJsyVDcfba4dX1fJyEQMThjXH028GFTjsl3fmIU%3D


const state = {
    error: null,
    azure_name: "",
  };

const actions = {
    uploadImage: ({commit}, image) => {
        console.log("upload_image_request");
        commit("upload_image_request");

        let file = image.file;

        var blobUri = blob_uri;
        var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, blob_sas).withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());

        if (!blobService)
        {
            console.log("blobService FAILED to Init");
            return;
        }

        // Make a smaller block size when uploading small blobs
        var blockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
        var options = {
            storeBlobContentMD5: false,
            blockSize: blockSize
        };
        blobService.singleBlobPutThresholdInBytes = blockSize;

        var finishedOrError = false;
        console.log("Composing name");
            
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        console.log("Composing Join");
    
        var uuid = s.join("");

        var arr = file.name.split('.');
        state.azure_name = arr[0] + '.' + uuid + '.' + arr[1];
        console.log("Creating file");
    
        var speedSummary = blobService.createBlockBlobFromBrowserFile('avatars', state.azure_name, file, options, function (error, result, response) {
            finishedOrError = true;
            if (error) {
                console.log("blobService FAILED. ERROR:" + error);
            
                commit("upload_image_failure");
            } else {
                console.log("blobService SUCCESS! "+file );
            
                commit("upload_image_success", file);
                resolve(state.azure_name);
            }
        });
    }
  };

  // mutations
const mutations = {
    upload_image_request(state) {
      state.status = "upload_image_request";
    },
    
    upload_image_success(state, file) {
      state.status = "upload_image_success";
      state.image = file;
    },
    upload_image_failure(state) {
      state.status = "upload_image_failure";
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
  };