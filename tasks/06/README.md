1. Implement the following functions:

- `getElementById`
- `getElementsByTagName`
- `getElementsByClassName`

`getElementsByClassName` and `getElementsByTagName` accepts two arguments - a root node and a class name or a tag name respectively. The functions should return an array containing all nodes matching the stated restrictions.

2. Implement query selector (i.e. polyfill for `document.querySelectorAll`). Your query selector should support the following operations:

- `tagName` - get all elements with tag name equals to `tagName`.
- `#id` - get all elements with id equals to `id`.
- `*` - all elements.
- `.className` - get all elements with class name equals to `className`.
- `parentSelector childSelector` - all ancestor of all nodes matching `parentSelector`, which also match `childSelector`.
- `parentSelector > childSelector` - all direct ancestor of all nodes matching `parentSelector`, which also match `childSelector`.
