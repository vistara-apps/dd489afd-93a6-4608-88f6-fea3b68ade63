import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface StoryGenerationParams {
  characterName: string;
  theme: string;
  ageGroup: string;
  moralLesson?: string;
  customElements?: string;
  voice?: string;
}

export async function generateStory(params: StoryGenerationParams): Promise<{
  title: string;
  text: string;
  duration: string;
}> {
  const { characterName, theme, ageGroup, moralLesson, customElements } = params;

  const prompt = `Create a bedtime story for a ${ageGroup} child. The main character is named ${characterName}. The story theme is ${theme}.

${moralLesson ? `The story should teach about: ${moralLesson}.` : ''}

${customElements ? `Include these custom elements: ${customElements}.` : ''}

Requirements:
- Age-appropriate content for ${ageGroup} children
- Engaging and imaginative narrative
- Peaceful, calming ending perfect for bedtime
- Length: 300-500 words
- Include a creative title

Format your response as JSON with keys: "title" and "text"`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a creative storyteller specializing in bedtime stories for children. Always respond with valid JSON containing "title" and "text" keys.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(response);
    if (!parsed.title || !parsed.text) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Estimate duration based on word count (roughly 150 words per minute for storytelling)
    const wordCount = parsed.text.split(' ').length;
    const estimatedMinutes = Math.ceil(wordCount / 150);
    const duration = `${estimatedMinutes}:${Math.floor(Math.random() * 30) + 30}`; // Add some randomness

    return {
      title: parsed.title,
      text: parsed.text,
      duration,
    };
  } catch (error) {
    console.error('Story generation failed:', error);
    throw new Error('Failed to generate story. Please try again.');
  }
}

export async function generateAudio(text: string, voice: string = 'alloy'): Promise<string> {
  try {
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
      input: text,
      response_format: 'mp3',
    });

    // Convert the response to a base64 string for storage
    const buffer = await mp3.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:audio/mp3;base64,${base64}`;

    return dataUrl;
  } catch (error) {
    console.error('Audio generation failed:', error);
    throw new Error('Failed to generate audio. Please try again.');
  }
}

