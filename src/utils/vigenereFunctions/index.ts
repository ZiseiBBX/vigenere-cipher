import { Characters } from "../constants";

export type LetterToIndex = { [key: string]: number };
export type IndexToLetter = { [key: number]: string };

export type VigenereEncrypt = {
	cipherText: string;
	keyStream: string;
	matrix: string[][];
};

export type VigenereDecrypt = {
	plainText: string;
	keyStream: string;
};

export const rotateArray = (array: string[]): string[] => {
	let val = array.shift();
	if (val) array.push(val);
	return array;
};

export const generateLetterToIndex = (characterArray: string[]): LetterToIndex => {
	return characterArray.reduce((a, v, i) => ({ ...a, [v]: i }), {});
};

export const generateIndexToLetter = (letterToIndex: LetterToIndex): IndexToLetter => {
	return Object.assign({}, ...Object.entries(letterToIndex).map(([a, b]) => ({ [b]: a })));
};

export const generateMatrix = (characterArray: string[]): string[][] => {
	let len = characterArray.length;
	let matrix: string[][] = [];
	for (let i = 0; i < len; i++) {
		matrix.push(characterArray);
		characterArray = rotateArray([...characterArray]);
	}

	return matrix;
};

export const generateKeyStream = (text: string, key: string): string | undefined => {
	let keyStream = "";

	if (text.length > key.length) {
		let repeatFactor = Math.ceil(text.length / key.length) + 1;
		keyStream = key.repeat(repeatFactor).slice(0, text.length);
	} else if (text.length === key.length) {
		keyStream = key;
	} else {
		return undefined;
	}

	return keyStream;
};

export const encrypt = (
	matrix: string[][],
	letterToIndex: LetterToIndex,
	plainText: string,
	keyStream: string
): string => {
	let cipherText = "";

	for (let i = 0; i < plainText.length; i++) {
		if (plainText[i] === " ") {
			cipherText += " ";
		} else {
			let row = letterToIndex[plainText[i]];
			let col = letterToIndex[keyStream[i]];

			cipherText += matrix[row][col];
		}
	}

	return cipherText;
};
