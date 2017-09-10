import React, {Component} from 'react';
import _ from 'underscore';
import { Message } from 'semantic-ui-react';

class SpecialSelect extends Component {
    
    masterRender = () => {
        if(this.props.active){
            switch(this.props.index){
                case 0:
                    return (
                        <select name={this.props.summary[this.props.index].description} onChange={this.props.onSelect} id={this.props.summary[this.props.index].description}>
                            {
                                _.map(this.props.payload , (pay) => {
                                    return (
                                        <option key={"action"+pay.id} value={pay.action}>{pay.payload}</option>
                                    );
                                })
                            }
                        </select>
                    );
                case 1:
                    return (
                        <select name={this.props.summary[this.props.index].description} onChange={this.props.onSelect} id={this.props.summary[this.props.index].description}>
                            {
                                _.map(this.props.payload, (pay,index) => {
                                    return (
                                        <option key={"state"+index} value={pay.state}>{pay.state}</option>
                                    );
                                })
                            }
                        </select>
                    );
                case 2:
                    console.log(this.props.payload);
                    if(this.props.payload){
                        return (
                            <select name={this.props.summary[this.props.index].description} onChange={this.props.onSelect} id={this.props.summary[this.props.index].description}>
                                {
                                    _.map(this.props.payload, (pay,index) => {
                                        return (
                                            <option key={"cons"+index} value={pay.consname}>{pay.consname}</option>
                                        );
                                    })
                                }
                            </select>
                        );
                    }else{
                        return (
                            <Message negative>
                                <Message.Header>Nothing like that found!</Message.Header>
                                <Message.Content>Nothing like that found in our database</Message.Content>
                            </Message>
                        )
                    }
                default:
                    console.log("Default case do something!");
                    return null;
            }
        }else{
            return (<div />);
        }
    }

    render() {
        return (
            <div>
                {
                    this.masterRender()
                }
            </div>
        );
    }
}

export default SpecialSelect;