# YouTube Transcript API

A service API for retrieving YouTube video transcripts.

## API Endpoint

### Get Video Transcript

```http
POST https://transcriptly.org/api/v1/transcript
```
#### Request Headers

| Header | Type | Required | Description |
|-----------|------|----------|-------------|
| x-api-key | string | Yes | API key |

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| url | string | Yes | YouTube video URL |
| language | string | No | Language of the transcript to be returned, default is English |

#### Request Example

```json
{
  "url": "https://www.youtube.com/watch?v=your_video_id",
  "language": "en"
}
```

#### Response Format

Success Response (200 OK):
```json
{
  "code": 200,
  "message": "Transcript generated successfully",
  "data": {
    "success": true,
		"data": [{
			"id": 1,
			"start": 0.12,
			"end": 2.159,
			"text": "this might sound crazy but the way to"
		}, {
			"id": 2,
			"start": 2.159,
			"end": 3.84,
			"text": "achieve what you want isn't what you"
		},
    ...
    {
			"id": 176,
			"start": 395.56,
			"end": 397.919,
			"text": "video"
		}],
		"url": "https://www.youtube.com/watch?v=BJ2NvjS7Aio",
		"language": "en",
		"total": 176
  }
}
```

Error Response (HTTP status 400 Bad Request):
```json
{
  "code": 400,
  "message": "Invalid request body"
}
```
Error Response (HTTP status 400 Bad Request):
```json
{
  "code": 4001,
  "message": "Invalid YouTube URL"
}
```

Error Response (HTTP status 401 Unauthorized):
```json
{
  "code": 401,
  "message": "Invalid API key"
}
```

Error Response (HTTP status 403 Forbidden):
```json
{
  "code": 403,
  "message": "Insufficient credits"
}
```

Error Response (HTTP status 429 Too Many Requests):
```json
{
  "code": 429,
  "message": "Access rate limit exceeded"
}
```

Error Response (HTTP status 500 Internal Server Error):
```json
{
  "code": 5001,
  "message": "Transcript generated failed",
  "data": {
    "success": false,
    "data": [],
    "url": "https://www.youtube.com/watch?v=-FNIAzYLCQA",
    "language": "123",
    "total": 0,
    "error": "API request failed: 400"
  }
}
```

## Local Development

1. Clone the project and install dependencies:
```bash
npm install
# or
yarn install
```

2. Configure environment variables:
Create a `.env.local` file and add:
```env
TRANSCRIPTLY_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The server will be running at [http://localhost:3000](http://localhost:3000).

## Tech Stack

- [Next.js](https://nextjs.org) - React Framework
- [Tailwind CSS](https://tailwindcss.com) - Styling Framework

## Important Notes

- Ensure you provide a valid YouTube video URL
- Keep your API key secure and never expose it publicly
- Comply with YouTube's Terms of Service and usage policies
