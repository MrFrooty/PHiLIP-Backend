# PHiLIP: Personalized Human in Loop Image Production

### Authors

Engineers:
Michael Chen,
Freddy Song,
Peter Lu

Advisors:
Xianghao Kong,
Ratnodeep Bandyopadhyay


Investing significant time into producing a single high-quality image using text-to-image generative AI risks not effectively meeting user requirements, leading to multiple generations and wasted computing resources.

An interface that uses an iterative methodology to generate various low-resolution images from text. Images that correspond with the user's vision are selected and iterated upon to create a single high-resolution image.

The current state-of-the-art focuses on improving single image generation performance. Our proposed idea would improve precision by intermittently receiving user feedback, utilizing compute resources more efficiently to better align with user expectations.

The proposed system allows users to input a text prompt, which an AI model uses to generate a collection of low-resolution images. Users can then interactively select images they prefer or dislike. Based on this feedback, the AI model identifies and enhances desired features in the images while deemphasizing less preferred elements. The process involves multiple rounds, with the number of iterations determined by the user's level of satisfaction with the images. In each successive round, the image quality improves, gradually converging towards a single, high-resolution image that closely aligns with the user's preferences. This approach offers a tailored and iterative experience, enabling users to refine their visual ideas through direct engagement with the AI's creative process.

The AMD Instinct MI210 or AMD Radeon Pro W7900 will be used for AI image generation through PyTorch 2.0 and Stable Diffusion (open to change).

### Hardware:
- AMD Instinct MI210 or AMD Radeon Pro W7900

### Software:
- PyTorch 2.0: Stable Diffusion
- AMD ROCm Software

### Framework:
- Next.js

### Deployment:
- Vercel

### Front-end:
- React

### Back-end:
- Flask


Project Technical:

## Overview

This project utilizes PixArt to generate images based on text prompts. It provides an interactive interface for users to generate, select, and refine images through multiple iterations.

## Table of Contents

1. [Setup](#setup)
2. [Running the Project](#running-the-project)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contributing)
8. [License](#license)

## Setup

1. Create a new conda environment: conda create --name pixart python=3.8
2. Activate the conda environment: conda activate pixart
3. Install PyTorch and related packages: conda install -c pytorch pytorch torchvision torchaudio
4. Install other required packages: pip install -U diffusers transformers accelerate safetensors sentencepiece beautifulsoup4 matplotlib ftfy pillow requests scipy tqdm

## Running the Project

After setting up the environment and installing all required packages, run the project using: python main.py

This will start the image generation process using the initial prompt defined in `config.py`.

## Project Structure

- `main.py`: The entry point of the application.
- `config.py`: Contains configuration settings for the project.
- `image_generation_loop.py`: Implements the main image generation loop.
- `generate_image.py`: Handles the actual image generation using PixArt.
- `display_image.py`: Manages image display and user selection.
- `user_input_handler.py`: Handles user input during the generation process.

## Usage

1. The program will start by generating a set of images based on the initial prompt.
2. Images will be displayed, and you'll be prompted to select your favorites.
3. You can then choose to:
   - Regenerate images
   - Reselect from the previous set
   - Modify the prompt
   - Adjust the temperature
   - Continue to the next iteration
   - Restart the process
   - Stop the program

4. The process continues until you decide to stop or all iterations are completed.
5. Selected images are saved in the `generated_images` folder.

## Configuration

You can modify various settings in the `config.py` file:

- `RESOLUTIONS`: List of image resolutions for each iteration
- `NUM_IMAGES_LIST`: Number of images to generate in each iteration
- `INFERENCE_STEPS_LIST`: Number of inference steps for each iteration
- `DEFAULT_TEMPERATURE`: Default temperature for image generation
- `INITIAL_PROMPT`: The starting prompt for image generation

## Troubleshooting

- Ensure you have sufficient GPU memory if you're using CUDA for faster processing.
- If you encounter CUDA out of memory errors, try reducing the number of images generated or the resolution.
- For any persistent issues, check the error logs and consult the PixArt and Diffusers documentation.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit them (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any additional questions or support, please open an issue in the GitHub repository.
