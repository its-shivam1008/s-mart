'use client'
import { FunctionComponent, useEffect, useRef } from "react"
import {Line, Bar} from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(LineElement,BarElement, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend);

interface DataInfo {
    DataInfo :any;
    titleOfGraph:string
}
const FilledLineChart: FunctionComponent<DataInfo> = ({DataInfo, titleOfGraph}) => {

    const {today, week, month} = DataInfo

    // const canvasRef = useRef<HTMLCanvasElement>(null);

    const options:any={
        responsive:true,
        plugins:{
            legend:{
                display:false
            },
            title:{
                display:true,
                text:titleOfGraph
            }
        }
    }

    const data = {
        labels: ["Today", "This week", "This month"],
        datasets: [{
            data: [today, week, month], // variable
            borderColor: [
                'purple','blue','green'
            ],
            backgroundColor:[
                ' #DAB1DA','lightblue','lightgreen'
            ],
            tension:0.3,
        }
        ]
    }


    return (
        <>
        <div>
            <Bar options={options} data={data}/>
        </div>
        </>
    )
}

export default FilledLineChart;