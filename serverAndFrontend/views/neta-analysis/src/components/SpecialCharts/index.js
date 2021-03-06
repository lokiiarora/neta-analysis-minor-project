import React, {Component} from 'react';
// import _ from 'underscore';
// import {Bar as BarChart} from 'react-chartjs';
// import {actionSwitcher} from '../../utils/';


class SpecialChart extends Component{
    
    state = {
        chartPayload:{
            data:{
            labels:["Red"],
            datasets:[{
                label:null,
                data:null,
                backgroundColor:[
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor:[
                    'rgba(255,99,132,1)'
                ],
                borderWidth:1
            }]
        },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        }
    };

    componenetDidMount = () => {
        let dum = this.state.chartPayload;
        dum.data.datasets[0].data = this.props.payload;
        dum.data.datasets[0].label = "Male to Female Ratio";
        console.log(this.props.payload);
        console.log(this.props.controls);
        // console.log(actionSwitcher(this.props.controls[0]))
        this.setState({chartPayload:dum});
    }

    _masterRender = () => {
        if(!this.props.active){
            return null;
        }else{
            return (
                <div >{this.props.payload}</div>
            );
        }
    }
    
    render = () => {
        return (
            <div>  
                {
                    this._masterRender()
                }
            </div>
        );
    }
}

export default SpecialChart;