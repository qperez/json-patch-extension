/**
 * Created by qperez on 30/06/17.
 */
chrome.app.runtime.onLaunched.addListener(function() {
    // Center window on screen.
    var screenWidth = screen.availWidth;
    var screenHeight = screen.availHeight;

    chrome.app.window.create('../index.html', {
        id: "helloWorldID",
        frame: 'chrome',
        innerBounds: {
            width: screenWidth,
            height: screenHeight,
            minWidth:720,
            minHeight: 400
        }
    });
});