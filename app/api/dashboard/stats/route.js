import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function GET(request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    // Mock data - dalam production akan fetch dari database
    const stats = {
      totalSpent: 5400000,
      lastPayment: '25 September 2026',
      pendingBills: 2,
      totalTransactions: 8,
    }

    const recentTransactions = [
      {
        orderId: 'PLN-001',
        amount: 450000,
        paymentMethod: 'credit_card',
        status: 'settlement',
        createdAt: new Date('2026-09-25'),
      },
      {
        orderId: 'PLN-002',
        amount: 475000,
        paymentMethod: 'bank_transfer',
        status: 'settlement',
        createdAt: new Date('2026-09-15'),
      },
      {
        orderId: 'PLN-003',
        amount: 425000,
        paymentMethod: 'qris',
        status: 'settlement',
        createdAt: new Date('2026-09-05'),
      },
    ]

    return NextResponse.json(
      {
        stats,
        recentTransactions,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan' },
      { status: 500 }
    )
  }
}
