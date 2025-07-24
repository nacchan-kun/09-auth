import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { isAxiosError } from 'axios';

function logErrorResponse(error: unknown) {
  if (isAxiosError(error)) {
    console.error('Axios error:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      withCredentials: true,
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to get note' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to get note' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const body = await request.json();
    
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      withCredentials: true,
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to update note' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      withCredentials: true,
    });
    
    return NextResponse.json(response.data);
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Failed to delete note' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}


