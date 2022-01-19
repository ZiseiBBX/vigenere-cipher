import { LetterToIndex, VigenereEncrypt, generateMatrix, generateKeyStream, generateLetterToIndex } from ".";
import { Characters } from "../constants";

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

export const performVigenereEncrypt = (plainText: string, key: string): VigenereEncrypt => {
	const characters = localStorage.getItem("characters");
	if (characters) {
		if (plainText === "") throw "Plain Text cannot be empty";
		if (key === "") throw "Key cannot be empty";

		const matrix = generateMatrix([...characters]);
		const keyStream = generateKeyStream(plainText, key);

		if (!keyStream) {
			throw "Error";
		} else {
			const letterToIndex = generateLetterToIndex([...characters]);
			const cipherText = encrypt(matrix, letterToIndex, plainText, keyStream);

			return { cipherText, keyStream, matrix };
		}
	} else {
		localStorage.setItem("characters", Characters.ALPHA);
		performVigenereEncrypt(plainText, key);
	}

	return { cipherText: "", keyStream: "", matrix: [] };
};
