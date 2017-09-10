import React , {Component} from 'react';
import { Step, Segment, Dimmer, Loader} from 'semantic-ui-react';
import _ from 'underscore';
import axios from 'axios';
import SpecialSelect from '../SpecialSelect/';
import {BASE_URI} from '../../env';
import qs from 'qs';
import SpecialChart from '../SpecialCharts/';

export default class ConsBasedControls extends Component {
    state = {
        payload:[],
        loading:false,
        totalSelect:false,
        chartsPayload:null,
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
                }
                return index
            });
            // console.log(renderIndex);
            return renderIndex
    }
    
    _currentPayload = () => {
        let index = this._showActive();
        // console.log(index);
        // console.log(this.state.payload[index]);
        return this.state.payload[index];
    }

    _loadCharts = (index) => {
        let dateIni = Date.now();
        let total = !this.state.totalSelect;
        axios.get(BASE_URI+"exactlist/all/",{
            params:{
                action:this.state.stepSelectedOptions[0],
                state:this.state.stepSelectedOptions[1],
                cons:this.state.stepSelectedOptions[2]
            },
            paramsSerializer: (params) => {
                return qs.stringify(params)
            }
        }).then((res) => {
            console.log("Res time is" + (Date.now() - dateIni));
            let pay = this.state.payload;
            pay[index] = res.data;
            this.setState({loading:false, totalSelect:total,payload:pay});
            console.log(res.data[0]);
        }).catch((err) => {
            console.error(err);
        });
    }

    _loadNextStep = (index) => {
        let dateIni = Date.now();
        switch(index){
            case 1:
                axios.get(BASE_URI + "exactlist/states").then((res) => {
                    console.log("Res time is" + (Date.now() - dateIni));
                    let pay = this.state.payload;
                    pay[index]= res.data;
                    this.setState({loading:false,payload:pay});
                }).catch((err)=>{
                    console.log(err);
                })
                break;
            case 2:
                
                axios.get(BASE_URI + "exactlist/cons" , {
                    params: {
                        state:this.state.stepSelectedOptions[1],
                    },
                    paramsSerializer: params => {
                        return qs.stringify(params)
                    }
                }).then((res) => {
                    console.log("Res time is" + (Date.now() - dateIni));
                    console.log(res.data);
                    this.setState({loading:false,chartsPayload:res.data});
                }).catch((err) => {
                    console.log(err);
                })
                break;
            default:
                console.log("Default case ! Do something !");
                break;
        }
    }
    
    _onChildrenSelect = (e) => {
        console.log(this);
        let index = this._showActive(this.state.summary);
        console.log(index);
        let sumdum = this.state.summary;
        let optionPayload = this.state.stepSelectedOptions;
        if(index<2){
            sumdum[index].active = false;
            sumdum[index].completed = true;
            sumdum[index+1].active = true;
            optionPayload[index] = e.nativeEvent.target.value;
            console.log(e.nativeEvent.target);
            this.setState({summary:sumdum , loading:true , stepSelectedOptions:optionPayload});
            this._loadNextStep(index+1);
        }else{
            optionPayload[index] = e.nativeEvent.target.value;
            sumdum[index].completed= true;
            sumdum[index].active = false;
            console.log(optionPayload);
            this.setState({summary:sumdum, loading:true, stepSelectedOptions:optionPayload,totalSelect:true});
            this._loadCharts(index);
        }
        console.log(e.nativeEvent.target.value);
    }

    _loadInitialData = () => {
        let dateIni = Date.now();
        axios.get(BASE_URI + "list/activities").then((res) => {
            console.log("Res time is" + (Date.now() - dateIni));
            let pay = [];
            pay[0]=(res.data.activities);
            // console.log(pay)
            this.setState({payload:pay, loading:false});
        }).catch((err) => {
            console.log(err);
        })
    }
    
    render(){
        let summary = this.state.summary;
        let index = this._showActive(summary);
        // console.log(index);
        let payload = this.state.payload[index];
        // console.log(payload);
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
                <SpecialSelect active={!this.state.totalSelect} index={index} summary={this.state.summary} payload={payload} onSelect={this._onChildrenSelect} />
                <SpecialChart active={this.state.totalSelect} payload={this.state.chartsPayload} label={"Fuck all"} />
            </Segment> 
        );
    }
}