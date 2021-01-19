
export function getUrl() {
    let location = window.location
    let hostname = location.hostname

    if (hostname === 'localhost') {
        return '测试地址'
    } else if (hostname === 'xxx') {
        return '测试地址'
    } else {
        return '正式地址'
    }
}

export const phoneExp = /^1[3456789]\d{9}$/;
export const emailExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const passwordExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export function downloadExecl(res) {
    const blob = new Blob([res], { type: "application/vnd.ms-excel" }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
    const downloadElement = document.createElement("a");
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = "客户档案列表.xlsx"; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
}


export const uploadQiniuUrl = 'https://upload.qiniup.com/';