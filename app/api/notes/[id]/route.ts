import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Тут буде логіка отримання нотатки за ID
    // Поки що повертаємо заглушку
    return NextResponse.json({
      success: true,
      data: {
        id,
        title: 'Sample Note',
        content: 'Sample content',
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error getting note:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get note' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Тут буде логіка оновлення нотатки
    return NextResponse.json({
      success: true,
      data: {
        id,
        ...body,
        updatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update note' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Тут буде логіка видалення нотатки
    return NextResponse.json({
      success: true,
      message: `Note ${id} deleted successfully`
    })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete note' },
      { status: 500 }
    )
  }
}
