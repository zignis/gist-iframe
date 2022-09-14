# gist-iframe

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

Uses the `postMessage` method to set the height of the iframe dynamically.

## ⚙️ Terminology
- Renders a Gist on the `/api/gist` API route to aid same-origin policy.
- The API route uses `window.postMessage()` API to send the height of the Gist to the front-end dynamically. 
- THe iframe's height is received on the front-end. 

## 🪱 Regex
We construct a RegExp to extract the `username` and `Gist ID` from the URL.

### Gist URL structure
```
https://gist.github.com/username/gistId
```

### RegExp
```
/https?:\/\/gist\.github\.com\/([^\/\?\&]*\/[^\/\?\&]*)/
```
We use the group catched from the above RegExp and use our API route to render the Gist on the same origin.
```
/api/gist/username/gistId
```

## ✏️ Rendering the Gist
We render the Gist on the same origin, refer to [this file](https://github.com/HexM7/gist-iframe/blob/main/api/gist/%5B...slug%5D/index.js).

## 💻 The Font-end
We use the `useEffect` React hook to set the iframe's height once we receive it from our API route.
```ts
React.useEffect(() => {
  function receiveMessage(event: MessageEvent): void {
    const frames = document.getElementsByTagName('iframe');

    for (let i = 0; i < frames.length; i += 1) {
      if (frames[i].contentWindow === event.source) {
        if (event.data && event.data.height) {
          frames[i].style.height = event.data.height;
        }
      }
    }
  }
  
  window.addEventListener('message', receiveMessage, false);

  return = () => {
    window.removeEventListener('message', receiveMessage, false);
  }
}, []);
```

## :link: Links
- [GitHub Gist](https://gist.github.com/)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

## :ledger: License
[Apache License 2.0](https://github.com/HexM7/gist-iframe/blob/main/LICENSE)
