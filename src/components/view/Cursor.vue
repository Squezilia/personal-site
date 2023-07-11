<template>
    <div class="trailer" id="trailer" :style="`--x: ${x}px; --y: ${y}px;`"></div>
</template>
  
<script>
import { defineComponent } from "vue";

// Check if the device used is mobile
function isMobileTablet() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

// Define component using Vue Global API
export default defineComponent({
    data() {
        // Define required global variables
        return {
            x: 0,
            y: 0,
            trailer: null,
            isInteracting: false,
            mouseDown: false
        };
    },
    mounted() {
        // Get element with id "trailer"
        this.trailer = document.getElementById("trailer");

        // Check if the device is mobile and hide the trailer accordingly
        if (isMobileTablet()) {
            this.trailer.style.display = "none";
        }

        // Mouse Button Down Event
        window.onmousedown = () => {
            // Update if the user is moving
            this.mouseDown = true;
            // Remove the "hover" class if it interacts otherwise add class "hover".
            if (this.isInteracting) this.trailer.classList.remove("hover");
            else this.trailer.classList.add("hover");
        };

        window.onmouseup = () => {
            // Update if the user is moving
            this.mouseDown = false;
            // Add class "hover" if interacting and mouse button is not pressed, otherwise remove class "hover".
            if (!this.mouseDown && this.isInteracting) this.trailer.classList.add("hover");
            else this.trailer.classList.remove("hover");
        };

        window.addEventListener('mousemove', (e) => {
            // Get the interacting element with the value '[interactable="true"]' or return the value "false"
            const interacting = e.target.closest('*[interactable="true"]') || false;

            // Update trailer's position relative to cursor position
            this.x = e.clientX - this.trailer.offsetWidth / 2;
            this.y = e.clientY - this.trailer.offsetHeight / 2;

            // If the interacting variable is false; Make the global "isInteracting" variable false and remove any found effects.
            if (!interacting) {
                this.isInteracting = false;
                // If the mouse button is not pressed, remove the "hover" class.
                if (!this.mouseDown) this.trailer.classList.remove("hover");
                this.removeEffects(this.trailer);
                // End function.
                return;
            }
            // The interacting variable element is; Set the global variable "isInteracting" to true and add the effects of the interacting element.
            this.isInteracting = true;
            // If the mouse button is not pressed, remove the "hover" class.
            if (!this.mouseDown) this.trailer.classList.add("hover");

            if (interacting.getAttribute("cursor-effect")) this.trailer.classList.add(interacting.getAttribute("cursor-effect"));
            else this.removeEffects(this.trailer)
        });
    },
    methods: {
        // Delete all classes starting with "effect-"
        removeEffects(element = new HTMLDivElement()) {
            for (let cname of element.classList.values()) {
                if (cname.startsWith("effect-")) {
                    element.classList.remove(cname);
                }
            }
        },
    },
});
</script>
  
<style lang="scss" scoped>
@import '@/style/variables.scss';

body:hover .trailer {
    opacity: 1;
}

.trailer {
    font-size: $font-size-default;

    width: 1.25em;
    height: 1.25em;

    position: fixed;
    left: var(--x);
    top: var(--y);

    background: #fff;
    border-radius: 100%;


    pointer-events: none;
    opacity: 0;
    z-index: 900;

    transition: opacity 0.2s ease, transform 0.2s ease;

    &.effect-color-reverse {
        background: #000;
    }

    &.hover {
        transform: scale(2);
        opacity: .7 !important;
    }
}
</style>