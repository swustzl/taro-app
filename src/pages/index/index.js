import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtButton} from "taro-ui";
import request from '../../utils/request';
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'
import Qrcode from "../../components/Qrcode";



@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor(props){
    super(props);
    request({url: 'https://test-1257992287.cos.ap-chengdu.myqcloud.com/test/util.js'}).then((data)=>{
      console.log('data: '+ data);
    });
    this.state = {
      util: require('../../utils/util.js'),
      data: '',}
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  onBFClick = () => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.data));
  };
  render () {
    console.log(this.state.util);
    return (
      <View className='index'>
        <AtButton type='primary' className='bounceInLeft animated' onClick={this.onBFClick}>按钮文案
          <Image src='https://test-1257992287.cos.ap-chengdu.myqcloud.com/test/logo.png' style={{width: 35, height: 30, lineHeight: 30}} />
        </AtButton>
        <Button className='add_btn' onClick={this.props.add}>++</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <Qrcode />
      </View>
    )
  }
}

export default Index
