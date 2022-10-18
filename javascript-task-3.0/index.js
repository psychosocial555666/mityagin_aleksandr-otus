export const getPath = (element) => {
    const path = [];

    if (!(element instanceof HTMLElement) || element.tagName === 'HTML') return;

    const returnSelectorOfElement = (el) => {
        let selector = `${el.tagName.toLowerCase()}${el.className.length ? `.${el.className}` : ''}`;
        const parent = el.parentNode;
        const nodes = Array.from(parent.children);
        if(nodes.length > 1 && document.querySelectorAll(selector).length > 1 && el.tagName !== 'BODY') {
            const index = nodes.indexOf.call(el.parentNode.children, el);
            switch (index) {
                case 0:
                    selector += ':first-child'
                    break;
                case nodes.length - 1:
                    selector += ':last-child'
                    break;
            
                default:
                    selector += `:nth-child(${index + 1})`
                    break;
            }
        }

        path.unshift(selector);
        if(parent.tagName === 'HTML') {
            return
        } else {
            returnSelectorOfElement(parent)
        };

    }

    returnSelectorOfElement(element);

    const result = path.join(' ');
    return result;
}
