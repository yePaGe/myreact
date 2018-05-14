import React from 'react';

class Baidumap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            const bMap = window.BMap
            console.log(bMap)
            let map = new bMap.Map('allmap')
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设    置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
            map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            map.addEventListener('click', function(e) {
                console.log('aaa', e.point)
            })
        }, 1000)
    }
    render() {
        return(
            <div>
                <div
                    id='allmap'
                    style={{
                        width:'50vw',
                        height:'50vh'
                    }} />
            </div>
        )
    }
}
export default Baidumap;