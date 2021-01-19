import React,{useState, useEffect} from 'react';
import { getUrl } from '../../utils/util';
import {message, Upload, Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

const uploadUrl = getUrl()+`/shopkeeperMember/upload`;


const UploadFile = (props)=>{
    const { maxQuantity, maxSize, onChange, value, action, fileType } = props;
    const [fileList, setFileList] = useState(value || []);

    const handleChange = (changeProcess) => {
        const { file, fileList } = changeProcess;

        if (file.status === "error") {
            const index = getFileIndex(file);
            fileList.splice(index, 1);

            message.error("上传出错");
        }

        if (file.status === "done" && file.response.code==1 ) {
            const index = getFileIndex(file);
            index != -1 && (fileList[index].url = file.response.data ? file.response.data : file.name);
            props.uploaded && props.uploaded(file, fileList);
        }

        if(file.status === "done" && file.response.code!=1 ){
            const index = getFileIndex(file);
            fileList.splice(index, 1);
            message.error(file.response.message);
        }
        setFileList(fileList);

        onChange && onChange(fileList);
    }

    const beforeUpload = (file, fileList) => {
        return new Promise((resolve, reject) => {
            const index = getFileIndex(file, fileList);
            const type = file.type;
            if(type && fileType && !fileType.includes(type)){
                message.error(`文件类型错误，只能上传${fileType}格式的文件`);
                reject();
            }

            if (index + 1 > maxQuantity) {
                message.destroy();
                message.error(`只能最多上传${maxQuantity}份文件`);
                reject();
            }

            if (file.size > maxSize * 1024) {
                message.error(`文件大小不能大于${maxSize}kb`);
                const index = fileList.indexOf(file);
                fileList.splice(index, 1);
                setFileList(fileList);
                reject();
            }

            resolve()
        })
    }

    const getFileIndex = (file, files = fileList) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].uid === file.uid) {
                return i;
            }
        };

        return -1;
    }

    return <Upload
        action={uploadUrl}
        fileList={fileList}
        name="excelFile"
        data={{
            ...props.data
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        <Button>
            <UploadOutlined /> 点击上传
        </Button>
    </Upload>
}

UploadFile.defaultProps = {
    maxQuantity: 1,
    multiple: true,
    maxSize: 1024 * 5, //单位 kb
}


export default UploadFile