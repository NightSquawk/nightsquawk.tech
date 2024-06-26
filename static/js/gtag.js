// Load the Google Tag Manager script
(function() {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-LH4XY2QF0M';
    document.head.appendChild(gtagScript);

    console.log('gtag script loaded');

    gtagScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-LH4XY2QF0M');
    };
})();
