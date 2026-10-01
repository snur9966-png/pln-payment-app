'use client'

import { useEffect, useState } from 'react'

export default function AdminPanelPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalRevenue: 0,
    pendingTransactions: 0,
  })
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const response = await fetch('/api/admin/overview')
      if (!response.ok) {
        throw new Error('Gagal mengambil data admin')
      }

      const data = await response.json()
      setStats(data.stats)
      setTransactions(data.transactions || [])
    } catch (err) {
      console.error('Admin fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return `Rp ${Number(amount).toLocaleString('id-ID')}`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">🛠️ Admin Panel</h1>
        <p className="text-gray-600 mt-1">Kelola transaksi, pengguna, dan performa pembayaran PLN</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminCard title="Total User" value={stats.totalUsers} icon="👥" accent="blue" />
        <AdminCard title="Total Transaksi" value={stats.totalTransactions} icon="💳" accent="green" />
        <AdminCard title="Pendapatan" value={formatCurrency(stats.totalRevenue)} icon="💰" accent="yellow" />
        <AdminCard title="Pending" value={stats.pendingTransactions} icon="⏳" accent="purple" />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaksi Terbaru</h2>

        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Jumlah</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Metode</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold text-gray-800">{tx.orderId}</td>
                    <td className="py-3 px-4">{tx.userName}</td>
                    <td className="py-3 px-4">{formatCurrency(tx.amount)}</td>
                    <td className="py-3 px-4">{tx.paymentMethod}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(tx.createdAt).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Belum ada transaksi</p>
        )}
      </div>

      <style jsx>{`
        .spinner {
          border: 4px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          border-top: 4px solid #3b82f6;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

function AdminCard({ title, value, icon, accent }) {
  const accentClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200',
  }

  return (
    <div className={`${accentClasses[accent]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const statusClasses = {
    settlement: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    deny: 'bg-red-100 text-red-800',
    cancel: 'bg-gray-100 text-gray-800',
  }

  const labelMap = {
    settlement: 'Berhasil',
    pending: 'Menunggu',
    deny: 'Ditolak',
    cancel: 'Dibatalkan',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
      {labelMap[status] || status}
    </span>
  )
}
