import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtButton} from "taro-ui";
import request from '../../utils/request';
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'



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
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  onBFClick = () => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance("taro官方提供的demo是很简单的，主要是为了让大家快速上手，入门。那么，当我们要开发偏大型的项目时，应该如何使用taro使得开发体验更好，开发效率更高？作为深度参与TOPLIFE小程序开发的人员之一，谈一谈我的一些实践体验及心得"));
  }
  render () {
    console.log(this.state.util);
    return (
      <View className='index'>
        <AtButton type='primary' className='bounceInLeft animated' onClick={this.onBFClick}>按钮文案 <Image src='https://test-1257992287.cos.ap-chengdu.myqcloud.com/test/logo.png' style={{width: 32, height: 24}} /></AtButton>
        <Button className='add_btn' onClick={this.props.add}>++</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Index
