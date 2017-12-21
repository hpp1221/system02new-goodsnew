<template>
  <div class="container">
    <div class="wrapper">
      <el-upload
        action="http://upload.qiniu.com/"
        :http-request="upload"
        :before-upload="beforeUpload"
        multiple
        drag
        style="width: 300px;">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div @click="showExplain" class="explain-switch-div">
        <p>如何创建图片压缩包<i class="el-icon-arrow-up" v-if="!explainVisible"></i><i class="el-icon-arrow-down" v-else></i></p>
      </div>
      <div v-if="explainVisible" class="explain-div">
        <p>注意事项：</p>
        <p>1、本次上传图片的商品，如商品已有图片，则已有图片将全部清除，以本次上传的图片为准。</p>
        <p>2、商品图片分主图（商品列表中显示、商品详情第一张图片）、图册（仅在商品详情中展示），主图文件名需以商品编码命名。</p>
        <p>3、每个商品最多支持20张图片，图片格式仅支持JPG，JPEG，BMP，PNG，GIF格式。</p>
        <p>4、每个商品以ZIP格式压缩文件上传图片，压缩文件以商品编码命名。例如商品编码为IRC-001，则对应图片压缩文件名应为：IRC-001.zip。</p>
        <p>5、如上传图片未设置主图，系统将自动指定（后续可手工修改）。</p>
        <p>6、单一商品图片如果超过20张，超过部分系统会自动清除。</p>
        <p>7、单张图片不得大于20M，大于20M上传后，不会显示该图片。</p>
        <p>8、支持一次性上传多个图片压缩文件，并且每个压缩文件大小不能超过200M。</p>
      </div>

    </div>
  </div>
</template>

<script>
  var JSZip = require('jszip');
  var Base64 = require('js-base64').Base64;
  export default {
    data() {
      return {
        files: [],
        explainVisible: false,
        file_obj: {},
        key: {
          token: '',
          file: ''
        },
        successFiles: [],
        fileNum: 0,
        successNum: 0
      }
    },
    created() {
      //this.getBaseData();
      this.getImgAccess();
    },
    methods: {
      upload() {
//				let url = 'http://upload.qiniu.com/';
//				let formData = new FormData();
//				formData.append('token',this.key.token);
//				formData.append('file',this.files);
//				let self = this;
//				let config = {
//					headers: {
//                      'Content-Type': 'application/x-www-form-urlencoded'
//                  }
//				}
//				self.$http.post(url,formData,config).then(function (response) {
//				    console.log(response)
//			    }).catch(function (error) {
//			    	console.log(error);
//			    });
      },

      beforeUpload(file) {
        let self = this;
        self.fileNum = 0;
        self.successNum = 0;
        var Zip = new JSZip();
        let url = 'http://upload.qiniu.com/';
        let config = {
          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type':'multipart/form-data'
          }
          ,
        };
        var promise = new Promise(function (resolve, reject) {
          Zip.loadAsync(file).then(function (zip) {
            for (let z in zip.files) {
              if ((zip.files[z].name.split('/')).length - 1 !== 1) {
                reject('压缩包不符合格式')
              }
              if (!zip.files[z].dir) {
                self.fileNum++;
              }
            }
            resolve(zip)
          });
        });
        promise.then(function (zip) {
          for (let z in zip.files) {
            if (!zip.files[z].dir) {
              Zip.file(zip.files[z].name).async("base64").then(function (result) {
                console.log('result', result)
                let uploadFile = 'data:image/' + zip.files[z].name.substring(zip.files[z].name.length - 3, zip.files[z].name.length) + ';base64,' + result;
                uploadFile = Base64.decode(uploadFile);
                let formData = new FormData();
                formData.append('token', self.key.token);
                formData.append('file', uploadFile);
//                formData.append('file', Base64.decode(uploadFile));
//                console.log(Base64.decode(uploadFile))
                self.$http.post(url, formData, config).then(function (response) {
                  console.log('response', response)
                  self.uploadSuccess(self.imgDomain + response.data.key, zip.files[z].name);
                  console.log('imgggg', response.data.key)
                }).catch(function (error) {
                  console.log(error);
                });
              })

            }

          }
        }, function (value) {
          alert(value);
        });
        return promise;
      },
      uploadSuccess(url, fileName) {
        console.log('url', url);
        console.log('fileName', fileName)
        this.successFiles.push({fileName: fileName, url: url});
        this.successNum++;
        console.log('successnum', this.successNum)
        if (this.successNum === this.fileNum) {
          let self = this;
          let requestData = {
            picList: JSON.stringify(self.successFiles),
            companyId: 1
          };
          self.httpApi.goods.importPicture(requestData, function (data) {
          });
        }
      },
      getImgAccess() {
        let self = this;
        let requestData = {
          bucketName: 'sass'
        };
        self.httpApi.aliyun.imgSignature(requestData, function (data) {
          self.key.token = data.data;
        });
      },
      removeFile() {

      },
      showExplain() {
        this.explainVisible = !this.explainVisible;
      }
    }
  }
</script>
