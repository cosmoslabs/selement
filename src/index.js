function hasClass(element, className) {
  // `className` is supported from the good old days but slower than `classList`
  // which is only supported in modern browsers
  return element.classList
    ? element.classList.contains(className)
    : element.className.split(' ').indexOf(className) > -1;
}

function selement(selector, context) {
  let elements = [window.document.documentElement]; let filter; let
    error;
  selector.split(' ').forEach((part, i) => {
  // var t = Date.now()
    if (error || !part) return;
    if (part === '>') {
      if (filter) error = true;
      else {
        elements = elements.reduce((els, el) => els.concat(Array(...el.children)), []);
        filter = true;
      }
    } else if (part === '*' && !filter) elements = elements.reduce((els, el) => els.concat(Array(...el.getElementsByTagName(part))), []);
    else if (part.lastIndexOf('.') > 0 || part.lastIndexOf('#') > 0) {
      const firstChar = part.charAt(0);


      const tagName = (firstChar !== '.' && firstChar !== '#') ? part.match(/^[^.#]+/)[0] : null;


      const classes = part.match(/\.[^.#]+/g);


      const ids = part.match(/#[^.#]+/g);
      // console.log('part', i, 'declare', Date.now() - t);
      if (tagName) {
        elements = filter
          ? elements.filter(el => el.tagName.toLowerCase() === tagName.toLowerCase())
          : elements
            .reduce((els, el) => els.concat(Array(...el.getElementsByTagName(tagName))), []);
        filter = true;
      }
      // console.log('part', i, 'tagName', Date.now() - t);
      if (classes && classes.length && elements.length) {
        if (!filter) {
          elements = elements
            .reduce((els, el) => els
              .concat(Array(...el.getElementsByClassName(classes.shift().slice(1)))), []);
          filter = true;
        }
        if (classes.length) {
          classes.forEach((cl) => { elements = elements.filter(el => hasClass(el, cl.slice(1))); });
        }
      }
      // console.log('part', i, 'classes', Date.now() - t);
      if (ids && ids.length && elements.length) {
        if (!filter) {
          elements = elements
            .reduce((els, el) => {
              const elid = window.document.getElementById(ids.shift().slice(1));
              return elid && el.contains(elid) ? els.concat(elid) : els;
            }, []);
        }
        if (ids.length) {
          ids.forEach((id) => { elements = elements.filter(el => el.id === id.slice(1)); });
        }
      }
      // console.log('part', i, 'ids', Date.now() - t);
      filter = undefined;
    } else if (part.charAt(0) === '.') {
      if (filter) elements = elements.filter(el => hasClass(el, part.slice(1)));
      else {
        elements = elements
          .reduce((els, el) => els.concat(Array(...el.getElementsByClassName(part.slice(1)))), []);
      }
      filter = undefined;
    } else if (part.charAt(0) === '#') {
      if (filter) elements = elements.filter(el => el.id === part.slice(1));
      else {
        elements = elements.reduce((els, el) => {
          const elid = window.document.getElementById(part.slice(1));
          if ((!i && elid) || el.contains(elid)) els.push(elid);
          return els;
        }, []);
      }
      filter = undefined;
    } else if (part !== '*') {
      elements = filter
        ? elements.filter(el => el.tagName.toLowerCase() === part.toLowerCase())
        : elements.reduce((els, el) => els.concat(Array(...el.getElementsByTagName(part))), []);
      filter = undefined;
    }
    // console.log('part', i, Date.now()-t);
  });
  if (error || filter) throw new Error('Selection error !!');
  if (context) {
    elements = elements.filter(el => context.contains(el));
  }
  return elements;
}

export default selement;

export { selement as S };
