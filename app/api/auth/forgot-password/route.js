import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email harus diisi' },
        { status: 400 }
      )
    }

    // Mock: dalam production akan send email dengan reset link
    console.log(`Reset password link sent to: ${email}`)

    return NextResponse.json(
      {
        message: 'Email reset password telah dikirim. Cek email Anda!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengirim email reset' },
      { status: 500 }
    )
  }
}
