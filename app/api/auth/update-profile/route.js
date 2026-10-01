import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function PUT(request) {
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
    const { name, phone, pln_customer_id } = body

    if (!name || !phone) {
      return NextResponse.json(
        { message: 'Nama dan nomor telepon harus diisi' },
        { status: 400 }
      )
    }

    // Mock update - dalam production akan update ke database
    const updatedUser = {
      id: decoded.id,
      name,
      email: decoded.email,
      phone,
      pln_customer_id: pln_customer_id || null,
      role: decoded.role || 'user',
      createdAt: new Date('2026-01-15'),
    }

    return NextResponse.json(
      {
        message: 'Profil berhasil diperbarui',
        user: updatedUser,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat memperbarui profil' },
      { status: 500 }
    )
  }
}
