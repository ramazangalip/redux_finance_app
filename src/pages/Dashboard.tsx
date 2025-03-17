import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet, 
  faArrowUp, 
  faArrowDown, 
  faChartLine,
  faCalendar,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { RootState } from '../store/store';
import { fetchTransactionsStart, fetchTransactionsSuccess, fetchTransactionsFailure } from '../store/slices/financeSlice';
import { financeAPI } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state: RootState) => state.finance);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchTransactionsStart());
      try {
        const data = await financeAPI.getTransactions();
        dispatch(fetchTransactionsSuccess(data));
      } catch (error) {
        dispatch(fetchTransactionsFailure(error instanceof Error ? error.message : 'Veri yüklenemedi'));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (transactions.length > 0) {
      const dates = transactions.map(t => t.date);
      const amounts = transactions.map(t => t.amount);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: 'Finansal Hareketler',
            data: amounts,
            fill: false,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: 'white',
            pointBorderWidth: 2,
          },
        ],
      });
    }
  }, [transactions]);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-5">
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card dashboard-card h-100 fade-in">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  <FontAwesomeIcon icon={faWallet} className="me-2 text-primary" />
                  Toplam Bakiye
                </h5>
              </div>
              <h2 className="value mb-0">
                {balance.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </h2>
              <p className="text-muted mt-2 mb-0">Güncel bakiyeniz</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card dashboard-card h-100 fade-in" style={{animationDelay: '0.1s'}}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  <FontAwesomeIcon icon={faArrowUp} className="me-2 text-success" />
                  Toplam Gelir
                </h5>
              </div>
              <h2 className="value text-success mb-0">
                {totalIncome.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </h2>
              <p className="text-muted mt-2 mb-0">Tüm gelirleriniz</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card dashboard-card h-100 fade-in" style={{animationDelay: '0.2s'}}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">
                  <FontAwesomeIcon icon={faArrowDown} className="me-2 text-danger" />
                  Toplam Gider
                </h5>
              </div>
              <h2 className="value text-danger mb-0">
                {totalExpense.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </h2>
              <p className="text-muted mt-2 mb-0">Tüm giderleriniz</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card h-100 fade-in" style={{animationDelay: '0.3s'}}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">
                  <FontAwesomeIcon icon={faChartLine} className="me-2 text-primary" />
                  Finansal Grafik
                </h5>
              </div>
              {chartData && <Line data={chartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1e293b',
                    bodyColor: '#1e293b',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }} />}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 fade-in" style={{animationDelay: '0.4s'}}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="me-2 text-primary" />
                  Son İşlemler
                </h5>
              </div>
              <div className="transaction-list">
                {transactions.slice(0, 5).map((transaction, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <div>
                      <h6 className="mb-1">{transaction.description}</h6>
                      <small className="text-muted">
                        <FontAwesomeIcon icon={faCalendar} className="me-1" />
                        {transaction.date}
                      </small>
                    </div>
                    <div className={`text-${transaction.type === 'income' ? 'success' : 'danger'} fw-bold`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {transaction.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 