document.addEventListener('DOMContentLoaded', () => {
    // --- Music Player Functionality ---
    const backgroundMusic = document.getElementById('background-music');
    const muteToggleButton = document.getElementById('mute-toggle');

    if (backgroundMusic && muteToggleButton) {
        // Initial state: Show volume_off icon since audio starts muted by browser policy
        muteToggleButton.innerHTML = '<span class="material-symbols-outlined">volume_off</span>';

        muteToggleButton.addEventListener('click', () => {
            if (backgroundMusic.muted) {
                backgroundMusic.muted = false; // Unmute the audio
                muteToggleButton.innerHTML = '<span class="material-symbols-outlined">volume_up</span>';
                // Try to play if it was paused (important for user interaction policy)
                backgroundMusic.play().catch(e => console.error("Error playing audio after unmute:", e));
            } else {
                backgroundMusic.muted = true; // Mute the audio
                muteToggleButton.innerHTML = '<span class="material-symbols-outlined">volume_off</span>';
            }
        });

        // Optional: If you want to force play on user interaction beyond the button itself,
        // though the button is the most reliable way.
        // document.body.addEventListener('click', () => {
        //     if (backgroundMusic.paused && !backgroundMusic.muted) {
        //         backgroundMusic.play().catch(e => console.error("Error playing audio on body click:", e));
        //     }
        // });
    }

    // --- "No" Button Movement Functionality (Only for final page) ---
    const noButtonFinal = document.getElementById('no-button-final');

    if (noButtonFinal) { // Check if this specific button exists on the current page
        noButtonFinal.addEventListener('mouseenter', () => {
            noButtonFinal.classList.add('moving'); // Add moving class for CSS styling

            const container = noButtonFinal.closest('.container');
            if (!container) {
                console.error("Container not found for the 'No' button.");
                return;
            }

            // Get button and container dimensions
            const buttonWidth = noButtonFinal.offsetWidth;
            const buttonHeight = noButtonFinal.offsetHeight;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            // Define safe padding from edges in pixels (e.g., 20px from each side)
            const padding = 20;

            // Calculate new random positions within the container's bounds,
            // ensuring the button stays fully visible and within padding.
            // Max random position should account for button size and padding.
            const maxLeft = containerWidth - buttonWidth - padding;
            const maxTop = containerHeight - buttonHeight - padding;

            // Generate random positions, ensuring they are not less than padding
            let newLeft = Math.random() * (maxLeft - padding) + padding;
            let newTop = Math.random() * (maxTop - padding) + padding;

            // Ensure positions are not negative in case of very small container/large button
            newLeft = Math.max(padding, newLeft);
            newTop = Math.max(padding, newTop);

            // Apply the new position
            noButtonFinal.style.position = 'absolute'; // Ensure it's absolute for top/left to work
            noButtonFinal.style.left = `${newLeft}px`;
            noButtonFinal.style.top = `${newTop}px`;
        });

        // Optional: Reset button position if mouse leaves (and you want it to return)
        // noButtonFinal.addEventListener('mouseleave', () => {
        //     noButtonFinal.classList.remove('moving');
        //     noButtonFinal.style.position = ''; // Reset to default (e.g., relative)
        //     noButtonFinal.style.left = '';
        //     noButtonFinal.style.top = '';
        // });
    }
});