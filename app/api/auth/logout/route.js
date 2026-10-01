import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const response = NextResponse.json(
      { message: 'Logout berhasil' },
      { status: 200 }
    )

    // Clear token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    )
  }
}
