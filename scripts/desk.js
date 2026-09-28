const tabletopCanvas = document.querySelector('[data-tabletop-canvas]');
const tabletopToggle = document.querySelector('[data-tabletop-toggle]');
const tabletopObjects = document.querySelectorAll('[data-drag-object]');
const dragHint = document.querySelector('[data-drag-hint]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (tabletopCanvas && tabletopToggle) {
    const draggableObjectConfig = {
        eyeshadow: { initial: { rotation: -13, zIndex: 5 }, tidy: { rotation: -13, zIndex: 3 } },
        polaroid: { initial: { rotation: 10, zIndex: 6 }, tidy: { rotation: 10, zIndex: 3 } },
        matcha: { initial: { rotation: -8, zIndex: 5 }, tidy: { rotation: -8, zIndex: 3 } },
        headphones: { initial: { rotation: 7, zIndex: 3 }, tidy: { rotation: 7, zIndex: 2 } },
        lipgloss: { initial: { rotation: 31, zIndex: 7 }, tidy: { rotation: 31, zIndex: 3 } }
    };

    const setTabletopState = (isTidy) => {
        tabletopCanvas.classList.toggle('is-open', isTidy);
        tabletopToggle.setAttribute('aria-pressed', String(isTidy));
        tabletopToggle.querySelector('[data-tabletop-label]').textContent = isTidy ? 'Undo' : 'Organize my desk';
        tabletopObjects.forEach((object) => {
            object.style.transform = '';
            object.style.zIndex = '';
        });
        if (isTidy && dragHint) {
            dragHint.hidden = true;
        }
    };

    tabletopToggle.addEventListener('click', () => {
        setTabletopState(!tabletopCanvas.classList.contains('is-open'));
    });

    tabletopObjects.forEach((object) => {
        const objectConfig = draggableObjectConfig[object.dataset.dragObject];
        let dragState = null;

        const finishDrag = (event) => {
            if (!dragState) return;
            if (event) object.releasePointerCapture(event.pointerId);
            object.classList.remove('is-dragging');
            object.style.transition = prefersReducedMotion ? 'none' : 'transform 180ms ease-out';
            dragState = null;
        };

        object.addEventListener('pointerdown', (event) => {
            if (event.button !== 0 && event.pointerType === 'mouse') return;
            const objectRect = object.getBoundingClientRect();
            const canvasRect = tabletopCanvas.getBoundingClientRect();
            object.setPointerCapture(event.pointerId);
            dragState = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                deltaX: 0,
                deltaY: 0,
                moved: false,
                minX: canvasRect.left - objectRect.left,
                maxX: canvasRect.right - objectRect.right,
                minY: canvasRect.top - objectRect.top,
                maxY: canvasRect.bottom - objectRect.bottom
            };
            object.classList.add('is-dragging');
            object.style.zIndex = '20';
            object.style.transition = 'none';
        });

        object.addEventListener('pointermove', (event) => {
            if (!dragState || event.pointerId !== dragState.pointerId) return;
            const deltaX = event.clientX - dragState.startX;
            const deltaY = event.clientY - dragState.startY;
            if (!dragState.moved && Math.hypot(deltaX, deltaY) < 5) return;
            dragState.moved = true;
            event.preventDefault();
            dragState.deltaX = Math.min(dragState.maxX, Math.max(dragState.minX, deltaX));
            dragState.deltaY = Math.min(dragState.maxY, Math.max(dragState.minY, deltaY));
            const layout = tabletopCanvas.classList.contains('is-open') ? objectConfig.tidy : objectConfig.initial;
            object.style.transform = `translate(${dragState.deltaX}px, ${dragState.deltaY}px) rotate(${layout.rotation}deg)`;
            if (dragHint) dragHint.hidden = true;
        });

        object.addEventListener('pointerup', finishDrag);
        object.addEventListener('pointercancel', finishDrag);
    });

    if (window.matchMedia('(max-width: 767px)').matches) {
        setTabletopState(true);
    }

    if (!prefersReducedMotion) {
        window.setTimeout(() => tabletopCanvas.classList.add('is-settled'), 1500);
    }
}
