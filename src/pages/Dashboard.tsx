import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
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
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      });
    }
  }, [transactions]);

  if (loading) {
    return <div className="text-center mt-5">Yükleniyor...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Finansal Gösterge Paneli</h2>
      <div className="row">
        <div className="col-md-8">
          {chartData && (
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title">Finansal Grafik</h5>
                <Line data={chartData} />
              </div>
            </div>
          )}
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Özet</h5>
              <div className="mb-3">
                <strong>Toplam İşlem:</strong> {transactions.length}
              </div>
              <div className="mb-3">
                <strong>Toplam Gelir:</strong>{' '}
                {transactions
                  .filter(t => t.type === 'income')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </div>
              <div>
                <strong>Toplam Gider:</strong>{' '}
                {transactions
                  .filter(t => t.type === 'expense')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Son İşlemler</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Açıklama</th>
                  <th>Kategori</th>
                  <th>Tip</th>
                  <th>Tutar</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.category}</td>
                    <td>{transaction.type === 'income' ? 'Gelir' : 'Gider'}</td>
                    <td
                      className={transaction.type === 'income' ? 'text-success' : 'text-danger'}
                    >
                      {transaction.amount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 