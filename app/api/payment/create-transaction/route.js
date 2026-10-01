import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function POST(request) {
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

    const body = await request.json()
    const { customerId, amount, paymentMethod, billPeriod, note } = body

    if (!customerId || !amount || !paymentMethod) {
      return NextResponse.json(
        { message: 'Customer ID, amount dan payment method harus diisi' },
        { status: 400 }
      )
    }

    const orderId = `PLN-${Date.now()}`
    const transaction = {
      orderId,
      customerId,
      amount: Number(amount),
      paymentMethod,
      billPeriod: billPeriod || '2026-09',
      note: note || '',
      status: 'pending',
      redirectUrl: `https://sandbox.midtrans.com/snap/v2/vtweb/${orderId}`,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        message: 'Transaksi berhasil dibuat',
        transaction,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Create transaction error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat membuat transaksi' },
      { status: 500 }
    )
  }
}
