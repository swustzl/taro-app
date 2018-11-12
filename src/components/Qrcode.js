import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import QRCode from 'qrcode'

export default class Qrcode extends Component{
  constructor(props){
    super(props)
    this.state={
      qrCodeContent:"www.baidu.com",
      url: '',
    }
  }

  componentDidMount(){
    /*let canvas = document.getElementsByName('qrcode');
    canvas = canvas ? canvas[0] : null;
    this.qrcode = QRCode.toCanvas(canvas, this.state.url,{width: 300}, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })*/
    QRCode.toDataURL(this.state.qrCodeContent, (error, url) => {
      if (error) {
        console.error(error)
      } else {
        this.setState({ url })
      }
    })
  }

  render(){
    console.log(this.state.url)
    return(
      <Image
        style='width: 300px;height: 300px;background: #fff;'
        src={this.state.url}
      />
    )
  }
}
