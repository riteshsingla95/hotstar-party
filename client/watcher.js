

const TICK_TIME_IN_MS = 100;
const MINIMUM_TIME_DIFF_TO_SYNC_FOR_IN_MS = 2000;

class DurationChangeWatcher {

    constructor() {
        this.duration = document.getElementsByClassName('duration')[0];
        this.seekHandle = document.getElementsByClassName('seek-handle')[0];
        this.multiplier = [1, 60, 60 * 60, 60 * 60 * 24, 60 * 60 * 24 * 365];
        this.timeInMsSinceTimeLeftUpdate = 0;
    }

    init() {
        var watcherInstance = this;

        var videoCompletedFactor = (100 - this.seekHandle.style.left.split('%')[0]) / 100;

        // approx.
        var totalVideoDuration = this.durationLeftInSeconds() / videoCompletedFactor;
        console.log("Total Video Duration = ", totalVideoDuration);

        this.lastFoundTime = 0;
        this.timeLeft = this.durationLeftInSeconds();
        setInterval(function () { watcherInstance.tick(); }, TICK_TIME_IN_MS);
    }

    durationLeftInSeconds() {
        var currentDuration = this.duration.innerHTML;
        var currentDurationArray = currentDuration.split(":")
        var j = 0;
        var totalSeconds = 0;
        for (var i = currentDurationArray.length - 1; i >= 0; i--, j++) {
            totalSeconds += currentDurationArray[i] * this.multiplier[j];
        }
        return totalSeconds;
    }

    tick() {
        var currentTimeLeft = this.durationLeftInSeconds();

        if (currentTimeLeft == this.timeLeft && this.timeInMsSinceTimeLeftUpdate > MINIMUM_TIME_DIFF_TO_SYNC_FOR_IN_MS) {
            // paused
            console.log("Paused at", this.timeLeft)
        } else if (Math.abs(this.timeLeft - currentTimeLeft) <= MINIMUM_TIME_DIFF_TO_SYNC_FOR_IN_MS / 1000) {
            // all ok.
            if (currentTimeLeft != this.timeLeft) {
                this.timeLeft = currentTimeLeft;
                this.timeInMsSinceTimeLeftUpdate = 0;
            } else {
                this.timeInMsSinceTimeLeftUpdate += TICK_TIME_IN_MS;
            }
        } else {
            if (currentTimeLeft > 0) {
                console.log("Please sync the time to", currentTimeLeft, "from", this.timeLeft)
            }
            this.timeLeft = currentTimeLeft;
            this.timeInMsSinceTimeLeftUpdate = 0;
        }
    }
};

// var imported = document.createElement('script');
// imported.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js';
// imported.type = "text/javascript"
// document.body.appendChild(imported);

console.log("DurationChangeWatcher defined!")


// if ('serviceWorker' in navigator) {
//     console.log('CLIENT: service worker registration in progress.');
//     navigator.serviceWorker.register('http://127.0.0.1:8080/public/test.js').then(function () {
//         console.log('CLIENT: service worker registration complete.');
//     }, function (err) {
//         console.log('CLIENT: service worker registration failure.', err);
//     });
// } else {
//     console.log('CLIENT: service worker is not supported.');
// }

// addEventListener()