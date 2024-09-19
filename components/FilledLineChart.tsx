'use client'
import { FunctionComponent, useEffect, useRef } from "react"
import {Line, Bar} from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, BarElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(LineElement,BarElement, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend);

interface DataInfo {
    DataInfo :any;
}
const FilledLineChart: FunctionComponent<DataInfo> = ({DataInfo}) => {

    const {today, thisWeek, thisMonth} = DataInfo

    // const canvasRef = useRef<HTMLCanvasElement>(null);

    const options:any={
        responsive:true,
        plugins:{
            legend:{
                display:false
            },
            title:{
                display:true,
                text:'Visualising the orders '
            }
        }
    }

    const data = {
        labels: ["Today", "This week", "This month"],
        datasets: [{
            data: [86, 114, 106], // variable
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