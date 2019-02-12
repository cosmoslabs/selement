Selement
========

Select DOM elements using simple CSS selectors

## Installation

```
$ yarn add selement
```

```
$ npm install selement --save
```

## Usage

```javascript
import S from selement;

const element = S('div.some-class > p')[0];

console.log(element.tagName);
```
