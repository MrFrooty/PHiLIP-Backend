# PHiLIP: Personalized Human in Loop Image Production

## Overview

PHiLIP (Personalized Human in Loop Image Production) is an AI-powered image generation tool that allows users to create and refine images through an interactive, iterative process. This project combines advanced AI models with a user-friendly interface to produce high-quality images based on text prompts and user feedback.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Setup](#setup)
4. [Running the Project](#running-the-project)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Configuration](#configuration)
8. [Contributing](#contributing)
9. [License](#license)
10. [Team](#team)

## Features

- Text-to-image generation using advanced AI models
- Interactive image refinement process
- Multiple art style options
- Image enhancement capabilities (Continue, ControlNet, Upscale, Freestyle)
- Responsive design for various screen sizes
- Dark mode support

## Technology Stack

### Frontend:
- Next.js
- React
- Tailwind CSS
- Shadcn UI components

### Backend:
- Python
- Flask

### AI/ML:
- PyTorch 2.0
- Stable Diffusion
- PixArt

### Deployment:
- Vercel (Frontend)
- Flask (Backend)

### Hardware:
- AMD Instinct MI210 or AMD Radeon Pro W7900

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     NEXT_PUBLIC_API_URL=<your_backend_api_url>
     ```

## Running the Project

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. Enter a text prompt in the input field
2. Adjust generation parameters (number of images, resolution, temperature, inference steps)
3. Select an art style (optional)
4. Click "Generate Images" to create images based on your input
5. Use the carousel to view generated images
6. Apply enhancements using the options bar (Continue, Regenerate, ControlNet, Upscale, Freestyle)
7. Repeat the process to refine your images

## Project Structure

- `pages/`: Next.js pages
- `components/`: React components
- `styles/`: CSS and Tailwind styles
- `public/`: Static assets
- `lib/`: Utility functions
- `api/`: API route handlers

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/branch`)
3. Make your changes and commit them (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Team

### Engineers:
- Michael Chen
- Freddy Song
- Peter Lu

### Advisors:
- Xianghao Kong
- Ratnodeep Bandyopadhyay

---

For any additional questions or support, please open an issue in the GitHub repository.