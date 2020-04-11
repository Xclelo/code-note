var Light = function () {
    this.offLightState = new offLightState(this);
    this.button = null;
};
Light.prototype.init = function () {
    var button = document.createElement('button'),
        self = this;

    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState;

    this.button.onclick = function () {
        self.currState.buttonWasPressed();
    }
}

var offLightState = function (light) {
    this.light = light
};

offLightState.prototype.buttonWasPressed = function () {
    console.log('柔光');
    this.light.setState(this.light.weakLightSrate);
}