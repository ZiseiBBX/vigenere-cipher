import {
	LetterToIndex,
	IndexToLetter,
	VigenereDecrypt,
	generateMatrix,
	generateKeyStream,
	generateLetterToIndex,
	generateIndexToLetter,
} from ".";
import { Characters } from "../constants";

export const decrypt = (
	matrix: string[][],
	letterToIndex: LetterToIndex,
	indexToLetter: IndexToLetter,
	cipherText: string,
	keyStream: string
) => {
	let plainText = "";

	for (let i = 0; i < cipherText.length; i++) {
		if (cipherText[i] === " ") {
			plainText += " ";
		} else {
			let row = letterToIndex[keyStream[i]];
			let index = matrix[row].indexOf(cipherText[i]);
			plainText += indexToLetter[index];
		}
	}

	return plainText;
};

export const performVigenereDecrypt = (cipherText: string, key: string): VigenereDecrypt => {
	const characters = localStorage.getItem("characters");
	if (characters) {
		if (cipherText === "") throw "Cipher Text cannot be empty";
		if (key === "") throw "Key cannot be empty";

		const matrix = generateMatrix([...characters]);
		const keyStream = generateKeyStream(cipherText, key);

		if (!keyStream) {
			throw "Error";
		} else {
			const letterToIndex = generateLetterToIndex([...characters]);
			const indexToLetter = generateIndexToLetter(letterToIndex);
			const plainText = decrypt(matrix, letterToIndex, indexToLetter, cipherText, keyStream);

			return { plainText, keyStream };
		}
	} else {
		localStorage.setItem("characters", Characters.ALPHA);
		performVigenereDecrypt(cipherText, key);
	}

	return { plainText: "", keyStream: "" };
};
