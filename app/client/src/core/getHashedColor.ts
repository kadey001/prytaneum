/* https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j */

type HSL = [number, number, number];

export const getHashOfString = (str: string) => {
    const charArray = Array.from(str);
    return charArray.reduce((total, _char, index) => {
        return (total += str.charCodeAt(index) * index);
    }, 0);
};

export const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
};

// Used to ensure that the generated colors are not too dark or too light
const hRange = [0, 360];
const sRange = [55, 65];
const lRange = [45, 55];

export const generateHSL = (name: string): HSL => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    return [h, s, l];
};

export const HSLtoString = (hsl: HSL) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

/**
 * @description Generate a hsl color based on the input string hash
 * @param str input string
 * @returns hsl color string
 */
export function getHashedColor(str: string) {
    const hsl = generateHSL(str);
    const hslColorString = HSLtoString(hsl);

    return hslColorString;
}
