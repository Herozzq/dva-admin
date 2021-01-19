import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { uploadQiniuUrl } from '../../utils/util'
const uploadImg = uploadQiniuUrl//`${baseURL}/mgt/gov/upload/image`;



const UploadImage = (props) => {
    const { maxSize, maxQuantity, onChange, value, action, dispatch } = props;
    const [fileList, setFileList] = useState(value || []);
    const [visible, setVisible] = useState(false);
    const [previewImgUrl, setPreviewImgUrl] = useState();
    const [token, setToken] = useState();
    const [qiniuDomain, setQiniuDomain] = useState();

    useEffect(() => {
        setFileList(value || []);
    }, [value])

    const handleChange = (changeProcess) => {
        const { file, fileList } = changeProcess;

        if (file.status === "error") {
            const index = getFileIndex(file, fileList);
            fileList.splice(index, 1);

            message.error("上传出错");
        }
        if (file.status === "done") {
            const index = getFileIndex(file, fileList);
            if (index != -1) {
                fileList[index].url = qiniuDomain + file.response.key;
                onChange && onChange(fileList);
            }
        }
        setFileList(fileList);

    }

    const beforeUpload = (file, fileList) => {
        return new Promise( (resolve, reject) => {
            const index = getFileIndex(file, fileList);
            if (index + 1 > maxQuantity) {
                message.destroy();
                message.error(`只能最多显示${maxQuantity}张`);
                reject();
                return
            }
            //自定义图片上传前事件
            if (props.beforeUpload && !props.beforeUpload(file)) {
                reject()
                return
            }
            console.log('图片类型', file.type)
            if (file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/jpeg') {
                message.error(`图片上传不支持该格式文件`);
                reject();
                return
            }

            if (file.size > maxSize * 1024) {
                message.error(`图片大小不能大于${maxSize / 1024}M`);
                const index = fileList.indexOf(file);
                fileList.splice(index, 1);
                setFileList(fileList);
                reject();
                return
            }

             dispatch({
                type: 'CommonModel/getQiniuToken',
                payload: {},
                callback: (res) => {
                    setToken(res.token);
                    setQiniuDomain(res.qiniuDomain);
                    resolve();
                }
            })
            // const {token, qiniuDomain} = await dispatchWithPromise({type: FETCH_QINIU_TOKEN});

        })
    }

    const handelPreview = (file) => {
        setPreviewImgUrl(file.url);
        setVisible(true);
    }


    const getFileIndex = (file, files = fileList) => {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i].uid === file.uid, files[i].uid, file.uid, i)
            if (files[i].uid === file.uid) {
                return i;
            }
        };
        return -1;
    }

    const cancelPreview = () => {
        setVisible(false);
    }
    return (
        <div>
            <Upload
                accept={props.accept}
                listType="picture-card"
                onChange={handleChange}
                beforeUpload={beforeUpload}
                onPreview={handelPreview}
                action={action || uploadImg}
                method="post"
                name="file"
                fileList={fileList}
                disabled={props.disabled}
                data={{
                    token
                }}
            >
                {
                    fileList.length < maxQuantity ? <PlusOutlined /> : null
                }
            </Upload>

            <Modal
                title="预览图片"
                visible={visible}
                width={800}
                onCancel={cancelPreview}
                footer={false}
            >
                <img src={previewImgUrl} style={{ display: 'block', margin: 'auto', width: '100%' }} />
            </Modal>
        </div>
    )
}

UploadImage.defaultProps = {
    maxQuantity: 8,
    multiple: true,
    maxSize: 1024 * 2, //单位 kb
    accept: "image/*"
}


// export default UploadImage;

function mapStateToProps(state) {
    return { ...state.CommonModel };
}
export default connect(mapStateToProps)(UploadImage);