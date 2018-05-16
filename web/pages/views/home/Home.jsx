import React from 'react';
import homeCss from './home.scss';
import mainCss from '../../../assets/css/main.scss';

import { Link, History } from 'react-router-dom';
import 'element-theme-default';
import Top from '../../top/Top';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topImgsList1: [
                // {
                //     des:"尝遍世界美食",
                //     id:"f278a0a5bac988c935f3ce6b45ea938e",
                //     name:"美食",
                //     url:"http://myreactfile.oss-cn-beijing.aliyuncs.com/img/food.jpg"
                // },
                // {
                //     des:"寻求最舒适住宿",
                //     id:"ed5c2a51711633443b8801e72dcc1e1c",
                //     name:"住宿",
                //     url:"http://myreactfile.oss-cn-beijing.aliyuncs.com/img/hotel.jpg"
                // },
                // {
                //     des:"推荐最震撼电影",
                //     id:"26b81261f827ae3a3a629c0d964084dd",
                //     name:"电影",
                //     url:"http://myreactfile.oss-cn-beijing.aliyuncs.com/img/movie.jpg"
                // },
                // {
                //     des:"踏遍世界各地",
                //     id:"7af001af966c1cf83aa60134f6256efa",
                //     name:"旅游",
                //     url:"http://myreactfile.oss-cn-beijing.aliyuncs.com/img/travel.jpg"
                // }
            ],
            topImgsList2: [],
            curNavTitle: ''   
        }
    }
    componentDidMount() {
        this._isMounted = true
        console.log('1', this._isMounted)
        this.getImgs()
        this.refs.carStyle.changeCarousel(2)
    }
    componentWillUnmount() {
        this._isMounted = false
        console.log('3', this._isMounted)
    }
    getImgs() {
        React.axios('/server/imgs/itemList', {
            params: {
                id: '5af010cd460e2e27b00bbca7'
            }
        }).then((res) => {
            let list = res.data.list
            console.log('2', this._isMounted)
            if(this._isMounted) {
                this.setState({
                    topImgsList1: [list[0], list[1]],
                    topImgsList2: [list[2], list[3]]
                })
            }
        })
    }
    carouselChange(e) {
        this.setState({
            curNavTitle: this.state.topImgsList[e].name + ' - ' + this.state.topImgsList[e].des
        })
    }
    navDetail(e) {
        let url = ''
        switch(e) {
            case '26b81261f827ae3a3a629c0d964084dd':
                url = '/movie';
                break;
            case 'f278a0a5bac988c935f3ce6b45ea938e':
                url = '/food';
                break;
            case 'ed5c2a51711633443b8801e72dcc1e1c':
                url = '/hotel';
                break;
            case '7af001af966c1cf83aa60134f6256efa':
                url = '/travl';
                break;
        }
        this.props.history.push(url)
    }
    toEdit() {
        this.props.history.push('/user')
    }
    render() {
        return(
            <div className={mainCss.main}>
                <Top ref='carStyle' toEdit={this.toEdit.bind(this)}/>
                <div className={homeCss['menu-line1']}>
                    {
                        this.state.topImgsList1.map((e) => {
                            return  <div key={e.id} className={homeCss['nav-content']}>
                                        <img src={e.url} width='580px' height='380px' onClick={this.navDetail.bind(this, e.id)}/>
                                        <div className={homeCss['nav-name1']}>
                                            <p>{e.name}</p>
                                            <p>{e.des}</p>
                                        </div>
                                    </div>
                        })
                    }
                    {/* <ui.Carousel interval="4000" type="card" height="600px" indicatorPosition='none' onChange={this.carouselChange.bind(this)}>
                        { 
                            this.state.topImgsList.map((e) => {
                                return  <ui.Carousel.Item key={e.id}>
                                            <img width='100%' height='100%' src={e.url} onClick={this.navDetail.bind(this, e.id)}/>
                                        </ui.Carousel.Item>
                            }) 
                        }
                    </ui.Carousel> */}
                    {/* <div className={homeCss['nav-name']}>{this.state.curNavTitle}</div> */}
                </div>
                <div className={homeCss['menu-line2']}>
                    {
                        this.state.topImgsList2.map((e) => {
                                return  <div key={e.id} className={homeCss['nav-content']}>
                                            <img src={e.url} width='580px' height='380px' onClick={this.navDetail.bind(this, e.id)}/>
                                            <div className={homeCss['nav-name2']}>
                                                <p>{e.name}</p>
                                                <p>{e.des}</p>
                                            </div>
                                        </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Home;
