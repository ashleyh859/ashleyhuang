(() => {
    const storyButton = document.querySelector('#ashley-story-button');
    const storyContainer = document.querySelector('#ashley-story');
    const typedStory = document.querySelector('#ashley-story-typed');
    const cursor = document.querySelector('.ashley-keycaps-cursor');
    const status = document.querySelector('#ashley-story-status');
    const letterKeys = document.querySelectorAll('.ashley-keycap-letter');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const storyText = '13 years of guzheng. 10 years of violin.\n\nMusic taught me how small choices change the way an experience feels.';
    let animationFrame = 0;
    let isTyping = false;
    let animationStart = null;
    const pressTimers = new Set();

    if (!storyButton || !storyContainer || !typedStory || !cursor || !status) {
        return;
    }

    const finishStory = () => {
        window.cancelAnimationFrame(animationFrame);
        isTyping = false;
        typedStory.textContent = storyText;
        cursor.hidden = true;
        status.textContent = 'Design story revealed.';
    };

    const typeStory = (timestamp) => {
        if (animationStart === null) {
            animationStart = timestamp;
        }

        const characterCount = Math.min(
            storyText.length,
            Math.floor((timestamp - animationStart) / 27)
        );
        typedStory.textContent = storyText.slice(0, characterCount);

        if (characterCount < storyText.length) {
            animationFrame = window.requestAnimationFrame(typeStory);
        } else {
            finishStory();
        }
    };

    storyButton.addEventListener('click', () => {
        if (isTyping) {
            finishStory();
            return;
        }

        storyContainer.hidden = false;
        storyContainer.setAttribute('aria-hidden', 'false');
        storyButton.setAttribute('aria-expanded', 'true');
        storyContainer.scrollIntoView({
            behavior: reducedMotion.matches ? 'auto' : 'smooth',
            block: 'nearest'
        });
        typedStory.textContent = '';
        status.textContent = '';
        animationStart = null;

        if (reducedMotion.matches) {
            finishStory();
            return;
        }

        isTyping = true;
        cursor.hidden = false;
        animationFrame = window.requestAnimationFrame(typeStory);
    });

    letterKeys.forEach((key) => {
        let pressTimer;

        key.addEventListener('click', () => {
            window.clearTimeout(pressTimer);
            pressTimers.delete(pressTimer);
            key.classList.add('is-pressed');
            pressTimer = window.setTimeout(() => {
                key.classList.remove('is-pressed');
                pressTimers.delete(pressTimer);
            }, 200);
            pressTimers.add(pressTimer);
        });
    });

    const handleMotionPreferenceChange = () => {
        if (isTyping && reducedMotion.matches) {
            finishStory();
        }
    };

    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', handleMotionPreferenceChange);
    } else {
        reducedMotion.addListener(handleMotionPreferenceChange);
    }

    window.addEventListener('pagehide', () => {
        window.cancelAnimationFrame(animationFrame);
        pressTimers.forEach((timer) => window.clearTimeout(timer));
        pressTimers.clear();
    }, { once: true });
})();
