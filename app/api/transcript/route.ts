import { NextResponse } from 'next/server';

const API_KEY = process.env.TRANSCRIPTLY_API_KEY;

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: '请提供YouTube URL' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API key is not configured' },
        { status: 500 }
      );
    }

    console.log('===>API_KEY:', API_KEY);
    const response = await fetch('http://localhost:3000/api/v1/transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY as string,
      },
      body: JSON.stringify({ url }),
    });

    console.log('===>response:', response);

    // if (!response.ok) {
    //   throw new Error('获取transcript失败');
    // }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return NextResponse.json(
      { error: '获取transcript时发生错误' },
      { status: 500 }
    );
  }
} 