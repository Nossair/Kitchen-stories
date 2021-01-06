import React ,{Component} from 'react';

import './Myrecette.css';

import Myformulair from './Myformulair';
class Myrecette extends Component{
    render(){
        return(
            <div className="Myrecette">
                {this.props.nn}
            </div>
        )
    }
}
export default Myrecette