/* https://dev.to/admitkard/auto-generate-avatar-colors-randomly-138j */
import { useEffect } from 'react';

let colorCache = new Map<string, string>();

/**
 * @description Clear the color cache when the component is unmounted
 * Should be used in a parent component if the color cache is used in a child component that is unmounted often
 * like a question card in a virtualized list
 */
export function clearColorCache() {
    colorCache.clear();
}

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
const sRange = [65, 75];
const lRange = [45, 65];

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
 * Uses a cache to store the generated colors to avoid regenerating the same color
 */
export function getHashedColor(str: string) {
    if (colorCache.has(str)) {
        return colorCache.get(str) as string;
    } else {
        const hsl = generateHSL(str);
        const hslColorString = HSLtoString(hsl);
        colorCache.set(str, hslColorString);

        return hslColorString;
    }
}

export function getHashedColorGradient(str: string) {
    const startColor = getHashedColor(str);
    const endColor = getHashedColor(str + '%');
    return `linear-gradient(to right bottom, ${startColor}, ${endColor})`;
}

/**
 * @description Hook to clear the color cache when the component is unmounted, should be used on any component that uses getHashedColor
 */
export function useHashedColor() {
    useEffect(() => {
        colorCache = new Map<string, string>();
        return clearColorCache;
    }, []);
}
