import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, history } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemPrompt = `You are an elite AI travel planner and logistics expert.
Build a production-grade, optimized travel itinerary in JSON format.
Intelligently optimize activity order based on:
- Geographic distance & travel time (OSRM-like logic)
- Real-world opening hours
- Meal timing (Breakfast, Lunch, Dinner)
- Crowd optimization patterns

JSON Schema:
{
  "tripName": "String",
  "budget": "String",
  "story": "Cinematic overview",
  "center": [lat, lng],
  "packingList": ["item"],
  "suggestions": ["advice"],
  "itinerary": [
    {
      "id": "uuid-like",
      "day": 1,
      "title": "String",
      "location": { "name": "String", "lat": number, "lng": number },
      "startTime": "ISO String (YYYY-MM-DDTHH:mm:00)",
      "endTime": "ISO String (YYYY-MM-DDTHH:mm:00)",
      "duration": number (minutes),
      "cost": "String",
      "type": "activity|meal|travel",
      "aiReason": "Why this stop is optimized in this order (distance, opening hours, etc.)",
      "travelTimeToNext": number (minutes),
      "distanceToNext": "String (km)"
    }
  ]
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...(history || []),
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
    });

    const response = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Groq AI Error:', error);
    return NextResponse.json({ error: 'Failed to generate itinerary. Please check your API key and try again.' }, { status: 500 });
  }
}
