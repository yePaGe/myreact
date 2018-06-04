import React from 'react';
import foodCss from './food.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';

import Top from '../../top/Top';

class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploadCon: false,
            uploadUrl: '',
            localImgList: [],
            nameList: [],
            hotImgList: [],
            imgList: []
        }
    }
    componentWillMount() {
       
    }
    componentDidMount() {
        this.refs.carStyle.changeCarousel(1)
    }
    changeRoute(e) {
        this.props.history.push(e)
    }
    localUpload() {
        this.setState({
            showUploadCon: true,
            conName: '本地上传'
        })
    }
    stockUpload() {
        this.setState({
            showUploadCon: true,
            conName: '图库上传'
        })
    }
    cancelUpload() {

    }
    saveUpload() {
        
    }
    render() {
        return(
            <div className={mainCss.main}>
                <Top changeRoute={this.changeRoute.bind(this)} ref='carStyle'/>
                <div className={mainCss['main-con']}>
                    <div className={foodCss.line}>
                        <div className={foodCss.name}>
                            热推商品：
                        </div>
                        <div className={foodCss.btn}>
                            <ui.Button size='small' type='success' onClick={this.localUpload.bind(this)}>本地上传</ui.Button>
                            <ui.Button size='small' type='warning' onClick={this.stockUpload.bind(this)}>图库上传</ui.Button>
                        </div>
                        {
                            this.state.hotImgList.length == 0
                            ?   <div></div>
                            :   <div className={foodCss['img-list']}>
                                    {
                                        this.hotImgList.map((e) => {
                                            return (
                                                <div className={foodCss.img}>
                                                    <img src={e.url} width='100%' height='100%'/>
                                                    <p>{e.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
                </div>
                <ui.Dialog title={this.state.conName} visible={this.state.showUploadCon} onCancel={this.cancelUpload.bind(this)}>
                    <ui.Dialog.Body>
                        <div className={foodCss.line}>
                            <div className={foodCss.name}>
                                图片名称：
                            </div>
                            <div className={foodCss.text}>
                                <ui.Input size='small'></ui.Input>
                            </div>
                        </div>
                        {
                            this.state.conName == '本地上传'
                            ?   <div>
                                    <ui.Button size='small' type='success'>本地上传</ui.Button>
                                    <input type='file' />
                                </div>
                            :   <div>
                                    <ui.Select>
                                        {
                                            this.state.nameList.map((e) => {
                                                return (
                                                    <ui.Select.Option key={e.id} label={e.name} value={e.id}></ui.Select.Option>
                                                )
                                            })
                                        }
                                    </ui.Select>
                                    {
                                        this.state.imgList.length == 0
                                        ?   <div></div>
                                        :   <div>
                                                
                                            </div>
                                    }
                                </div>
                        }
                        <div className={foodCss.line}>
                            <div className={foodCss.name}>
                                图片URL:
                            </div>
                            <div className={foodCss.text}>
                                <img src={this.state.uploadUrl} width='100%' height='100%'/>
                            </div>
                        </div>
                    </ui.Dialog.Body>
                    <ui.Dialog.Footer>
                        <ui.Button size='small' type='primary' onClick={this.saveUpload.bind(this)}>确定</ui.Button>
                        <ui.Button size='small' onClick={this.cancelUpload.bind(this)}>取消</ui.Button>
                    </ui.Dialog.Footer>
                </ui.Dialog>
            </div>
        )
    }
}

export default Food;
