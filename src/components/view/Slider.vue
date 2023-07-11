<!-- En çok uğraştığım kısım burası işte -->

<template>
    <div class="slider" ref="Slider">
        <div class="base" ref="Base">
            <div class="slide" v-for="dataItem in data">
                <div class="content">
                    <span cursor-effect="effect-color-reverse" interactable="true" class="content-text"
                        :pseudo-value="dataItem.value" :style="`--velocity: 0px;`">
                        {{ dataItem.value }}
                    </span>
                    <div :class="`hover-content ${dataItem.hoverContent.position} ${dataItem.hoverContent.lineStyle} ${dataItem.hoverContent.lineMargin}`"
                        v-if="dataItem.hoverContent">
                        <span>{{ dataItem.hoverContent.content }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, PropType, onBeforeUnmount } from 'vue';

import { SliderData } from '@/types';

// Add references
const Base = ref<HTMLDivElement | null>(null);
const Slider = ref<HTMLDivElement | null>(null);

// Define Props
const props = defineProps({
    data: {
        required: true,
        type: Object as PropType<Array<SliderData>>
    }
})

// Set mouseMovedState variable for clickable slide
let mouseMovedState = false;
let clickedState = false;
// Set velocity variables
let velocity = 1;
let velocitySpeed = window.innerWidth * .001;
let velocityFactor = window.innerWidth * .0006;
// Auto Move Interval Variable
let autoMoveInterval: null | NodeJS.Timer = null;

// Mount Eevent
onMounted(() => {
    // Checking elements
    if (!Base.value || !Slider.value) return;

    // Calculate the index of the slide that appears on the screen
    let slideIndex = Slider.value!.scrollLeft / (Slider.value!.scrollWidth / props.data.length);

    let isMoving: boolean = false;

    let index = Math.floor(slideIndex) - 1;
    // Moving last child to first
    Base.value.children[Math.floor(slideIndex)].before(Base.value!.children[(index >= 0 ? 0 : Base.value!.children.length) + (index % Base.value!.children.length)]);
    // Scroll to second child
    Slider.value.scrollTo({ left: Slider.value!.scrollWidth / props.data.length });

    // Scroll Event
    Slider.value.addEventListener("scroll", () => {
        // Update Slide Index to know which slide appears on the screen
        slideIndex = Slider.value!.scrollLeft / (Slider.value!.scrollWidth / props.data.length);

        // Left side control
        if (slideIndex <= 0.3) {
            try {
                let index = Math.floor(slideIndex) - 1;
                // Move last child to first
                Base.value!.children[Math.floor(slideIndex)].before(Base.value!.children[(index >= 0 ? 0 : Base.value!.children.length) + (index % Base.value!.children.length)]);
                // Keep current look
                Slider.value!.scrollTo({ left: (Slider.value!.scrollWidth / props.data.length) + (Slider.value!.scrollWidth / props.data.length) * (30 / 100) });
            }
            catch (e) { }
        }

        // Right side control
        if (slideIndex >= props.data.length - 2.3) {
            try {
                // Move first child to last
                Base.value!.children[Math.floor(props.data.length - 1)].after(Base.value!.children[0])
                // Keep current look
                Slider.value!.scrollTo({ left: Slider.value!.scrollLeft - (Slider.value!.scrollWidth / props.data.length) });
            }
            catch (e) { }
        }
    })

    // Mouse Button Down Event
    Slider.value.addEventListener("mousedown", (ev: MouseEvent) => {
        // Update if the user is moving 
        isMoving = true;
    })

    for (let child of Base.value.children) {
        //
        // Set click events
        //
        (child.children[0].children[0] as HTMLElement).addEventListener("mousedown", () => {
            clickedState = true;
            mouseMovedState = false;
        });

        (child.children[0].children[0] as HTMLElement).addEventListener("mouseup", () => {
            if (clickedState && !mouseMovedState) {
                clickedState = false
                // Invoke Event
                console.log(true);
            };

            mouseMovedState = false;

        })

        /** !DEPRECATED! - Slow down on hover
         * 
         * child.children[0].addEventListener("mouseenter", () => {
         *  velocitySpeed = .5;
         * });
         * child.children[0].addEventListener("mouseleave", () => {
         *  velocitySpeed = 1;
         * })
         */
    }

    // Update speed of the slider when window is resized
    window.addEventListener("resize", () => {
        velocitySpeed = window.innerWidth * .001;
        velocityFactor = window.innerWidth * .0006;
    })

    // Mouse Button Up Event
    window.addEventListener("mouseup", () => {
        // Update if the user is moving
        isMoving = false;

        for (let child of Base.value!.children) {
            // Return skew value to normal (-10deg)
            child.setAttribute("style", `transform: skewX(-10deg);`)
        }
    })

    // Cursor Move Event
    window.addEventListener("mousemove", (ev: MouseEvent) => {
        // Set State
        mouseMovedState = true;

        // Check if user moved
        if (isMoving) {
            // Calculate how much Velocity will change
            let velocityIncrease = ev.movementX > 1 ? 1 : ev.movementX < -1 ? -1 : ev.movementX;

            // Fix Velocity between 10 and -10
            velocity > (10 * velocityFactor) ? velocity = (10 * velocityFactor) : velocity < (10 * velocityFactor) * -1 ? velocity = (10 * velocityFactor) * -1 : velocity += velocityIncrease;

            // Move as much as the user moves
            Slider.value!.scrollTo({ left: Slider.value!.scrollLeft - ev.movementX });
            // Apply to each child keeping the Skew constant between 30 and -30 based on the user's movement speed.
            for (let child of Base.value!.children) {
                child.setAttribute("style", `transform: skewX(${(ev.movementX * 2) < -30 ? -30 : (ev.movementX * 2) > 30 ? 30 : (ev.movementX * 2)}deg);`)
            }
        }
    })

    // Assign interval function to variable (to delete the function while unmounting the page)
    autoMoveInterval = setInterval(() => {
        // Move automatically, taking into account Velocity.
        Slider.value!.scrollTo({ left: Slider.value!.scrollLeft + ((velocity * velocitySpeed) * -1) });
        for (let child of Base.value!.children) {
            child.children[0].children[0].setAttribute("style", `--velocity: ${((velocity * velocitySpeed) * 2) - 2}px;`);
        }
        // Keep Velocity constant at 1
        if (velocity > 1) velocity -= .05;
        if (velocity < 1) velocity += .05
    }, 0);
})

// Delete Interval when page unmount
onBeforeUnmount(() => {
    if (!autoMoveInterval) return;
    clearInterval(autoMoveInterval);
})
</script>

<style lang="scss" scoped>
@import '@/fonts/Trueno/style.css';

.slider {
    overflow: hidden;

    .base {
        position: relative;
        width: max-content;
        overflow: hidden;

        .slide {
            width: 100vw;
            height: 100%;
            font-size: clamp(.75rem, 15vw, 10rem);
            font-weight: 900;
            text-align: center;
            vertical-align: middle;
            display: inline-block;
            user-select: none;
            transform: skewX(-10deg);
            transition: .2s ease;
            transition-property: transform;

            .content {
                position: relative;
                display: inline-block;
                padding-bottom: .1em;

                span.content-text {
                    position: relative;

                    text-transform: uppercase;
                    font-family: "Trueno";

                    transition: .2s ease;
                    transition-property: font-size,
                        background-position-y;

                    letter-spacing: 0.05em;

                    z-index: 10;

                    @supports((text-stroke: .02em #fff) or (-webkit-text-stroke: .02em #fff)) {
                        color: transparent;
                        -webkit-text-stroke: .02em #fff;
                        text-shadow: none;
                        position: relative;

                        background: #00000000;
                        background: linear-gradient(0deg, rgba(255, 255, 255, 1) 50%, #00000000 50%);
                        -webkit-background-clip: text;

                        background-size: 100% 200%;
                        background-position-y: 000%;
                        font-size: 1em !important;

                        &:hover {
                            font-size: 1.05em !important;
                            background-position-y: 100%;
                        }
                    }

                    &:hover+.hover-content {
                        opacity: 1;
                    }

                    /* Make shadow effect */
                    &:before {
                        content: attr(pseudo-value);
                        position: absolute;
                        left: calc(var(--velocity) * 1.5);
                        top: 0;
                    }

                    &:after {
                        content: attr(pseudo-value);
                        position: absolute;
                        left: calc(var(--velocity) * 2.5);
                        top: 0;
                        opacity: .5;
                    }
                }

                .hover-content {
                    font-size: .20em;
                    display: block;
                    position: absolute;
                    font-weight: 200;

                    opacity: 0;

                    transition: .2s ease;

                    pointer-events: none;

                    &.top-left {
                        top: 0;
                        left: 1.5em;
                    }

                    &.bottom-right {
                        bottom: 0;
                        right: 0;
                    }

                    &.bottom-center {
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                    }

                    &.back {
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);

                        font-size: .5em;

                        z-index: 15;

                        color: #000;

                        pointer-events: none;
                    }

                    &.linemargin-left {
                        margin-left: 3em;
                    }

                    &.linemargin-right {
                        margin-right: 3em;
                    }

                    &.line-left span {
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: -2.5em;
                            transform: translateY(-50%);
                            width: 2em;
                            height: .1em;
                            background: #fff;
                        }
                    }

                    &.line-right span {
                        &::after {
                            content: '';
                            position: absolute;
                            top: 50%;
                            right: -3em;
                            transform: translateY(-50%);
                            width: 2em;
                            height: .1em;
                            background: #fff;
                        }

                    }

                    &.all-lines span {
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: -3em;
                            transform: translateY(-50%);
                            width: 2em;
                            height: .1em;
                            background: #fff;
                        }

                        &::after {
                            content: '';
                            position: absolute;
                            top: 50%;
                            right: -3em;
                            transform: translateY(-50%);
                            width: 2em;
                            height: .1em;
                            background: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>