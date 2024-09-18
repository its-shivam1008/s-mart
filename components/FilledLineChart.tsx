'use client'
import { useEffect, useRef } from "react"
import {Line} from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(LineElement, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend);
function FilledLineChart() {

    // const canvasRef = useRef<HTMLCanvasElement>(null);

    const options:any={
        // responsive:true,
        plugins:{
            title:{
                display:true,
                text:'Visualising the orders '
            }
        }
    }

    const data = {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
            data: [86, 114, 106, 106, 107, 111, 133],
            label: "Applied",
            borderColor: "rgb(62,149,205)",
            tension:0.3,
        }, {
            data: [70, 90, 44, 60, 83, 90, 100],
            label: "Accepted",
            tension:0.3,
            borderColor: "rgb(60,186,159)",
            backgroundColor: "rgb(60,186,159,0.1)",
        }, {
            data: [10, 21, 60, 44, 17, 21, 17],
            label: "Pending",
            tension:0.3,
            borderColor: "rgb(255,165,0)",
            backgroundColor: "rgb(255,165,0,0.1)",
        }, {
            data: [6, 3, 2, 2, 7, 0, 16],
            label: "Rejected",
            tension:0.3,
            borderColor: "rgb(196,88,80)",
            backgroundColor: "rgb(196,88,80,0.1)",
        }
        ]
    }


    return (
        <>
        <div className='md:block hidden'>
            <Line options={options} data={data}/>
        </div>
        </>
    )
}

export default FilledLineChart;