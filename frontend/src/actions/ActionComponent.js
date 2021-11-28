class ActionComponent {
    /**
     * Key for the ActionComponent
     */
    key;
    /**
     * Visible name
     */
    name;
    /**
     * Visible icon
     */
    img;
    /**
     * Boolean value representing if the ActionComponent is enabled
     */
    enabled = false;

    constructor(key, name, img) {
        this.key = key;
        this.name = name;
        this.img = img;
    }
    isEnabled() {
        return this.enabled;
    }
    setEnabled(enabled) {
        this.enabled = enabled;
    }

    /**
     * Execute function, see Command design pattern
     */
    execute(pointerEvent) {
        console.log(pointerEvent);
        console.log(this.name + " clicked!");
    }
}
export default ActionComponent;