import React,{ Component } from 'react';
import { Upload, Icon, Modal } from 'antd';


class UploadImage extends Component{
    constructor(props){
        super(...props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
          };
          this.handleCancel = this.handleCancel.bind(this);
          this.handlePreview = this.handlePreview.bind(this);
          this.handleChange = this.handleChange.bind(this);
    }

    
    handleCancel(){
          this.setState({ previewVisible: false })
        }
    
    handlePreview(file) {//预览图片
        this.setState({
          previewImage: file.response.thumbUrl,
          previewVisible: true,//true为放大图片效果，false无效果
        });
      };
    
      handleChange({ fileList }){//当上传图片后触发
          this.setState({ fileList },()=>{
            this.props.getFileList(fileList.map(fileUrl=>{//上传几张图片获得几张图片地址
              if(fileUrl.response){
                return fileUrl.response.url
              }
            }).join(','))//将获得的数组以逗号隔开转化成字符串
          })
        };
    
      render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const { max,action } = this.props;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">上传</div>
          </div>
        );
        return (
          <div className="clearfix">
            <Upload
              action={action}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              withCredentials={true}
            >
              {fileList.length >= max ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="图片走丢了..." style={{ width: '96%' }} src={previewImage} />
            </Modal>
          </div>
        );
      }
}

export default UploadImage;