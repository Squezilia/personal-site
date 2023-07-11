<!-- !DEPRECATED! - Unused Module -->

<template>
    <div class="icon">
        <div class="line"></div>
        <div class="arrow"></div>
    </div>
</template>

<style lang="scss" scoped>
.icon {
    --color: #fff;

    width: 3em;
    height: 1em;
    position: relative;
    z-index: 20;

    .line {
        position: absolute;
        top: 50%;
        left: 0;
        height: .2em;
        background: var(--color);
        width: 100%;
        transition: .2s ease;
        transform: translateY(-50%);
    }

    .arrow {
        padding: .2em;
        width: .1em;
        height: .1em;
        border: solid var(--color);
        border-width: .2em 0 0 .2em;
        border-radius: 1px;
        position: absolute;
        top: 50%;
        right: .8em;
        transition: .2s ease;
        transform: rotate(135deg) translate(-120%, -50%);
    }
}
</style>