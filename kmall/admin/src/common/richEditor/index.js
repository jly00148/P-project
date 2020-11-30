import React, { Component } from 'react';
import Simditor from 'simditor';
import $ from 'jquery';
import 'simditor/styles/simditor.css';

class RichEditor extends Component {
    constructor(props){
        super(...props)
        this.state = {
            isLoaded:false
        }
        this.toobar=[
            'title',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'fontScale',
            'color',
            'ol', 
            'ul',
            'blockquote',
            'code',
            'table',
            'link',
            'image',
            'hr',
            'indent',
            'outdent',
            'alignment'
        ]
        $.ajaxSetup({
            xhrFields:{
                withCredentials:true//携带cookie
            }
        })
    }


    componentDidMount(){
        this.editor = new Simditor({
            textarea: this.textarea,
            toolbar: this.toolbar,
            upload:{
                url:this.props.url,
                fileKey:'upload'
            }
      });
      this.editor.on('valuechanged',()=>{//富文本输入内容会被触发
        // this.props.getValue(this.editor.getValue())
        this.setState({isLoaded:true},()=>{
            this.props.getValue(this.editor.getValue())
        })
      })
    }

    //如果有values传过来，回填商品详情处理
    componentDidUpdate(){
        if(this.props.values && !this.state.isLoaded){
            this.editor.setValue(this.props.values);
            this.setState({isLoaded:true})
        }
    }

    render(){
        return(
            <textarea  ref={(textarea)=>{this.textarea=textarea}} ></textarea>
        )
    }
}

export default RichEditor;