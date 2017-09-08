import React , {Component} from 'react';
import { Step, Segment, Dimmer, Loader} from 'semantic-ui-react';
import _ from 'underscore';
import axios from 'axios';
import SpecialSelect from '../SpecialSelect/';
import {BASE_URI} from '../../env';

export default class ConsBasedControls extends Component {
    state = {
        active:"Action",
        payload:[],
        loading:false,
        totalSelect:false,
        stepSelectedOptions:[null,null,null],
        summary:[
            {completed:false,active:true, title: "What do you want to find?", description: "Select action.."},
            {completed:false, active:false ,title: "Select State", description: "Select coressponding state"},
            {completed:false, active:false ,title: "Select constituency", description: "Select constituency.."}
        ]
    };

    componentDidMount = () => {
        this.setState({loading:true});
        this._loadInitialData();
    }
    _showActive = (summary) => {
            let renderIndex;
            _.chain(summary)
            .map((oneStep,index) => {
                if(oneStep.active){
                    renderIndex = index;
                    return index
                }
            });
            console.log(renderIndex);
            return renderIndex
    }
    
    _currentPayload = () => {
        let index = this._showActive();
        return this.state.payload[index];
    }
    
    _onChildrenSelect = (e) => {
        console.log(e);
    }

    _loadInitialData = () => {
        axios.get(BASE_URI + "list/activities").then((res) => {
            let pay = [];
            pay.push(res.data.activities);
            this.setState({payload:pay, loading:false})
        }).catch((err) => {
            console.log(err);
        })
    }
    
    render(){
        let summary = this.state.summary;
        return (
            <Segment>
                <Dimmer
                    active={this.state.loading}
                    page >
                    <Loader>Loading</Loader>
                </Dimmer>

                <Step.Group ordered>
                    {
                        _.map(summary, (oneStep,index) => {
                            let key = index+1;
                            return (
                                <Step completed={oneStep.completed} active={oneStep.active} key={key}>
                                    <Step.Content>
                                        <Step.Title>{oneStep.title}</Step.Title>
                                        <Step.Description>{oneStep.description}</Step.Description>
                                    </Step.Content>
                                </Step>
                            );
                        })
                    }
                </Step.Group>
                <SpecialSelect index={this._showActive()} payload={this._currentPayload()} onSelect={this._onChildrenSelect} />
            </Segment> 
        );
    }
}