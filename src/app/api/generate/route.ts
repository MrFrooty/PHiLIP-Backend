import { NextResponse } from 'next/server'

const API_URL = process.env.API_URL || 'http://localhost:5000';

export async function POST(request: Request) {
  try {
    const { prompt, numImages, resolution, temperature, inferenceSteps } = await request.json()
    
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, numImages, resolution, temperature, inferenceSteps }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
  }
}