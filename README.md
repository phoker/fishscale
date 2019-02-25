# white-castle
> a React slider that (kinda) doesnt suck

## :sunglasses: INSTALL

```
$ yarn add white-castle
```

## :fire: USAGE

```
import React, { useState } from 'react'
import WhiteCastle from 'white-castle'

const Example = () => {
  const [ value, setValue ] = useState(0)
  return (
    <WhiteCastle
      value={value}
      onChange={val => setValue(val)}
    />
  )
}
```

## :eyes: PROPS

| Prop              | Type       | Default    | Description |
|-------------------|------------|------------|-------------|
| `value`           | _number_   | false      | Self-explanatory |
| `onChange`        | _func_     | noOp       | Function to invoke when User uses the slider. |
| `min`             | _number_   | `0`        | Self-explanatory |
| `max`             | _number_   | `100`      | Self-explanatory |
| `color`           | _string_   | `#6200EE`  | Hex or rgb(a) for the entire component. |

## :pencil2: DEVELOP

 - clone
 - run `yarn install`
 - run `yarn run cosmos`
 - do stuff

## :pray: MADE WITH

 - [react (with them hooks!)](https://reactjs.org/)
 - [styled-components](https://www.styled-components.com/)
 - [react-spring](https://react-spring.surge.sh/#/)
 - [react-with-gesture](https://github.com/react-spring/react-with-gesture)

## License

MIT
