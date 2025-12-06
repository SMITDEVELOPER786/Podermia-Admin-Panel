import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

export function LoanBarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Disbursed",
        data: [20, 40, 60, 80, 100, 120, 140],
        backgroundColor: "#264DAF"
      },
      {
        label: "Repaid",
        data: [10, 30, 50, 70, 90, 110, 130],
        backgroundColor: "#27AE60"
      }
    ]
  };

  return <Bar data={data} />;
}
export function LoanPieChart() {
  const data = {
    labels: ["Personal Loans", "Business Loans", "Mortgage", "Investment"],
    datasets: [
      {
        data: [45, 15, 25, 15],
        backgroundColor: ["#264DAF", "#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 0
      }
    ]
  };

  const options = {
    rotation: -2.2, 
    plugins: {
      legend: { display: false }
    }
  };

  return <Pie data={data} options={options} />;
}

export function LoanLineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        data: [38, 38, 38, 38, 38, 38, 38, 38],
        borderColor: "#2F66D0",
        borderWidth: 2,
        tension: 0,
        pointRadius: 5,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#2F66D0",
        pointBorderWidth: 2,
        fill: false
      }
    ]
  };

  const options = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        min: 0,
        max: 40,
        ticks: {
          callback: v => v + "M",
          color: "#888",
          font: { size: 11 }
        },
        grid: {
          display: false
        },
        border: {
          display: true,
          color: "#bbb",
          width: 1
        }
      },
      x: {
        ticks: {
          color: "#888",
          font: { size: 11 }
        },
        grid: {
          display: false
        },
        border: {
          display: true,
          color: "#bbb",
          width: 1
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 5
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return <Line data={data} options={options} />;
}

