/**
 * @jest-environment jsdom
 */

import { getPath } from ".";

test('should getPath return right css selector', () => {
    const div = document.createElement('div');
    div.className = 'someclass'
    const ul = document.createElement('ul');
    const li1 = document.createElement('li');
    const li2 = document.createElement('li');
    const li3 = document.createElement('li');
    document.body.appendChild(div)
    div.appendChild(ul)
    ul.appendChild(li1)
    ul.appendChild(li2)
    ul.appendChild(li3)
        
    expect(getPath(li1)).toBe("body div.someclass ul li:first-child");
    expect(getPath(li2)).toBe("body div.someclass ul li:nth-child(2)");
    expect(getPath(li3)).toBe("body div.someclass ul li:last-child");
})