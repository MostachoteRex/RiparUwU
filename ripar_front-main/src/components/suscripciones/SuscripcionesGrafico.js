import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { SUSCRIPCIONESCREADAS_GET_ENDPOINT } from '../../connections/helpers/endpoints';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const SuscripcionesGrafico = () => {
    
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(SUSCRIPCIONESCREADAS_GET_ENDPOINT)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          // Crear un objeto para contar la cantidad de suscripciones por mes
          const suscripcionesPorMes = response.data.reduce((acc, suscripcion) => {
            const month = new Date(suscripcion.fechaSuscripcion).getMonth();
            acc[month] = (acc[month] || 0) + 1;
            return acc;
          }, {});

          const chartData = {
            labels: Object.keys(suscripcionesPorMes).map((month) => getMonthName(parseInt(month))),
            datasets: [
              {
                
                data: Object.values(suscripcionesPorMes),
                backgroundColor: 'rgba(0, 220, 195, 0.9)'
              }
            ]
          };

          setChartData(chartData);
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
        }
      })
      .catch((error) => {
        console.error('Error al obtener datos de suscripciones:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 10,
      },
      x: {
        ticks: { color: 'rgba(0, 220, 195)' }
      }
    }
  };

  const getMonthName = (month) => {
    const monthNames = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    return monthNames[month];
  };

  return (
    <div>
      <h4 className="mb-3">Cantidad de Suscripciones por Mes</h4>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}

export { SuscripcionesGrafico };