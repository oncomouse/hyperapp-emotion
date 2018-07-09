# hyperapp-emotion

*[Emotion](https://emotion.sh/) bindings for [Hyperapp](https://hyperapp.js.org/)*

This project provides a way to make [styled components](https://emotion.sh/docs/styled) in Hyperapp using the Emotion CSS-in-JS framework. It is similar to [preact-emotion](https://github.com/emotion-js/emotion/tree/master/packages/preact-emotion) and [react-emotion](https://github.com/emotion-js/emotion/tree/master/packages/react-emotion) in functionality, though not in implementation.

Consider the following example:

~~~javascript
import { h } from 'hyperapp'
import styled from 'hyperapp-emotion'

const borderColor = '#0FF'

const Button = styled('button')`
  border: 1px solid ${borderColor};
  color: #000;
  font-size: ${props => props.size || '1rem'};
  &:hover {
    background: ${borderColor};
    color: #FFF;
  }
`
export default Button;
~~~

This will export a Hyperapp component with the styles above defined. Additionally, you can pass an optional `size` prop to change the `font-size` property in the button. This works the same as in other styled component implementations.

The Emotion styled components documentation mentions the following features, most of which (at this point) are supported by `hyperapp-emotion`:

## Changing based on props

The following works in this library:

~~~javascript
import styled from 'react-emotion'

const Button = styled('button')`
  color: ${props =>
    props.primary ? 'hotpink' : 'turquoise'};
`

const Container = styled('div')(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))

const view = state => (
  <Container column>
    <Button>
      This is a regular button.
    </Button>
    <Button primary>
      This is a primary button.
    </Button>
  </Container>
)
~~~

## Styling any component

The following works in this library:

~~~javascript
import styled from 'react-emotion'
const Basic = ({ className }) => (
  <div className={className}>Some text</div>
)

const Fancy = styled(Basic)`
  color: hotpink;
`

const view = state => (<Fancy />)
~~~

## Change the rendered tag using `withComponent`

The following works in this library:

~~~javascript
// Create a section element
const Section = styled('section')`
  background: #333;
`
// Create an aside element with the same styles as Section
const Aside = Section.withComponent('aside')
const view = (state) => (
  <div>
    <Section>This is a section</Section>
    <Aside>This is an an aside</Aside>
  </div>
)
~~~

## Targeting another emotion component

*Currently untested, but should work*

~~~javascript
const Child = styled('div')`
  color: red;
`

const Parent = styled('div')`
  ${Child} {
    color: green;
  }
`
const view = state => (
  <div>
    <Parent>
      <Child>green</Child>
    </Parent>
    <Child>red</Child>
  </div>
)
~~~

## Pass refs down using innerRef

*Does not work; is not necessary in / relevant to Hyperapp (?)*

## Element Shorthand

**Note: `babel-plugin-emotion` is required for the element shorthand**

*Currently untested, but should work*

~~~javascript
const DivWithoutShorthand = styled('div')`
  color: green;
`

const DivWithShorthand = styled.div`
  color: hotpink;
`

const view = state => (
  <DivWithoutShorthand>
    This is green. <DivWithShorthand>This is hotpink.</DivWithShorthand>
  </DivWithoutShorthand>
)
~~~

## Object styles

*Currently untested, but should work*

~~~javascript
const H1 = styled.h1(
  {
    fontSize: 20
  },
  props => ({ color: props.color })
)

const view = state => (
  <H1 color="lightgreen">
    This is lightgreen.
  </H1>
)
~~~
