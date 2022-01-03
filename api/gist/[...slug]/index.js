export default function handler(req, res) {
  const { slug } = req.query;
  const additionalHeight = 15; // Additional iFrame height in pixels.
  if (!Array.isArray(slug) || slug.length !== 2) {
    res.status(404).end();
  } else {
    const html = Buffer.from(`
    <!DOCTYPE html>
    <html>
      <head>
        <base target="_blank" />
      </head>
      <body onLoad="sendData()" style="marign:0px;" id="gist-iframe">
        <script src="https://gist.github.com/${slug[0]}/${slug[1]}.js"></script>
        <script>
          function sendData() {
            const height = (document.getElementsByTagName("html")[0].scrollHeight + ${additionalHeight}) + 'px';
            parent.postMessage({ height }, parent.location.origin);
          };
        </script>
      </body>
    </html>
    `);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(html),
      'Content-Type': 'text/html; charset=UTF-8',
    });
    res.end(html);
  }
}
