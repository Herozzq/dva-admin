import React, { Component, ComponentProps } from 'react';
import ReactUEditor from 'ifanrx-react-ueditor';
import { Modal, message, Form, Input } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import UploadImage from '../UploadImage/index';
import MediaUpload, { MediaType } from '../MediaUpload/index';
import {CloseCircleOutlined, CheckCircleOutlined} from '@ant-design/icons'

const FormItem = Form.Item;

const toolbars = [
    [
        //'anchor', //锚点
        'undo', //撤销
        'redo', //重做
        'bold', //加粗
        'indent', //首行缩进
        'snapscreen', //截图
        'italic', //斜体
        'underline', //下划线
        'strikethrough', //删除线
        //'subscript', //下标
        //'fontborder', //字符边框
        //'superscript', //上标
        'formatmatch', //格式刷
        //'source', //源代码
        //'blockquote', //引用
        'pasteplain', //纯文本粘贴模式
        'selectall', //全选
        'print', //打印
        //'preview', //预览
        'horizontal', //分隔线
        'removeformat', //清除格式
        //'time', //时间
        //'date', //日期
        //'unlink', //取消链接
        'insertrow', //前插入行
        'insertcol', //前插入列
        'mergeright', //右合并单元格
        'mergedown', //下合并单元格
        'deleterow', //删除行
        'deletecol', //删除列
        'splittorows', //拆分成行
        'splittocols', //拆分成列
        'splittocells', //完全拆分单元格
        'deletecaption', //删除表格标题
        'inserttitle', //插入标题
        'mergecells', //合并多个单元格
        'deletetable', //删除表格
        'cleardoc', //清空文档
        //'insertparagraphbeforetable', //"表格前插入行"
        //'insertcode', //代码语言
        'fontfamily', //字体
        'fontsize', //字号
        'paragraph', //段落格式
        //'simpleupload', //单图上传
        //'insertimage', //多图上传
        //'edittable', //表格属性
        //'edittd', //单元格属性
        //'link', //超链接
        //'emotion', //表情
        //'spechars', //特殊字符
        //'searchreplace', //查询替换
        //'map', //Baidu地图
        //'gmap', //Google地图
        //'insertvideo', //视频
        //'help', //帮助
        'justifyleft', //居左对齐
        'justifyright', //居右对齐
        'justifycenter', //居中对齐
        'justifyjustify', //两端对齐
        'forecolor', //字体颜色
        'backcolor', //背景色
        'insertorderedlist', //有序列表
        'insertunorderedlist', //无序列表
        'fullscreen', //全屏
        'directionalityltr', //从左向右输入
        'directionalityrtl', //从右向左输入
        //'rowspacingtop', //段前距
        //'rowspacingbottom', //段后距
        //'pagebreak', //分页
        //'insertframe', //插入Iframe
        'imagenone', //默认
        'imageleft', //左浮动
        'imageright', //右浮动
        //'attachment', //附件
        'imagecenter', //居中
        //'wordimage', //图片转存
        'lineheight', //行间距
        //'edittip ', //编辑提示
        //'customstyle', //自定义标题
        //'autotypeset', //自动排版
        //'webapp', //百度应用
        //'touppercase', //字母大写
        //'tolowercase', //字母小写
        //'background', //背景
        //'template', //模板
        //'scrawl', //涂鸦
        //'music', //音乐
        'inserttable', //插入表格
        //'drafts', // 从草稿箱加载
        //'charts', // 图表
    ]
]




class UEdit extends Component{

    state = {
        defaultValue: ""
    }

    uploadImagePlugin = (ueditor) => {
        return {
            menuText: '图片上传',
            cssRules: 'background-position: -726px -77px;',
            render: (visible, closeModal) => {

                const handleSelectImage = (urls) => {
                    ueditor.focus();

                    urls.forEach((item) => {
                        ueditor.execCommand('inserthtml', `<img class="zjy_ueditor_img" src="${item.url}" />`)
                    });

                    closeModal();
                }


                return (
                    <UploadImgModal
                        visible={visible}
                        onCancel={closeModal}
                        onOk={handleSelectImage}
                    />
                )
            }
        }
    }

    uploadVideoPlugin = (ueditor) => {
        return {
            menuText: '视频上传',
            cssRules: 'background-position: -320px -20px',
            render: (visible, closeModal) => {

                const handleSelectImage = (values) => {
                    ueditor.focus()
                    console.log("values", values)
                    ueditor.execCommand('inserthtml', `<video src="${values[0].url}" controls="controls" stye="max-width: 100%"></video>`)

                    closeModal()
                }


                return (
                    <UploadMediaModal
                        title='上传视频'
                        fileType={['video/mp4', 'video/avi']}
                        visible={visible}
                        onCancel={closeModal}
                        onOk={handleSelectImage}
                    />
                )
            }
        }
    }

    uploadAudioPlugin = (ueditor) => {
        return {
            menuText: '音频上传',
            cssRules: 'background-position: -20px -40px',
            render: (visible, closeModal) => {

                const handleSelectImage = (values) => {
                    ueditor.focus()
                    console.log("values", values)
                    ueditor.execCommand('inserthtml', `<audio src="${values[0].url}" controls="controls" stye="max-width: 100%"></video>`)

                    closeModal()
                }


                return (
                    <UploadMediaModal
                        title='上传音频'
                        fileType={['audio/mpeg']}
                        visible={visible}
                        onCancel={closeModal}
                        onOk={handleSelectImage}
                    />
                )
            }
        }
    }

    insertLinkPlugin=(ueditor)=>{
        return {
            menuText: '插入超链接',
            cssRules: 'background-position: -500px 0px',
            render: (visible, closeModal) => {

                const getLink = (values) => {
                    ueditor.focus()
                    const {txt, link}= values;
                    ueditor.execCommand('inserthtml', `<a href="${link}">${txt}</a>`)

                    closeModal()
                }


                return (
                    <InsertLinkModal
                        visible={visible}
                        onCancel={closeModal}
                        onOk={getLink}
                    />
                )
            }
        }
    }

    // editor: any
    
    getUEditor = (ref) => {
        this.editor = ref;
    }

    ready = () => {
        this.props.disabled && this.editor.setDisabled();
    }

    triggerChange = (value) => {
        this.props.onChange && this.props.onChange(value);
    }

    isInit = true

    change = (val) => {
        this.triggerChange(val)
        this.isInit = false;
    }
    
    static getDerivedStateFromProps(nextProps, preState) {
        if(!preState.defaultValue && nextProps.value){
            return {
                defaultValue: nextProps.value
            }
        }
        return null;
    }

    render() {
        return <div>

            <ReactUEditor
                getRef={this.getUEditor}
                ueditorPath={'https://saas-transfer-oss.oss-cn-hangzhou.aliyuncs.com/house/vendor/ueditor'}
                plugins={[
                    this.uploadImagePlugin,
                    this.uploadVideoPlugin,
                    this.uploadAudioPlugin,
                    this.insertLinkPlugin
                ]}
                config={{
                    toolbars,
                    theme:'default',
                    initialFrameHeight: 500,
                    autoHeightEnabled: false
                }}
                onReady={this.ready}
                onChange={this.change}
                value={this.state.defaultValue}
            />

        </div>
    }
}

export default UEdit;




class UploadImgModal extends Component {

    state={
        imgs:[]
    }

    onOk = () => {
        const { imgs=[] } = this.state;
        if(!imgs || !imgs.length) return message.error("请选择你要插入的图片")
        this.props.onOk && this.props.onOk(imgs.filter((img)=>!!img.check));
    }

    // form:any

    delete=(index)=>{
        return ()=>{
            Modal.confirm({
                title:'温馨提示',
                content:'您确定要删除?',
                onOk:()=>{
                    this.state.imgs.splice(index, 1);
                    this.setState({
                        imgs: this.state.imgs
                    })
                }
            })
        }
    }

    check=(index)=>{
        return ()=>{
            const item = this.state.imgs[index];
            const check = !!item.check;
            item.check = check ? 0 : 1; 
            
            this.setState({
                imgs: this.state.imgs
            })
        }
    }

    uploadChange=(values)=>{
        this.setState({
            imgs: this.state.imgs.concat(values)
        }, ()=>{
            this.form.setFieldsValue({
                images: []
            })
        })
    }


    render() {
        return <Modal
            title="上传图片"
            {...this.props}
            onOk={this.onOk}
        >
            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', marginBottom: 20}}>
                {
                    this.state.imgs.map((item, i)=>{
                        return (
                            <div key={item.url} style={{position: 'relative', backgroundColor: '#eaeaea',  marginRight: 20, marginTop: 20}}>
                                <CheckCircleOutlined type="check-circle" onClick={this.check(i)}  style={{position: 'absolute', fontWeight: 600, top: -5, right: -5, cursor: 'pointer', color: item.check==1 ?  'green' : 'grey', fontSize: 25}}/>
                                <CloseCircleOutlined type="close-circle" onClick={this.delete(i)}  style={{position: 'absolute', bottom: -5, right: -5, cursor: 'pointer', color: '#000', fontSize: 18}}/>
                                <img src={item.url} style={{width: 80, height: 80, objectFit: 'cover'}}/>
                            </div>
                        )
                    })
                }
            </div>
            <Form
                layout="horizontal"
                ref={ref => this.form = ref}
            >
                <FormItem
                    label="上传当前要插入的图片"
                    name="images"
                    // rules={[{ required: true, message: '图片必传' }]}
                >
                    <UploadImage maxSize={10 * 1024} maxQuantity={1} onChange={this.uploadChange} />
                </FormItem>

            </Form>
        </Modal>
    }
}




class UploadMediaModal extends Component{

    onOk = () => {
        this.form.validateFields().then((values) => {
            const { video } = values;
            this.props.onOk && this.props.onOk(video || []);
        });

    }

    // form: any

    render() {
        return <Modal
            {...this.props}
            onOk={this.onOk}
        >
            <Form
                layout="horizontal"
                ref={ref => this.form = ref}
            >
                <FormItem
                    label="上传资源"
                    name="video"
                    rules={[{ required: true, message: '资源文件必传' }]}
                >
                    <MediaUpload fileType={this.props.fileType} maxQuantity={1} />
                </FormItem>

            </Form>
        </Modal>
    }
}


class InsertLinkModal extends Component{

    onOk = () => {
        this.form.validateFields().then((values) => {
            this.props.onOk && this.props.onOk(values);
        });
    }

    // form: any

    render() {
        return <Modal
            title="插入超链接"
            {...this.props}
            onOk={this.onOk}
            destroyOnClose={true}
        >
            <Form
                layout="horizontal"
                ref={ref => this.form = ref}
            >
                <FormItem
                    label="文字"
                    name="txt"
                    rules={[{ required: true, whitespace: true, message: '请输入文字' }]}
                >
                    <Input placeholder="请输入文字"/>
                </FormItem>

                <FormItem
                    label="链接"
                    name="link"
                    help="http://或https://打头"
                    rules={[{ required: true, whitespace: true, message: '请输入链接' }]}
                >
                    <Input placeholder="请输入链接"/>
                </FormItem>

            </Form>
        </Modal>
    }
}