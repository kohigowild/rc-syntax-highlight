# rc-syntax-highlight

Simple code syntax highlight component. Currently supports Javascript, Python, Bash, Json. (08/01/2024)

## Usage

<code>npm i rc-syntax-highlight</code>

```javascript
import React from 'react'
import CodeBlock from 'rc-syntax-highlight'

export default function Code() {
  const lang = 'your language'
  const code = 'your code'

  return <CodeBlock lang={lang} code={code} />
}
```

| props | type   | value                          |
| ----- | ------ | ------------------------------ |
| lang  | string | javascript, bash, json, python |
| code  | string |

## contact

https://github.com/kohigowild/rc-syntax-highlight
