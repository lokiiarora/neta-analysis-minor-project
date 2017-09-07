import React , {Component} from 'react';
import {Icon, Step, Segment, Dimmer, Loader} from 'semantic-ui-react';
import _ from 'underscore';
import axios from 'axios';
import {BASE_URI} from '../../env';

export default class ConsBasedControls extends Component {
    state = {
        active:"Action",
        payload:{step1:{},step2:{}, step3:{}},
        loading:false,
        totalSelect:false,
        stepActive:[true,false,false]
    };

    componentDidMount = () => {
        this.setState({loading:true});
        this._loadInitialData();
    }

    _loadInitialData = () => {
        axios.get(BASE_URI + "list/activities").then((res) => {
            // console.log(res);
            let pay = this.state.payload;
            pay.step1 = res.data;
            this.setState({payload:pay, loading:false})
        }).catch((err) => {
            console.log(err);
        })
    }
    
    render(){
        return (
            <Segment>
                <Dimmer
                    active={this.state.loading}
                    page >
                    <Loader>Loading</Loader>
                </Dimmer>

                <div>
                    Hey I'm inside
                </div>
            </Segment> 
        );
    }
}