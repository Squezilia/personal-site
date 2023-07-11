export type TButtonType = "primary" | "secondary";
export type TButtonColor = "default" | "second" | "success" | "warning" | "danger";
export type TButtonSize = "small" | "default" | "large";

export type SliderHoverDataClass = "";

export interface SliderData {
    value: string,
    hoverContent?: {
        content: string,
        position: "top-left" | "bottom-right" | "bottom-center" | "back",
        lineStyle?: "line-left" | "line-right" | "all-lines",
        lineMargin?: "linemargin-left" | "linemargin-right"
    }
}