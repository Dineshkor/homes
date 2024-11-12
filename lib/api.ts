import { NextResponse } from 'next/server'

export type ApiResponse<T = any> = {
  data?: T
  error?: string
  message?: string
}

export function apiResponse<T>(
  data?: T,
  error?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  if (error) {
    return NextResponse.json({ error }, { status: status >= 300 ? status : 400 })
  }
  return NextResponse.json({ data }, { status })
}
