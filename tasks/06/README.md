1. Implement the following functions:

- `getElementsByTagName`
- `getElementsByClassName`

`getElementsByClassName` and `getElementsByTagName` accepts two arguments - a root node and a class name or a tag name respectively. The functions should return an array containing all nodes matching the stated restrictions.

2. Implement query selector (i.e. polyfill for `document.querySelectorAll`). Your query selector should support the following operations:

    1. `tagName` - get all elements with tag name equals to `tagName`.
    2. `#id` - get all elements with id equals to `id`.
    3. `*` - get all elements.
    4. `.className` - get all elements with class name equals to `className`.
    5. `parentSelector childSelector` - all ancestor of all nodes matching `parentSelector`, which also match `childSelector`.
    6. `parentSelector>childSelector` - all direct ancestor of all nodes matching `parentSelector`, which also match `childSelector`.

For simplicity suppose that whitespaces in the selector don't exist, except in case `5.`.
